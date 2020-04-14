import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from "rxjs/internal/Observable";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ListaRegimenRefrendoExpo,ListaDetallePagoCobranzaDetalleRPT,ListaDetallePagoCobranzaDetalleRQT,Productos,Producto,Despachador,Despachadores,AgenciaAduana, AgenciaAduanera,ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo, GenerarRefrendoExpoRQT, GenerarRefrendoExpoRPT, GenerarDetalleRefrendoExpoRQT,GenerarArchivoRefrendoExpoRQT } from '../../models/RefrendoExpo';
import { MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';
import { esLocale } from 'ngx-bootstrap';
import { Base64RPT, Base64RQT } from '../../models/Base64';
import { ZipRPT, ZipRQT } from '../../models/ConvertirZip';
import { FileItem } from '../../models/FileItem';
import { isError } from 'util';
import { entidad,Entidades } from 'app/models/entidad';
import { startWith, map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'pagoscobranzaconsultadetalle',
  templateUrl: 'pagoscobranzaconsultadetalle.template.html',
  styleUrls: ['pagoscobranzaconsultadetalle.component.css']
})

export class PagosCobranzaConsultaDetalleComponent implements OnInit {
  filteredEntidad: Observable<entidad[]>;
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];
  ControlEntidades = new FormControl();
  public EntidadesSelect:string = "";

  filteredProducto: Observable<Producto[]>;
  public LProductos : Productos;
  public ListaProductos : Array<Producto> = [];
  ControlProductos = new FormControl();
  public ProductosSelect:string = "";

  filteredDespachador: Observable<Despachador[]>;
  public LDespachador : Despachadores;
  public ListaDespachador : Array<Despachador> = [];
  ControlDespachador = new FormControl();
  public DespachadorSelect:string = "";

  filteredAgenciaAduana: Observable<AgenciaAduana[]>;
  public LAgenciaAduana : AgenciaAduanera;
  public ListaAgenciaAduana : Array<AgenciaAduana> = [];
  ControlAgenciaAduana = new FormControl();
  public AgenciaAduanaSelect:string = "";
  public CodigoAgenciaAduanaSelect:string = "";
    

  public SiCargoData = true;
  public TieneData = false;
  fechaActual: any;
  minDate: Date;
  maxDate: Date;
  Contnumero: string;

  REPORTDECARGASUELTA:boolean;
  TARJADELLENADO:boolean;

  Codigo: string;
  Booking: string;
  Viaje: string;
  PuerDesc: string;
  PDestino: string;
  TipCarga: string;
  TipoCont: string;
  Exportador: string;
  Mercaderia: string;

  Despachador: string;
  AgenciaDeAduana: string;
  NroDeOrden: string;
  NroDeDAM: string;
  FechaDeNum: any;

  MandatoElectronico: boolean;/// CONSULTAR
  FOB: string;/// CONSULTAR

  FechaCutOff: any;
  CodProducto:string;
  Producto: string;

  Aduana: string;
  Regimen: string;

  CantidadBultos: number;
  CantidadPeso: number;

  public Datos: ConsultaDetalleBookingRefrendoExpoRPT[];

  public objConsultaBookingRefrendoExpoRQT: ConsultaBookingRefrendoExpoRQT;
  public objConsultaBookingRefrendoExpoRPT: ConsultaBookingRefrendoExpoRPT;
  public objGenerarRefrendoExpoRQT: GenerarRefrendoExpoRQT;
  public objGenerarRefrendoExpoRPT: GenerarRefrendoExpoRPT;
  public objGenerarDetalleRefrendoExpoRQT: GenerarDetalleRefrendoExpoRQT;
  public objGenerarArchivoRefrendoExpoRQT: GenerarArchivoRefrendoExpoRQT;

  public objListaDetallePagoCobranzaDetalleRQT: ListaDetallePagoCobranzaDetalleRQT;
  public objListaDetallePagoCobranzaDetalleRPT: ListaDetallePagoCobranzaDetalleRPT;

  public AnioSelect: string;
  public RegimenSelect: string;
  public ModalidadSelect: string;
  public ListaModalidad: Array<ListaModalidadRefrendoExpo>;
  public ListaRegimen: Array<ListaRegimenRefrendoExpo>;
  //public ListaDetallePago: Array<ListaDetallePagoCobranzaDetalle>;
  

  //public Datas: Array<ConsultaDetalleBookingRefrendoExpoRPT>;
  setearFechasLimite() {
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<PagosCobranzaConsultaDetalleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
    this.reportService.ConsultaRegimenRefrendoExpo().subscribe(data => this.ListaRegimen = data.Data);

    //this.reportService.ConsultaPagoCobranzaDetalle().subscribe(data => this.ListaDetallePago = data.Data);

    var emptyString = "";

    this.Codigo = emptyString;
    this.Booking = emptyString;
    this.Viaje = emptyString;
    this.PuerDesc = emptyString;
    this.PDestino = emptyString;
    this.TipCarga = emptyString;
    this.TipoCont = emptyString;
    this.Exportador = emptyString;
    this.Mercaderia = emptyString;

    this.MandatoElectronico= false;/// CONSULTAR
    this.FOB= emptyString;/// CONSULTAR
  
    this.FechaCutOff= emptyString;
    this.CodProducto= emptyString;
    this.Producto= emptyString;

    this.Aduana= emptyString;
    this.Regimen= emptyString;
    
    this.Despachador = emptyString;
    this.AgenciaDeAduana = emptyString;
    this.NroDeOrden = emptyString;
    this.NroDeDAM = emptyString;
    this.FechaDeNum = emptyString;
    this.CantidadBultos = 0;
    this.CantidadPeso = 0;

    this.BuscarDetalle();
  }

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isLoading = false;
  image: any;
  fileitems = [];
  //fileitemsZ = [];
  fileitems_DAM = [];
  fileitems_GUIAREMISION = [];
  fileitems_TARJADELLENADO = [];
  fileitems_TICKETDEPESO = [];
  fileitems_BOOKING = [];
  fileitems_OTROS = [];
  fileitems_REPORTDECARGASUELTA = [];  
  ListaAnio = [];
  //selectedOptions = [];
  selectedOptions_DAM = [];
  selectedOptions_GUIAREMISION = [];
  selectedOptions_TARJADELLENADO = [];
  selectedOptions_TICKETDEPESO = [];
  selectedOptions_BOOKING = [];
  selectedOptions_OTROS = [];
  selectedOptions_REPORTDECARGASUELTA = [];  
  
  cerrado = false;

  public msjfinal: string = "";
  public isError = false;
  public EsMayor5 = false;
  //public filename1: string = "";
  public filename_DAM: string = "";
  public filename_GUIAREMISION: string = "";
  public filename_TARJADELLENADO: string = "";
  public filename_TICKETDEPESO: string = "";
  public filename_BOOKING: string = "";
  public filename_OTROS: string = "";
  public filename_REPORTDECARGASUELTA: string = "";
  
  public fname1: string = "";
/*   public fname2: string = "";
  public fname3: string = "";
  public fname4: string = "";
  public fname5: string = "";
  public fname6: string = ""; */
  //public TotalMB: number = 0.00;
  public TotalMB_DAM: number = 0.00;
  public TotalMB_GUIAREMISION: number = 0.00;
  public TotalMB_TARJADELLENADO: number = 0.00;
  public TotalMB_TICKETDEPESO: number = 0.00;
  public TotalMB_BOOKING: number = 0.00;
  public TotalMB_OTROS: number = 0.00;
  public TotalMB_REPORTDECARGASUELTA: number = 0.00;
  
  public fileitem: any;
  //public fileitemz: any;
  public fileitem_DAM: any;
  public fileitem_GUIAREMISION: any;
  public fileitem_TARJADELLENADO: any;
  public fileitem_TICKETDEPESO: any;
  public fileitem_BOOKING: any;
  public fileitem_OTROS: any;
  public fileitem_REPORTDECARGASUELTA: any;
  
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {
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
    /* footerCallback: function ( row, data, start, end, display ) {
      var total = this.api()
          .column(2)//numero de columna a sumar
          //.column(1, {page: 'current'})//para sumar solo la pagina actual
          .data()
          .reduce(function (a, b) {
              return parseInt(a) + parseInt(b);
          }, 0 );

      $(this.api().column(2).footer()).html(total);
      
    }, */

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

  public BuscarDetalle() {
    this.objListaDetallePagoCobranzaDetalleRQT = {
      IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Id: Number.parseInt(localStorage.getItem("paramIdLiquidacion")),
    } 
    console.log(this.objListaDetallePagoCobranzaDetalleRQT);

    if(this.ValidarInput(this.objListaDetallePagoCobranzaDetalleRQT))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    } 

///Aun Falta obtener el servicio ///
     let res = this.reportService.ConsultaPagoCobranzaDetalle(this.objListaDetallePagoCobranzaDetalleRQT);
    console.log(this.objListaDetallePagoCobranzaDetalleRQT)
    
    res.subscribe( 
      data => { 
        this.objListaDetallePagoCobranzaDetalleRPT = data.Data;
        console.log(data.Data);
        if (data.CodMsj == 0)
        {
          //this.SiCargoData = true;
          //this.dtTrigger.next(this.objTemperaturaRQT);
          //this.SetGrillaVisibility(true);
          // this.TieneData = true;

          this.SiCargoData = true;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(this.objListaDetallePagoCobranzaDetalleRPT);         
          });
          //this.SetGrillaVisibility(true);
         
        }
        else
        {
          this.SiCargoData = true;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
             this.dtTrigger.next(this.objListaDetallePagoCobranzaDetalleRPT);
             //this.SetGrillaVisibility(true);
          });
          swal({
            text: data.Msj,
            icon: "warning",
          });
        }
        //this.dtTrigger.unsubscribe();
      }, 
      error => {
                swal({
        text: "Error al cargar los datos",
        icon: "error",
      }); 
        console.log("Error : ", error); 
      }
    );  

  }


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnInit(): any {
    //this.Contnumero = localStorage.getItem("paramNBooking");
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }

    // this.SetGrillaVisibility(false);
    //this.setearFechasLimite();
/*     this.muestra_oculta("DAM");
    this.muestra_oculta("CONTENEDORES");
    this.muestra_oculta("DOCUMENTOS"); */

}


  onClose() {
    this.cerrado = true;
    this.dialogRef.close();
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


  public IniciarForm(form: NgForm) {
  }
  public ngOnDestroy(): any {
    this.dtTrigger.unsubscribe();
  }

  public ValidarInput(param: ListaDetallePagoCobranzaDetalleRQT): boolean {

/*     if (this.EntidadesSelect == "" || this.ControlEntidades.value.toString() == ""){
      return true;
    }
    if (this.ProductosSelect == "" || this.ControlProductos.value.toString() == ""){
      return true;
    } */
/*     if (this.DespachadorSelect == "" || this.ControlDespachador.value.toString() == ""){
      return true;
    }
    if (this.AgenciaAduanaSelect == "" || this.ControlAgenciaAduana.value.toString() == ""){
      return true;
    } */

    /* if (this.NullEmpty(param.Exportador)) {
      return true;
    }*/

/*     if (this.NullEmpty(param.Despachador)) {
      return true;
    }

    if (this.NullEmpty(param.AgenciaAduana)) {
      return true;
    } 

    if (this.NullEmpty(param.NumOrden)) {
      return true;
    }

    if (this.NullEmpty(param.DAM)) {
      return true;
    }

    if (this.NullEmpty(param.FechaNum)) {
      return true;
    }

    if (this.NullEmpty(param.Mercancia)) {
      return true;
    } */
/*     if (this.NullEmpty(param.Regimen)) {
      return true;
    } */
/*     var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarRefrendoExpoRQT.FechaNum = this.objGenerarRefrendoExpoRQT.FechaNum.toLocaleDateString("es-ES", options);
    console.log(this.objGenerarRefrendoExpoRQT.FechaNum); */
    return false;
  }

  public NullEmpty(param: any): boolean {
    return !(typeof param != 'undefined' && param)
  }

  public SetGrillaVisibility(paramControl: string,  param: boolean) {
    if (param) {
      document.getElementById(paramControl).style.visibility = "visible";
    }
    else {
      document.getElementById(paramControl).style.visibility = "hidden";
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

  public ChangingValue(param: any, paramTipo: string) {
    if (paramTipo == "Modalidad") {
      this.ModalidadSelect = param.target.value;
      console.log("Modalidad " + param.target.value);
      if (param.target.value=="SI"){
        this.TARJADELLENADO= true;
        this.REPORTDECARGASUELTA=false;
      }else if (param.target.value=="NO"){
        this.TARJADELLENADO= false;
        this.REPORTDECARGASUELTA=true;
      }
    }else if (paramTipo == "MandatoElectronico") {
      console.log("MandatoElectronico " + param.target.value);
      if (param.target.value=="001"){
        this.MandatoElectronico= true;
      }else if (param.target.value=="002"){
        this.MandatoElectronico= false;
      }
    }else if (paramTipo == "Anio") {
        console.log("Anio " + param.target.value);
        this.AnioSelect= param.target.value;
    }else if (paramTipo == "Regimen") {
        console.log("Regimen " + param.target.value);
        this.RegimenSelect= param.target.value;
    }else if (paramTipo == "Entidad") {
      console.log("Entre Entidad");
      this.EntidadesSelect=param.option.viewValue
      this.ControlEntidades.setValue(param.option.viewValue);
      console.log(this.ControlEntidades);
    }else if (paramTipo == "Producto") {
      this.CodProducto=param.option.value;
      this.ProductosSelect=param.option.viewValue
      this.ControlProductos.setValue(param.option.viewValue);
      console.log(this.CodProducto);
    }else if (paramTipo == "Despachador") {
      this.DespachadorSelect=param.option.viewValue
      this.ControlDespachador.setValue(param.option.viewValue);
    }else if (paramTipo == "AgenciaAduana") {
      var VCodigoAgenciaAduana = param.option.value.toString().split(",");
      var CodEnti = VCodigoAgenciaAduana[0].toString();

      this.CodigoAgenciaAduanaSelect=CodEnti;
      this.AgenciaAduanaSelect=param.option.viewValue
      this.ControlAgenciaAduana.setValue(param.option.viewValue);
    }
  }


  
}
