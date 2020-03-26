import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
//import { TemperaturaDetalleRQT, TemperaturaDetalleRPT, BuscarNuevoCartaDetalleTemperaturaRQT, BuscarNuevoCartaDetalleTemperaturaRPT, BuscarCartaDetalleTemperaturaRQT, BuscarCartaDetalleTemperaturaRPT, CartaDetalleTemperatura2RQT, CartaDetalleTemperatura2RPT, NuevoCartaDetalleTemperaturaRQT, NuevoCartaDetalleTemperaturaRPT, CartaDetalleTemperaturaRQT, CartaDetalleTemperaturaRPT, TemperaturaDataRPT, TemperaturaVDRPT } from '../../models/Temperatura';
//import { ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo,GenerarRefrendoExpoRQT,GenerarRefrendoExpoRPT,GenerarDetalleRefrendoExpoRQT } from '../../models/RefrendoExpo';
import { GenerarSolicitudDetalle,GenerarSolicitud, ConsultarVolanteSolicitudRPT, ConsultarVolanteSolicitudRQT,ConsultarVolanteSolicitudServiciosRPT,ConsultarVolanteSolicitudServiciosUnicosRPT, ConsultarVolanteSolicitudContenedoresRPT, ConsultarVolanteSolicitudServiciosContenedoresRPT }  from '../../models/SolicitudServicio';
import { MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';
import { esLocale } from 'ngx-bootstrap';
import { Base64RPT, Base64RQT } from '../../models/Base64';
import { ZipRPT,ZipRQT } from '../../models/ConvertirZip';
import { FileItem } from '../../models/FileItem';
import { isError } from 'util';


@Component({
  selector: 'nuevosolserv',
  templateUrl: 'nuevosolserv.template.html',
  styleUrls: ['nuevosolserv.component.css']
})

export class NuevoSolServComponent implements AfterViewInit, OnDestroy, OnInit{  

  public SiCargoData = true;
  public TieneData = false;
  fechaActual: any;
  minDate: Date;
  maxDate: Date;
  Contnumero: string;

  BLCodigo: string;
  BLNumero: string;
  Manifiesto: string;
  Nave: string;
  Viaje: string;
  Rumbo: string;
  Carga: string;
  CodCarga: string;
  Cliente: string;
  Condicion: string;
  EntiCodigo: string;
  CodCliente: string;
  CodViaje: string;

  CantidadBultos: number;
  CantidadPeso: number;

  public Servicios: ConsultarVolanteSolicitudServiciosRPT[];
  public ServiciosUnicos: ConsultarVolanteSolicitudServiciosUnicosRPT[];
  public Contenedores: ConsultarVolanteSolicitudContenedoresRPT[];
  public ServiciosContenedores: ConsultarVolanteSolicitudServiciosContenedoresRPT[];
  public Datos: GenerarSolicitudDetalle[];
  
  public objConsultaVolanteSolicitudRQT: ConsultarVolanteSolicitudRQT;
  public objConsultaVolanteSolicitudRPT: ConsultarVolanteSolicitudRPT;
  public objGenerarSolicitud: GenerarSolicitud;
  //public objGenerarSolicitudDetalle: GenerarSolicitudDetalle;

  setearFechasLimite(){
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
  }

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<NuevoSolServComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
  this.BLCodigo = "";
  this.BLNumero= "";
  this.Manifiesto= "";
  this.Nave= "";
  this.Viaje= "";
  this.Rumbo= "";
  this.Carga= "";
  this.CodCarga= "";
  this.Cliente= "";
  this.Condicion= "";
  this.EntiCodigo= "";
  this.CodCliente= "";
  this.CodViaje= "";
  
  }

  @ViewChild(DataTableDirective)
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  dtTriggerServicios: Subject<any> = new Subject();
  dtTriggerContenedores: Subject<any> = new Subject();
  dtTriggerServiciosContenedores: Subject<any> = new Subject();
  dtOptionsServicios: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    dom: 'Bfrtip',
    //processing: true,
    fixedColumns: true,
    buttons: [
      /*'colvis',
      'excel',*/
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      search: "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      buttons: {
        /*         colvis : "Columnas",
                excel : "Exportar a Excel" */
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
  dtOptionsContenedores: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    dom: 'Bfrtip',
    //processing: true,
    fixedColumns: true,
    buttons: [
      /*'colvis',
      'excel',*/
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      search: "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      buttons: {
        /*         colvis : "Columnas",
                excel : "Exportar a Excel" */
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
  dtOptionsServiciosContenedores: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    dom: 'Bfrtip',
    //processing: true,
    fixedColumns: true,
    buttons: [
      /*'colvis',
      'excel',*/
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      search: "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      buttons: {
        /*         colvis : "Columnas",
                excel : "Exportar a Excel" */
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
  public BuscarServicio(form: NgForm) {
    this.objConsultaVolanteSolicitudRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        Documento: form.value.txtbox_NBooking,
        UnidadNeg:""
    }
    console.log(this.objConsultaVolanteSolicitudRQT);
    
    let res = this.reportService.ConsultarVolanteSolicitud(this.objConsultaVolanteSolicitudRQT);
    res.subscribe(
      data => {
        var resp: ConsultarVolanteSolicitudRPT;
        resp = data;
        console.log("CONSULTA DATOS" + JSON.stringify(data));
        if (data.CodMsj == 1) {
          swal(data.Msj.toString());
        } else {
          let DetalleServicios = []; 
          let DetalleServiciosUnicos = []; 
          let DetalleContenedores = [];  
          let DetalleServiciosContenedores = [];
          
          this.BLCodigo = data.BLCodigo;
          this.BLNumero= data.BLNumero;
          this.Manifiesto= data.Manifiesto;
          this.Nave= data.Manifiesto + " / " + data.Nave ;
          this.Viaje= data.Viaje;
          this.Rumbo= data.Rumbo;
          this.Carga= data.Carga;
          this.CodCarga= data.CodCarga;
          this.Cliente= data.Cliente;
          this.Condicion= data.Condicion;
          this.EntiCodigo= data.EntiCodigo;
          this.CodCliente= data.CodCliente;
          this.CodViaje= data.CodViaje;

          for (var contn in data.data){
            DetalleContenedores.push({'CONTCARGCODIGO': data.data[contn].CONTCARGCODIGO, 'CONTNUMERO': data.data[contn].CONTNUMERO, 'CONTCAPAIDENTIFICADOR': data.data[contn].CONTCAPAIDENTIFICADOR, 'CONTTIPO': data.data[contn].CONTTIPO, 'PESO': data.data[contn].PESO, 'BULTOS': data.data[contn].BULTOS, 'Empaque': data.data[contn].Empaque, "Seleccion": false });
          }

          this.Contenedores = DetalleContenedores;
          console.log("CONSULTA DETALLE Contenedores " + this.Contenedores);
          
          for (var servc in data.serv){
            console.log(data.serv[servc].SERVDETACODIGO)
            DetalleServicios.push({'SERVDETACODIGO': data.serv[servc].SERVDETACODIGO, 'SERVDESCRIPCION': data.serv[servc].SERVDESCRIPCION, 'CONTCAPACODIGO': data.serv[servc].CONTCAPACODIGO, 'ConvDetaOrden': data.serv[servc].ConvDetaOrden, 'ServTN': data.serv[servc].ServTN, 'ServCategoria': data.serv[servc].ServCategoria, "Seleccion": false });
            DetalleServiciosUnicos.push({'SERVDESCRIPCION': data.serv[servc].SERVDESCRIPCION, "Seleccion": false });
          }

          this.Servicios = DetalleServicios;
          console.log("CONSULTA DETALLE Servicios " + JSON.stringify(this.Servicios ));

/*           var SERVDESC: string;
          SERVDESC="";
          for (var servcu in data.serv){
            if (data.serv[servcu].SERVDESCRIPCION == SERVDESC){
             }else{
              SERVDESC = data.serv[servcu].SERVDESCRIPCION;
              console.log(SERVDESC);
              DetalleServiciosUnicos.push({'SERVDESCRIPCION': data.serv[servcu].SERVDESCRIPCION, "Seleccion": false });

            }
          } */
/*           Array.prototype.unique=function(a){
            return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
          }); */
          
          var uniqs = DetalleServiciosUnicos.filter((el, index) => DetalleServiciosUnicos.indexOf(el) === index)
          console.log(uniqs); 

          this.ServiciosUnicos = uniqs;
          console.log('SERVICIOS UNICOS '+ JSON.stringify(this.ServiciosUnicos))

          DetalleServiciosContenedores.push({'ORDEN': 0,'CONTNUMERO': "",'SERVDESCRIPCION': "", 'Empaque': "", 'BULTOS': "" });
          this.ServiciosContenedores = DetalleServiciosContenedores;

          this.SiCargoData = true;
          this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
          });
          
          this.dtTriggerContenedores.next(this.Contenedores);
          this.dtTriggerServicios.next(this.ServiciosUnicos);
          this.dtTriggerServiciosContenedores.next(this.ServiciosContenedores);
        }
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });
  }



  ngAfterViewInit(): void {
    this.dtTriggerServicios.next();
    this.dtTriggerContenedores.next();
    this.dtTriggerServiciosContenedores.next();
  }

  public ngOnInit(): any {
    this.Contnumero = localStorage.getItem("paramNBooking");
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }
  }

  public IniciarForm(form: NgForm) {
  }

  public ngOnDestroy(): any {
    this.dtTriggerServicios.unsubscribe();
    this.dtTriggerContenedores.unsubscribe();
    this.dtTriggerServiciosContenedores.unsubscribe();
  }
  
  public ValidarInput(param: GenerarSolicitud): boolean {

    if (this.NullEmpty(param.AnioDUA) ) {
      this.objGenerarSolicitud.AnioDUA="";
      //return true;
    } 

    if (this.NullEmpty(param.DUA) ) {
      this.objGenerarSolicitud.DUA="";
      //return true;
    } 

    if (this.NullEmpty(param.RegimenDUA) ) {
      this.objGenerarSolicitud.RegimenDUA="";
      //return true;
    } 

    if (this.NullEmpty(param.HojaServObservacione) ) {
      this.objGenerarSolicitud.HojaServObservacione="";
      //return true;
    } 

    if (this.NullEmpty(param.NombreContacto) ) {
      this.objGenerarSolicitud.NombreContacto="";
      //return true;
    } 

    if (this.NullEmpty(param.ApellidoContacto) ) {
      this.objGenerarSolicitud.ApellidoContacto="";
      //return true;
    }

    if (this.NullEmpty(param.TelefonoContacto) ) {
      this.objGenerarSolicitud.TelefonoContacto="";
      //return true;
    }
/*     var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarSolicitud.FechaNum = this.objGenerarRefrendoExpoRQT.FechaNum.toLocaleDateString("es-ES",options);
    console.log(this.objGenerarRefrendoExpoRQT.FechaNum); */
    return false;
  }

  public NullEmpty(param: any): boolean {
    return !(typeof param != 'undefined' && param)
  }

 
  public SetGrillaVisibility(paramControl: string, paramControl2: string, param: boolean) {
    if (param) {
      document.getElementById(paramControl).style.visibility = "visible";
      //document.getElementById(paramControl).style.visibility = "visible";
    }
    else {
      document.getElementById(paramControl).style.visibility = "hidden";
      if (paramControl2.length > 0) {
        document.getElementById(paramControl2).style.visibility = "hidden";
      }
    }
  }
  public muestra_oculta(param: string) {
    if (document.getElementById) { //se obtiene el id
      var el = document.getElementById(param); //se define la variable "el" igual a nuestro div
      el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
    }
  }


  public SiTieneData(param: boolean) {
    this.TieneData = false;
  }

  public cerrarPopup() {
    this.dialogRef.close();
    return false;
  }

  public AgregarServicioContenedor(){
    var NOrden: number;
    NOrden = 0;
    console.log("CONSULTA SELECCION Servicios " + JSON.stringify(this.Servicios ));
    console.log("CONSULTA SELECCION Contenedor " + JSON.stringify(this.Contenedores ));
    let DetalleServiciosContenedores = []; 
    let CkContenedores: boolean;
    let CkServicios: boolean;
    CkContenedores = false;
    CkServicios = false;

    for (var serv in this.Servicios){
      if (this.Servicios[serv].Seleccion == true){
        CkServicios = true;
      }
    }

    console.log("Validando Contenedores "+ CkServicios);
    if (CkServicios == false){
      swal({
        text: "Debe seleccionar al menos un Servicio",
        icon: "warning",
      });
      return false;
    } else if ( CkServicios == true){

    for (var contn in this.Contenedores){
      if (this.Contenedores[contn].Seleccion == true){
        
        CkContenedores = true;
        console.log("Contenedores Seleccionados "+ CkContenedores);
      }
    }
    console.log("Validando Contenedores "+ CkContenedores);

      if (CkContenedores == false){
        swal({
          text: "Debe seleccionar al menos un Contenedor",
          icon: "warning",
        });
        return false;
      }
    }

    for (var contn in this.Contenedores){
        for (var servc in this.Servicios){
          if (this.Contenedores[contn].Seleccion == true){
            if (this.Servicios[servc].Seleccion == true){
              NOrden = NOrden + 1;
              DetalleServiciosContenedores.push({'ORDEN': NOrden,'CONTNUMERO': this.Contenedores[contn].CONTNUMERO,'SERVDESCRIPCION': this.Servicios[servc].SERVDESCRIPCION, 'Empaque': this.Contenedores[contn].Empaque, 'BULTOS': this.Contenedores[contn].BULTOS, 'SERVDETACODIGO': this.Servicios[servc].SERVDETACODIGO, 'CONTCARGCODIGO': this.Contenedores[contn].CONTCARGCODIGO });
            }
          }
        }
    }
    this.ServiciosContenedores = DetalleServiciosContenedores;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
    });
    
    this.dtTriggerContenedores.next(this.Contenedores);
    this.dtTriggerServicios.next(this.ServiciosUnicos);
    this.dtTriggerServiciosContenedores.next(this.ServiciosContenedores);

    console.log("CONSULTA SELECCION Servicios Contenedor " + JSON.stringify(this.ServiciosContenedores ));

  }

  public EliminarServicioContenedor(paramOrden: Number){
    var NOrden: number;
    NOrden = 0;
    console.log("CONSULTA SELECCION Servicios " + JSON.stringify(this.Servicios ));
    console.log("CONSULTA SELECCION Contenedor " + JSON.stringify(this.Contenedores ));
    let DetalleServiciosContenedores = []; 

    for (var servcontn in this.ServiciosContenedores){
      if (this.ServiciosContenedores[servcontn].ORDEN != paramOrden){
        NOrden = NOrden + 1;
        DetalleServiciosContenedores.push({'ORDEN': NOrden,'CONTNUMERO': this.ServiciosContenedores[servcontn].CONTNUMERO,'SERVDESCRIPCION': this.ServiciosContenedores[servcontn].SERVDESCRIPCION, 'Empaque': this.ServiciosContenedores[servcontn].Empaque, 'BULTOS': this.ServiciosContenedores[servcontn].BULTOS, 'SERVDETACODIGO': this.ServiciosContenedores[servcontn].SERVDETACODIGO, 'CONTCARGCODIGO': this.ServiciosContenedores[servcontn].CONTCARGCODIGO });
      }
    }

    this.ServiciosContenedores = DetalleServiciosContenedores;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
    });
    
    this.dtTriggerContenedores.next(this.Contenedores);
    this.dtTriggerServicios.next(this.ServiciosUnicos);
    this.dtTriggerServiciosContenedores.next(this.ServiciosContenedores);
  }

  public AgregarSolicitud(form: NgForm){
    let DetalleServiciosContenedores = []; 
    for (var servcontn in this.ServiciosContenedores){
        DetalleServiciosContenedores.push({'CodServicio': this.ServiciosContenedores[servcontn].SERVDETACODIGO,'CodContenedor': this.ServiciosContenedores[servcontn].CONTCARGCODIGO, 'Contenedor': this.ServiciosContenedores[servcontn].CONTNUMERO });
    }

    this.Datos =  DetalleServiciosContenedores;
    console.log("Detalle DetalleServiciosContenedores " + JSON.stringify(this.Datos ));
    this.objGenerarSolicitud = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      RubrCodigo: "",
      HojaServObservacione: form.value.txtbox_Observacion,
      RegiCodigo: form.value.txtbox_NBooking,
      HojaServPrograma: "",
      Documento: "",
      AnioDUA: form.value.txtbox_Anio,
      RegimenDUA: form.value.txtbox_Regimen,
      DUA: form.value.txtbox_DUA,
      TareServCodigo: form.value.txtbox_Tarea,
      NombreContacto: form.value.txtbox_Nombre,
      ApellidoContacto: form.value.txtbox_Apellidos,
      TelefonoContacto: form.value.txtbox_Nextel,
      Deta: this.Datos
  }
  console.log("Detalle objGenerarSolicitud " + JSON.stringify(this.objGenerarSolicitud ));

  if(this.ValidarInput(this.objGenerarSolicitud))
  {        
    swal({
          text: "Error en los campos de ingreso, por favor verificar",
          icon: "warning",
        });
    return;
  }

  


  }
}
