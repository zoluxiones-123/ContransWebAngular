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
import { ListaTareaRPT,ListaTareaRQT,GenerarSolicitudRQT,GenerarSolicitudRPT, GenerarSolicitudRQTDetalle, ConsultarVolanteSolicitudRPT, ConsultarVolanteSolicitudRQT,ConsultarVolanteSolicitudServiciosRPT,ConsultarVolanteSolicitudServiciosUnicosRPT, ConsultarVolanteSolicitudContenedoresRPT, ConsultarVolanteSolicitudServiciosContenedoresRPT }  from '../../models/SolicitudServicio';
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
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';


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
  minDates: string;
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

  FechaDeNum: any;
  Hora: string;

  Anio:number;
  DUA:number;
  Regimen:number;
  Tarea: string;
  Observacion: string;
  Nombre: string;
  Apellidos : string;
  NCelular:number;

  Seleccion_Opcion: string;
  TareaSelect: string;

  CantidadBultos: number;
  CantidadPeso: number;

  public unaAM : string = "01:00";
  public dosAM : string = "02:00";
  public tresAM : string = "03:00";
  public cuatroAM : string = "04:00";
  public cincoAM : string = "05:00";
  public seisAM : string = "06:00";
  public sieteAM : string = "07:00";
  public ochoAM : string = "08:00";
  public nueveAM : string = "09:00";
  public diezAM : string = "10:00";
  public onceAM : string = "11:00";
  public doceAM : string = "12:00";
  
  
  public unaPM : string = "13:00";
  public dosPM : string = "14:00";
  public tresPM : string = "15:00";
  public cuatroPM : string = "16:00";
  public cincoPM : string = "17:00";
  public seisPM : string = "18:00";
  public sietePM : string = "19:00";
  public ochoPM : string = "20:00";
  public nuevePM : string = "21:00";
  public diezPM : string = "22:00";
  public oncePM : string = "23:00";
  public docePM : string = "24:00";

  public Servicios: ConsultarVolanteSolicitudServiciosRPT[];
  public ServiciosUnicos: ConsultarVolanteSolicitudServiciosUnicosRPT[];
  public Contenedores: ConsultarVolanteSolicitudContenedoresRPT[];
  public ServiciosContenedores: ConsultarVolanteSolicitudServiciosContenedoresRPT[];
  public Datos: GenerarSolicitudRQTDetalle[];
  
  public objConsultaVolanteSolicitudRQT: ConsultarVolanteSolicitudRQT;
  public objConsultaVolanteSolicitudRPT: ConsultarVolanteSolicitudRPT;
  public objGenerarSolicitudRQT: GenerarSolicitudRQT;
  public objGenerarSolicitudRPT: GenerarSolicitudRPT;
  //public objGenerarSolicitudDetalle: GenerarSolicitudDetalle;

  public objListaTareaRPT: Array<ListaTareaRPT>;
  public objListaTareaRQT: ListaTareaRQT;
  

  setearFechasLimite(DiaMas:number,DiasRepeticion:number ){
    let date = new Date();
    this.minDate = new Date(date.setDate(date.getDate() + DiaMas));
    this.maxDate = new Date(date.setDate(date.getDate() + DiasRepeticion));    

    console.log( 'minDate: '+ this.minDate + " -  DiaMas: " + DiaMas);
    console.log( 'maxDate: '+ this.maxDate + " -  DiasRepeticion: " + DiasRepeticion);
    
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
  this.Seleccion_Opcion="01"
  this.Anio=0;
  this.DUA=0;
  this.Regimen=0;
  this.Tarea= "";
  this.Observacion= "";
  this.Nombre= "";
  this.Apellidos = "";
  this.NCelular=0;
  this.TareaSelect="0";
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

    this.objListaTareaRQT = {
      Index: "0",
  }
    let res2 = this.reportService.ConsultaTarea(this.objListaTareaRQT);
    res2.subscribe(
      data => {
        var resp: ListaTareaRPT;
        resp = data;
        this.objListaTareaRPT = data.Data;
        console.log("CONSULTA TAREAS" + JSON.stringify(this.objListaTareaRPT));
       
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });



    this.objConsultaVolanteSolicitudRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        Documento: form.value.txtbox_NBooking,
        UnidadNeg:""
    }
    console.log(this.objConsultaVolanteSolicitudRQT);

    if(this.ValidarInputBuscar(this.objConsultaVolanteSolicitudRQT))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }
  
    
    let res = this.reportService.ConsultarVolanteSolicitud(this.objConsultaVolanteSolicitudRQT);
    res.subscribe(
      data => {
        var resp: ConsultarVolanteSolicitudRPT;
        resp = data;
        console.log("CONSULTA DATOS" + JSON.stringify(data));
        if (data.CodMsj == 1) {
          swal(data.Msj.toString());
        } else {

          this.muestra_oculta('DatosGenerales');
          this.muestra_oculta('DatosContacto');
          this.muestra_oculta('Servicios');
          this.muestra_oculta('Contenedores');
          //this.muestra_oculta('ServiciosAsignadosaContendores');

          let DetalleServicios = []; 
          let DetalleServiciosUnicos = [];
          let DetalleServiciosUnicosConteo = []; 
          let DetalleServiciosUnicosFinal = []; 
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
          console.log("CONSULTA DETALLE Contenedores " + JSON.stringify(this.Contenedores ));
          
          for (var servc in data.serv){
            console.log(data.serv[servc].SERVDETACODIGO)
            DetalleServicios.push({'SERVDETACODIGO': data.serv[servc].SERVDETACODIGO, 'SERVDESCRIPCION': data.serv[servc].SERVDESCRIPCION, 'CONTCAPACODIGO': data.serv[servc].CONTCAPACODIGO, 'ConvDetaOrden': data.serv[servc].ConvDetaOrden, 'ServTN': data.serv[servc].ServTN, 'ServCategoria': data.serv[servc].ServCategoria, "Seleccion": false });
            if (data.serv[servc].SERVDESCRIPCION.trim()=="MOVILIZACION"){
            }else{
              DetalleServiciosUnicos.push({'SERVDESCRIPCION': data.serv[servc].SERVDESCRIPCION, "Seleccion": false });
            }
          }

          this.Servicios = DetalleServicios;
          console.log("CONSULTA DETALLE Servicios " + JSON.stringify(this.Servicios ));
          
          for (var valores1 in  DetalleServiciosUnicos) {
            let DetalleServiciosUnicos2 = [];
            DetalleServiciosUnicos2 = this.Servicios.filter(detalle => detalle.SERVDESCRIPCION == DetalleServiciosUnicos[valores1].SERVDESCRIPCION);
            //console.log(DetalleServiciosUnicos2);
            DetalleServiciosUnicosConteo = DetalleServiciosUnicosFinal.filter(detalle => detalle.SERVDESCRIPCION == DetalleServiciosUnicos[valores1].SERVDESCRIPCION);
            if (DetalleServiciosUnicosConteo.length==0){
              var estado: boolean;
              estado=false;
              for (var valores2 in DetalleServiciosUnicos2 ) {
                if (estado== false){
                  estado=true;
                  DetalleServiciosUnicosFinal.push({'SERVDESCRIPCION': DetalleServiciosUnicos2[valores2].SERVDESCRIPCION, "Seleccion": false });
                 // console.log(DetalleServiciosUnicosFinal);
                }
             }
            }

          }

          this.ServiciosUnicos = DetalleServiciosUnicosFinal;
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
    this.setearFechasLimite( Number.parseInt(localStorage.getItem("paramDiaMas")), Number.parseInt(localStorage.getItem("paramDiasRepeticion")));
    this.Contnumero = localStorage.getItem("paramNBooking");
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }

    this.muestra_oculta('DatosGenerales');
    this.muestra_oculta('DatosContacto');
    this.muestra_oculta('Servicios');
    this.muestra_oculta('Contenedores');
    this.muestra_oculta('ServiciosAsignadosaContendores');
  }

  public IniciarForm(form: NgForm) {
  }

  public ngOnDestroy(): any {
    this.dtTriggerServicios.unsubscribe();
    this.dtTriggerContenedores.unsubscribe();
    this.dtTriggerServiciosContenedores.unsubscribe();
  }
  
  public ValidarInputBuscar(param: ConsultarVolanteSolicitudRQT): boolean {

    if (this.NullEmpty(param.Documento) ) {
      //this.objConsultaVolanteSolicitudRQT.Documento="";
      return true;
    }
    return false;
  }
  public ValidarInput(param: GenerarSolicitudRQT): boolean {

    if (this.NullEmpty(param.AnioDUA) ) {
      this.objGenerarSolicitudRQT.AnioDUA="";
      //return true;
    } 

    if (this.NullEmpty(param.DUA) ) {
      this.objGenerarSolicitudRQT.DUA="";
      //return true;
    } 

    if (this.NullEmpty(param.RegimenDUA) ) {
      this.objGenerarSolicitudRQT.RegimenDUA="";
      //return true;
    } 

    if (this.NullEmpty(param.HojaServObservacione) ) {
      this.objGenerarSolicitudRQT.HojaServObservacione="";
      //return true;
    } 

    if (this.NullEmpty(param.NombreContacto) ) {
      this.objGenerarSolicitudRQT.NombreContacto="";
      //return true;
    } 

    if (this.NullEmpty(param.ApellidoContacto) ) {
      this.objGenerarSolicitudRQT.ApellidoContacto="";
      //return true;
    }

    if (this.NullEmpty(param.TelefonoContacto) ) {
      this.objGenerarSolicitudRQT.TelefonoContacto="";
      //return true;
    }
    if (this.NullEmpty(this.TareaSelect) ) {
      //this.objGenerarSolicitudRQT.TelefonoContacto="";
      return true;
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

  public CargarTarea(paramValor: string) {

    this.objListaTareaRQT = {
      Index: paramValor,
  }
    let res2 = this.reportService.ConsultaTarea(this.objListaTareaRQT);
    res2.subscribe(
      data => {
        var resp: ListaTareaRPT;
        resp = data;
        this.objListaTareaRPT = data.Data;
        console.log("CONSULTA TAREAS" + JSON.stringify(this.objListaTareaRPT));
       
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });

  }

  public SiTieneData(param: boolean) {
    this.TieneData = false;
  }

  public cerrarPopup() {
    this.dialogRef.close();
    return false;
  }

  public AgregarServicioContenedor(){
    this.muestra_oculta('ServiciosAsignadosaContendores');
    var NOrden: number;
    NOrden = 0;
    console.log("CONSULTA SELECCION Servicios " + JSON.stringify(this.Servicios ));
    console.log("CONSULTA SELECCION Contenedor " + JSON.stringify(this.Contenedores ));
    let DetalleServiciosContenedores = []; 
    let CkContenedores: boolean;
    let CkServicios: boolean;
    CkContenedores = false;
    CkServicios = false;

    for (var serv in this.ServiciosUnicos){
      if (this.ServiciosUnicos[serv].Seleccion == true){
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
        for (var servc in this.ServiciosUnicos){
          if (this.Contenedores[contn].Seleccion == true){
            if (this.ServiciosUnicos[servc].Seleccion == true){

              let DetalleServiciosUnicos = [];                                                                                                                                                                                                                                                                                                                                                                                                              
              DetalleServiciosUnicos = this.Servicios.filter(detalle => detalle.SERVDESCRIPCION == this.ServiciosUnicos[servc].SERVDESCRIPCION);
        
              for (var servcu in DetalleServiciosUnicos){
                if (this.Contenedores[contn].CONTCAPAIDENTIFICADOR== DetalleServiciosUnicos[servcu].CONTCAPACODIGO){
                  NOrden = NOrden + 1;
                  DetalleServiciosContenedores.push({'ORDEN': NOrden,'CONTNUMERO': this.Contenedores[contn].CONTNUMERO,'SERVDESCRIPCION': DetalleServiciosUnicos[servcu].SERVDESCRIPCION.trim(), 'Empaque': this.Contenedores[contn].Empaque, 'BULTOS': this.Contenedores[contn].BULTOS, 'SERVDETACODIGO': DetalleServiciosUnicos[servcu].SERVDETACODIGO, 'CONTCARGCODIGO': this.Contenedores[contn].CONTCARGCODIGO });
                }
              }

              if (this.ServiciosUnicos[servc].SERVDESCRIPCION.trim()=="CUADRILLA"){
                let DetalleServiciosUnicos = [];                                                                                                                                                                                                                                                                                                                                                                                                              
                DetalleServiciosUnicos = this.Servicios.filter(detalle => detalle.SERVDESCRIPCION == "MOVILIZACION");
          
                for (var servcu in DetalleServiciosUnicos){
                  if (this.Contenedores[contn].CONTCAPAIDENTIFICADOR== DetalleServiciosUnicos[servcu].CONTCAPACODIGO){
                    NOrden = NOrden + 1;
                    DetalleServiciosContenedores.push({'ORDEN': NOrden,'CONTNUMERO': this.Contenedores[contn].CONTNUMERO,'SERVDESCRIPCION': DetalleServiciosUnicos[servcu].SERVDESCRIPCION.trim(), 'Empaque': this.Contenedores[contn].Empaque, 'BULTOS': this.Contenedores[contn].BULTOS, 'SERVDETACODIGO': DetalleServiciosUnicos[servcu].SERVDETACODIGO, 'CONTCARGCODIGO': this.Contenedores[contn].CONTCARGCODIGO });
                  }
                }
              }



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
    let VCONTNUMERO: string;
    let VORDEN: number;

    VCONTNUMERO="";
    VORDEN=0;

    for (var servcontn in this.ServiciosContenedores){
      if (this.ServiciosContenedores[servcontn].ORDEN == paramOrden && this.ServiciosContenedores[servcontn].SERVDESCRIPCION.trim()=="CUADRILLA" ){
        VCONTNUMERO=this.ServiciosContenedores[servcontn].CONTNUMERO;
      }
      if (this.ServiciosContenedores[servcontn].SERVDESCRIPCION.trim()=="MOVILIZACION" && this.ServiciosContenedores[servcontn].CONTNUMERO==VCONTNUMERO ){
        VORDEN=this.ServiciosContenedores[servcontn].ORDEN;
      }

    }

    for (var servcontn in this.ServiciosContenedores){
      if (this.ServiciosContenedores[servcontn].ORDEN == paramOrden && this.ServiciosContenedores[servcontn].SERVDESCRIPCION.trim()=="MOVILIZACION" ){
        VCONTNUMERO=this.ServiciosContenedores[servcontn].CONTNUMERO;
      
      for (var servcontn2 in this.ServiciosContenedores){
        if (this.ServiciosContenedores[servcontn2].SERVDESCRIPCION.trim()=="CUADRILLA" && this.ServiciosContenedores[servcontn2].CONTNUMERO==VCONTNUMERO ){
          VORDEN=this.ServiciosContenedores[servcontn2].ORDEN;
        }
      }
    }
    }

    console.log(" Eliminar: " + VCONTNUMERO +" - "+VORDEN );


    for (var servcontn in this.ServiciosContenedores){
      if (this.ServiciosContenedores[servcontn].ORDEN != paramOrden && this.ServiciosContenedores[servcontn].ORDEN != VORDEN){
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

    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.FechaDeNum  = this.FechaDeNum.toLocaleDateString("es-ES",options);

    this.Datos =  DetalleServiciosContenedores;
    //console.log("Detalle DetalleServiciosContenedores " + JSON.stringify(this.Datos ));
    this.objGenerarSolicitudRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      RubrCodigo:  this.Seleccion_Opcion,
      HojaServObservacione: this.Observacion,
      RegiCodigo: form.value.txtbox_NBooking,
      HojaServPrograma: this.FechaDeNum + " " + this.Hora,
      Documento: this.BLNumero,
      AnioDUA: this.Anio.toString(),
      RegimenDUA: this.Regimen.toString(),
      DUA: this.DUA.toString(),
      TareServCodigo: this.TareaSelect,
      NombreContacto: this.Nombre,
      ApellidoContacto: this.Apellidos,
      TelefonoContacto: this.NCelular.toString(),
      Deta: this.Datos
  }
  console.log("Detalle objGenerarSolicitud " + JSON.stringify(this.objGenerarSolicitudRQT ));

  if(this.ValidarInput(this.objGenerarSolicitudRQT))
  {        
    swal({
          text: "Error en los campos de ingreso, por favor verificar",
          icon: "warning",
        });
    return;
  }

  console.log("EMPEZAR A GUARDAR DATOS")
  this.reportService.GenerarSolicitud(this.objGenerarSolicitudRQT).subscribe(
    data => {
      this.objGenerarSolicitudRPT = data;
      console.log("Data : " + JSON.stringify(data));
      console.log("Mensaje : " + data.Msj.toString());

      swal({
        icon: 'success',
        title: data.Msj.toString(),
      });
      this.cerrarPopup();
    },
    error => {
      swal("Error al crear Refrendo Expo");
      console.log("Error : ", error);
    });



  }

  onItemChangeHora(param :any){
    this.Hora =  param.target.id;
    console.log(param.target.id)
  }

  public ChangingValue(param : any)
  {
      this.TareaSelect = param.target.value;
      console.log(param.target.value)

    
  }


}
