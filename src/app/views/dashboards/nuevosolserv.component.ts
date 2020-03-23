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
import { ConsultarVolanteSolicitudRPT, ConsultarVolanteSolicitudRQT,ConsultarVolanteSolicitudServiciosRPT, ConsultarVolanteSolicitudContenedoresRPT, ConsultarVolanteSolicitudServiciosContenedoresRPT }  from '../../models/SolicitudServicio';
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
  public Contenedores: ConsultarVolanteSolicitudContenedoresRPT[];
  public ServiciosContenedores: ConsultarVolanteSolicitudServiciosContenedoresRPT[];
/*    public Datos: ConsultaDetalleBookingRefrendoExpoRPT[];

  public objConsultaBookingRefrendoExpoRQT: ConsultaBookingRefrendoExpoRQT;
  public objConsultaBookingRefrendoExpoRPT: ConsultaBookingRefrendoExpoRPT;
  public objGenerarRefrendoExpoRQT: GenerarRefrendoExpoRQT;
  public objGenerarRefrendoExpoRPT: GenerarRefrendoExpoRPT;
  public objGenerarDetalleRefrendoExpoRQT: GenerarDetalleRefrendoExpoRQT;  */
  
  public objConsultaVolanteSolicitudRQT: ConsultarVolanteSolicitudRQT;
  public objConsultaVolanteSolicitudRPT: ConsultarVolanteSolicitudRPT;


/*   public ModalidadSelect: string;
  public ListaModalidad: Array<ListaModalidadRefrendoExpo>; */

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
            DetalleContenedores.push({'CONTCARGCODIGO': data.data[contn].CONTCARGCODIGO, 'CONTNUMERO': data.data[contn].CONTNUMERO, 'CONTCAPAIDENTIFICADOR': data.data[contn].CONTCAPAIDENTIFICADOR, 'CONTTIPO': data.data[contn].CONTTIPO, 'PESO': data.data[contn].PESO, 'BULTOS': data.data[contn].BULTOS, 'Empaque': data.data[contn].Empaque, "Seleccion": true });
          }

          this.Contenedores = DetalleContenedores;
          console.log("CONSULTA DETALLE Contenedores " + this.Contenedores);
          
          for (var servc in data.serv){
            console.log(data.serv[servc].SERVDETACODIGO)
            DetalleServicios.push({'SERVDETACODIGO': data.serv[servc].SERVDETACODIGO, 'SERVDESCRIPCION': data.serv[servc].SERVDESCRIPCION, 'CONTCAPACODIGO': data.serv[servc].CONTCAPACODIGO, 'ConvDetaOrden': data.serv[servc].ConvDetaOrden, 'ServTN': data.serv[servc].ServTN, 'ServCategoria': data.serv[servc].ServCategoria, "Seleccion": true });
          }

          this.Servicios = DetalleServicios;
          console.log("CONSULTA DETALLE Servicios " + JSON.stringify(this.Servicios ));

          this.SiCargoData = true;
          this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
          });
          
          this.dtTriggerContenedores.next(this.Contenedores);
          this.dtTriggerServicios.next(this.Servicios);
        }
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });
  }

x

  ngAfterViewInit(): void {
    this.dtTriggerServicios.next();
    this.dtTriggerContenedores.next();
    this.dtTriggerServiciosContenedores.next();
  }

  public ngOnInit(): any {
    this.Contnumero = localStorage.getItem("paramNBooking");
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }
/*     this.muestra_oculta("DAM");
    this.muestra_oculta("CONTENEDORES");
    this.muestra_oculta("DOCUMENTOS"); */

  }

  public IniciarForm(form: NgForm) {
  }

  public ngOnDestroy(): any {
    this.dtTriggerServicios.unsubscribe();
    this.dtTriggerContenedores.unsubscribe();
    this.dtTriggerServiciosContenedores.unsubscribe();
  }
  
  public ValidarInput(param: ConsultarVolanteSolicitudRQT): boolean {

    /* if (this.NullEmpty(param.Exportador) ) {
      return true;
    } 

    if (this.NullEmpty(param.Despachador) ) {
      return true;
    } 

    if (this.NullEmpty(param.AgenciaAduana) ) {
      return true;
    } 

    if (this.NullEmpty(param.NumOrden) ) {
      return true;
    } 

    if (this.NullEmpty(param.DAM) ) {
      return true;
    } 

    if (this.NullEmpty(param.FechaNum) ) {
      return true;
    }

    if (this.NullEmpty(param.Mercancia) ) {
      return true;
    }
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarRefrendoExpoRQT.FechaNum = this.objGenerarRefrendoExpoRQT.FechaNum.toLocaleDateString("es-ES",options);
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
    console.log("CONSULTA SELECCION Servicios " + JSON.stringify(this.Servicios ));
  }

}
