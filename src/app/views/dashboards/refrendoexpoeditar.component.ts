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
import { GenerarRefrendoExpoActualizarRQT,GenerarDetalleRefrendoExpoActualizarRQT,GenerarArchivoRefrendoExpoActualizarRQT,GenerarRefrendoExpoActualizarRPT,ConsultaIDDataBookingRefrendoExpoRPT,ConsultaIDDetalleBookingRefrendoExpoRPT,ConsultaIDArchivoBookingRefrendoExpoRPT,ConsultaIDBookingRefrendoExpoRPT,ConsultaIDBookingRefrendoExpoRQT,ListaRegimenRefrendoExpo,Productos,Producto,Despachador,Despachadores,AgenciaAduana, AgenciaAduanera,ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo, GenerarRefrendoExpoRQT, GenerarRefrendoExpoRPT, GenerarDetalleRefrendoExpoRQT,GenerarArchivoRefrendoExpoRQT } from '../../models/RefrendoExpo';
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
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'refrendoexpoeditar',
  templateUrl: 'refrendoexpoeditar.template.html',
  styleUrls: ['refrendoexpoeditar.component.css']
})

export class RefrendoExpoEditarComponent implements OnInit {
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
  Editar: boolean;
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
  public objGenerarRefrendoExpoActualizarRQT: GenerarRefrendoExpoActualizarRQT;
  public objGenerarRefrendoExpoActualizarRPT: GenerarRefrendoExpoActualizarRPT;
  public objGenerarDetalleRefrendoExpoRQT: GenerarDetalleRefrendoExpoRQT;
  public objGenerarArchivoRefrendoExpoRQT: GenerarArchivoRefrendoExpoRQT;
  public objGenerarDetalleRefrendoExpoActualizarRQT: GenerarDetalleRefrendoExpoActualizarRQT;
  public objGenerarArchivoRefrendoExpoActualizarRQT: GenerarArchivoRefrendoExpoActualizarRQT;

  public objConsultaIDBookingRefrendoExpoRQT: ConsultaIDBookingRefrendoExpoRQT;
  public objConsultaIDBookingRefrendoExpoRPT: ConsultaIDBookingRefrendoExpoRPT;

  public objConsultaIDDataBookingRefrendoExpoRPT: ConsultaIDDataBookingRefrendoExpoRPT;
  public objConsultaIDDetalleBookingRefrendoExpoRPT: ConsultaIDDetalleBookingRefrendoExpoRPT;
  public objConsultaIDArchivoBookingRefrendoExpoRPT: ConsultaIDArchivoBookingRefrendoExpoRPT; 
  

  public AnioSelect: string;
  ControlAnio = new FormControl();
  public RegimenSelect: string;
  ControlRegimen = new FormControl();
  public ModalidadSelect: string;
  public ListaModalidad: Array<ListaModalidadRefrendoExpo>;
  public ListaRegimen: Array<ListaRegimenRefrendoExpo>;

  public paramCodigo: string;
  public loading: boolean;

  //public Datas: Array<ConsultaDetalleBookingRefrendoExpoRPT>;
  setearFechasLimite() {
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<RefrendoExpoEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,private _sanitizer: DomSanitizer) {
/*     this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data); */
    
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
    this.paramCodigo=localStorage.getItem("paramCodigo")
    
    this.loading=false;

    if (localStorage.getItem("paramAccion")=="Editar"){
      this.Editar=true;
      console.log("Editar: " + this.Editar);
    }else{
      this.Editar=false;
      console.log("No Editar: " + this.Editar);
      }


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
  public getSantizeUrl(url : string) {
    //console.log(this._sanitizer.bypassSecurityTrustUrl(url));
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
  public BuscarBooking(form: NgForm) {
    this.objConsultaBookingRefrendoExpoRQT = {
      IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Booking: form.value.txtbox_NBooking,
      Modalidad: this.ModalidadSelect,
      Llenado: true
    } 
    console.log(this.objConsultaBookingRefrendoExpoRQT);

    var fechita = new Date;
    var anioActual = (fechita.getFullYear() - 1);
    var anioFinal= anioActual + 6;
    

    for (let i = Number.parseInt(anioActual.toString()); i < Number.parseInt(anioFinal.toString()); i++) {
      //console.log ("AÑO - " + i);
      this.ListaAnio.push({ 'Anio': i, 'Descripcion': i });
    }
    console.log ("Lista Anio" + JSON.stringify(this.ListaAnio));

    if(this.ValidarInputCabecera(this.objConsultaBookingRefrendoExpoRQT))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }
    
    let res = this.reportService.ConsultaBookingRefrendoExpo(this.objConsultaBookingRefrendoExpoRQT);
    res.subscribe(
      data => {
        var resp: ConsultaBookingRefrendoExpoRPT;
        resp = data;
        console.log("CONSULTA BOOKING" + JSON.stringify(data));
        if (data.Cod == 1) {
          swal({
            text: data.Msj.toString(),
            icon: "warning",
          });

        } else {
          let DetalleDatos = [];
          this.Codigo = resp.Codigo;
          this.Exportador = resp.Exportador;
          this.Despachador = localStorage.getItem("NombreUsuario").toString();
          this.AgenciaDeAduana = localStorage.getItem("EntiNombre").toString();
          this.NroDeOrden = "";
          this.NroDeDAM = "";
          this.FechaDeNum = new Date();
          this.Mercaderia = resp.Mercaderia;
          this.FechaCutOff = resp.FechaCutOff;
          this.CodProducto = resp.CodProducto;
          this.Producto = resp.Producto;
          this.MandatoElectronico= false;
          this.FOB= "";
          this.Viaje= resp.Viaje;
          this.Aduana= "118";
          this.Regimen="";
          this.AnioSelect= (anioActual + 1 ).toString();

          this.EntidadesSelect=resp.Exportador;
          this.ControlEntidades.setValue(resp.Exportador);

          this.ProductosSelect=resp.Producto;
          this.ControlProductos.setValue(resp.Producto);
/*           this.ControlDespachador.setValue("");
          this.ControlAgenciaAduana.setValue(""); */

          for (var clave in data.Datos) {
            this.CantidadBultos = this.CantidadBultos + data.Datos[clave].Bultos;
            this.CantidadPeso = this.CantidadPeso + data.Datos[clave].Peso;
            DetalleDatos.push({ 'CodContenedor': data.Datos[clave].CodContenedor, 'Contenedor': data.Datos[clave].Contenedor, 'Capacidad': data.Datos[clave].Capacidad, 'TipoCont': data.Datos[clave].TipoCont, 'Bultos': data.Datos[clave].Bultos, 'Peso': data.Datos[clave].Peso, 'Ticket': data.Datos[clave].Ticket, 'Precinto': data.Datos[clave].Precinto });
          }
          this.Datos = DetalleDatos;
          console.log("CONSULTA DETALLE BOOKING " + this.Datos);

          this.muestra_oculta('DAM');
          this.muestra_oculta("CONTENEDORES");

          this.SiCargoData = true;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            console.log("ENTREEEEEE");
            this.dtTrigger.next(this.Datos);
          });
        }
      },
      error => {
        swal({
          text: "Error al cargar los datos",
          icon: "error",
        });
        console.log("Error : ", error);
      });
  }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnInit(): any {
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }
    this.loading = true;
    this.reportService.ConsultaRegimenRefrendoExpo().subscribe(data => this.ListaRegimen = data.Data);

    this.filteredEntidad = this.ControlEntidades.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEntidades(value))
    );

    this.ListaEntidades = new Array
    this.reportService.getListaEntidades().subscribe(
      data => {
        this.LEntidades = data;
        if (this.LEntidades.Data != null)
        {                              
          //console.log(JSON.parse(JSON.stringify(this.LEntidades.Data)));
          let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
          for (var i = 0; i <= listaent.length-1; i++) {
            let last = listaent[i];            
            this.ListaEntidades.push(last);
          }
        //console.log(JSON.stringify(this.ListaEntidades));
        }
        else{
          this.onIsError();   
        }
      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );

      this.filteredProducto = this.ControlProductos.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProductos(value))
      );
      //console.log("Entrando PRODUCTOS" + JSON.stringify(this.ControlProductos));
      this.ListaProductos = new Array
      this.reportService.getListaProductos().subscribe(
        data => {
          this.LProductos = data;
          //console.log("PRODUCTOS" + JSON.stringify(data));
          if (this.LProductos.Data != null)
          {                              
            //console.log(JSON.parse(JSON.stringify(this.LProductos.Data)));
            let listaent =JSON.parse(JSON.stringify(this.LProductos.Data));              
            for (var i = 0; i <= listaent.length-1; i++) {
              let last = listaent[i];            
              this.ListaProductos.push(last);
            }
            //console.log(JSON.stringify(this.ListaProductos));
          }
          else{
            this.onIsError();   
          }
        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        ); 

    var fechita = new Date;
    var anioActual = (fechita.getFullYear() - 1);
    var anioFinal= anioActual + 6;
    

    for (let i = Number.parseInt(anioActual.toString()); i < Number.parseInt(anioFinal.toString()); i++) {
      //console.log ("AÑO - " + i);
      this.ListaAnio.push({ 'Anio': i, 'Descripcion': i });
    }
    console.log ("Lista Anio" + JSON.stringify(this.ListaAnio));

    this.objConsultaIDBookingRefrendoExpoRQT = {
      IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      ID: Number.parseInt(this.paramCodigo)
    } 
    console.log(JSON.stringify(this.objConsultaIDBookingRefrendoExpoRQT));

   
    let res = this.reportService.ConsultaIDBookingRefrendoExpo(this.objConsultaIDBookingRefrendoExpoRQT);
    res.subscribe(
      data => {
        var resp: ConsultaIDBookingRefrendoExpoRPT;
        resp = data;
        
        console.log("CONSULTA DATOS" + JSON.stringify(data));
        if (data.Cod == 1) {
          swal({
            text: data.Msj.toString(),
            icon: "warning",
          });

        } else {
          
          this.objConsultaIDDataBookingRefrendoExpoRPT= data.Data;
          this.objConsultaIDDetalleBookingRefrendoExpoRPT= data.Detalle;
          this.objConsultaIDArchivoBookingRefrendoExpoRPT= data.Archivo;
          this.FechaDeNum = new Date();
          //console.log( this.objConsultaIDDataBookingRefrendoExpoRPT[0].Exportador);
          //let DetalleDatos = [];
          this.Codigo = this.objConsultaIDDataBookingRefrendoExpoRPT[0].Codigo;
          this.Booking = this.objConsultaIDDataBookingRefrendoExpoRPT[0].Booking;
          this.Despachador = this.objConsultaIDDataBookingRefrendoExpoRPT[0].Despachador;
          this.AgenciaDeAduana = this.objConsultaIDDataBookingRefrendoExpoRPT[0].AgenciaAduana;
          this.NroDeOrden = this.objConsultaIDDataBookingRefrendoExpoRPT[0].NroOrden;
          this.NroDeDAM = this.objConsultaIDDataBookingRefrendoExpoRPT[0].DAM;
          this.FechaDeNum = this.objConsultaIDDataBookingRefrendoExpoRPT[0].FechaNumeracion;
          this.Mercaderia = this.objConsultaIDDataBookingRefrendoExpoRPT[0].Mercancia;
          this.ModalidadSelect = this.objConsultaIDDataBookingRefrendoExpoRPT[0].EmpaCodigo;
          this.FechaCutOff = this.objConsultaIDDataBookingRefrendoExpoRPT[0].FechaCutOff;
          this.CodProducto = this.objConsultaIDDataBookingRefrendoExpoRPT[0].CodProducto;
          this.Producto = this.objConsultaIDDataBookingRefrendoExpoRPT[0].Producto;
          this.MandatoElectronico= this.objConsultaIDDataBookingRefrendoExpoRPT[0].MandatoElectronico;
          this.FOB= this.objConsultaIDDataBookingRefrendoExpoRPT[0].FOB;
          this.Viaje= this.objConsultaIDDataBookingRefrendoExpoRPT[0].Viaje;
          this.Aduana= "118";

          this.AnioSelect=this.objConsultaIDDataBookingRefrendoExpoRPT[0].Anio;
          this.ControlAnio.setValue(this.objConsultaIDDataBookingRefrendoExpoRPT[0].Anio);

          this.RegimenSelect=this.objConsultaIDDataBookingRefrendoExpoRPT[0].Regimen.toString();
          this.ControlRegimen.setValue(this.objConsultaIDDataBookingRefrendoExpoRPT[0].Regimen.toString());


          this.EntidadesSelect=this.objConsultaIDDataBookingRefrendoExpoRPT[0].Exportador;
          this.ControlEntidades.setValue(this.objConsultaIDDataBookingRefrendoExpoRPT[0].Exportador);

          this.ProductosSelect=this.objConsultaIDDataBookingRefrendoExpoRPT[0].Producto;
          this.ControlProductos.setValue(this.objConsultaIDDataBookingRefrendoExpoRPT[0].Producto);

          for (var clave in data.Detalle) {
            this.CantidadBultos = this.CantidadBultos + data.Detalle[clave].Bultos;
            this.CantidadPeso = this.CantidadPeso + data.Detalle[clave].Pesos;
            //DetalleDatos.push({ 'CodContenedor': data.Datos[clave].CodContenedor, 'Contenedor': data.Datos[clave].Contenedor, 'Capacidad': data.Datos[clave].Capacidad, 'TipoCont': data.Datos[clave].TipoCont, 'Bultos': data.Datos[clave].Bultos, 'Peso': data.Datos[clave].Peso, 'Ticket': data.Datos[clave].Ticket, 'Precinto': data.Datos[clave].Precinto });
          }

          for (var clave in data.Archivo) {
            var TipoArchivoCarga= "";
            var FormatoArchivo="";
            var TFile=data.Archivo[clave].NombreArchivo.split(".");
            var TipoArchivo = TFile[1];

            if ((TipoArchivo.toLowerCase() == "jpg") || (TipoArchivo.toLowerCase() == "jpeg") || (TipoArchivo.toLowerCase() == "png")) {
              //FormatoArchivo="data:image/"+ TipoArchivo.toLowerCase() +";base64,";
            }
            if (TipoArchivo.toLowerCase() == "pdf"){
              //FormatoArchivo="data:application/pdf;base64,";
            }
            

            
            if (data.Archivo[clave].RefrendoTipoArcCod==1){
              TipoArchivoCarga="DAM";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==2){
              TipoArchivoCarga="GUIAREMISION";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==3){
              TipoArchivoCarga="TARJADELLENADO";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==4){
              TipoArchivoCarga="TICKETDEPESO";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==5){
              TipoArchivoCarga="BOOKING";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==6){
              TipoArchivoCarga="OTROS";
            }else if (data.Archivo[clave].RefrendoTipoArcCod==7){
              TipoArchivoCarga="REPORTDECARGASUELTA";
            }
              
             this.LeerArchivos(data.Archivo[clave].NombreArchivo,FormatoArchivo + data.Archivo[clave].Archivo,data.Archivo[clave].RefrendoTipoArcCod,TipoArchivoCarga);
          
          }


/*
          this.Datos = DetalleDatos;
          console.log("CONSULTA DETALLE BOOKING " + this.Datos);*/

          //this.muestra_oculta('DAM');
          //this.muestra_oculta("CONTENEDORES");

          this.SiCargoData = true;
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            console.log("ENTREEEEEE");
            this.dtTrigger.next(this.objConsultaIDDetalleBookingRefrendoExpoRPT);
          }); 
        }
      },
      error => {
        this.loading = false;
        swal({
          text: "Error al cargar los datos",
          icon: "error",
        });
        console.log("Error : ", error);
      }); 

     
/*     this.muestra_oculta("DAM");
    this.muestra_oculta("CONTENEDORES");
    this.muestra_oculta("DOCUMENTOS");

*/
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  changeListener($event, TipoArchivoCarga: string): void {
    this.readThis($event.target, TipoArchivoCarga);
  }
  readThis(inputValue: any,TipoArchivoCarga: string): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    this.filename_DAM="";
    this.filename_GUIAREMISION="";
    this.filename_TARJADELLENADO = "";
    this.filename_TICKETDEPESO = "";
    this.filename_BOOKING = "";
    this.filename_OTROS = "";
    this.filename_REPORTDECARGASUELTA = "";

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "").replace("data:application/pdf;base64,", "").replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", "");
      this.reqBase64.Base64 = newstr;
      this.fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let index: number = 0;

      if (TipoArchivoCarga=='DAM'){
        if (this.fileitems_DAM.length >= 1) { index = this.fileitems_DAM.length; }
        else { index = 0; }
        this.fileitem_DAM = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_DAM = file.name;
        //console.log(this.fileitem_DAM);
      }else if (TipoArchivoCarga=='GUIAREMISION'){
        if (this.fileitems_GUIAREMISION.length >= 1) { index = this.fileitems_GUIAREMISION.length; }
        else { index = 0; }
        this.fileitem_GUIAREMISION = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_GUIAREMISION = file.name;
      }else if (TipoArchivoCarga=='TARJADELLENADO'){
        if (this.fileitems_TARJADELLENADO.length >= 1) { index = this.fileitems_TARJADELLENADO.length; }
        else { index = 0; }
        this.fileitem_TARJADELLENADO = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_TARJADELLENADO = file.name;
      }else if (TipoArchivoCarga=='TICKETDEPESO'){
        if (this.fileitems_TICKETDEPESO.length >= 1) { index = this.fileitems_TICKETDEPESO.length; }
        else { index = 0; }
        this.fileitem_TICKETDEPESO = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_TICKETDEPESO = file.name;
      }else if (TipoArchivoCarga=='BOOKING'){
        if (this.fileitems_BOOKING.length >= 1) { index = this.fileitems_BOOKING.length; }
        else { index = 0; }
        this.fileitem_BOOKING = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_BOOKING = file.name;
      }else if (TipoArchivoCarga=='OTROS'){
        if (this.fileitems_OTROS.length >= 1) { index = this.fileitems_OTROS.length; }
        else { index = 0; }
        this.fileitem_OTROS = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_OTROS = file.name;
      }else if (TipoArchivoCarga=='REPORTDECARGASUELTA'){
        if (this.fileitems_REPORTDECARGASUELTA.length >= 1) { index = this.fileitems_REPORTDECARGASUELTA.length; }
        else { index = 0; }
        this.fileitem_REPORTDECARGASUELTA = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_REPORTDECARGASUELTA = file.name;
      }

      this.fname1 = file.name;
    }

    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      if (TipoArchivoCarga=='DAM'){
        this.fileitem_DAM = null;
        this.fileitem = null;
        let filname1 = this.filename_DAM;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_DAM.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_DAM = this.TotalMB_DAM - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_DAM;
            //if (this.TotalMB_DAM < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_DAM);
          this.fileitems.splice(pos, 1);
          this.fileitems_DAM.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='GUIAREMISION'){
        this.fileitem_GUIAREMISION = null;
        this.fileitem = null;
        let filname1 = this.filename_GUIAREMISION;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_GUIAREMISION.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_GUIAREMISION = this.TotalMB_GUIAREMISION - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_GUIAREMISION;
            //if (this.TotalMB_GUIAREMISION < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_GUIAREMISION);
          this.fileitems.splice(pos, 1);
          this.fileitems_GUIAREMISION.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='TARJADELLENADO'){
        this.fileitem_TARJADELLENADO = null;
        this.fileitem = null;
        let filname1 = this.filename_TARJADELLENADO;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_TARJADELLENADO.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_TARJADELLENADO = this.TotalMB_TARJADELLENADO - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_TARJADELLENADO;
            //if (this.TotalMB_TARJADELLENADO < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_TARJADELLENADO);
          this.fileitems.splice(pos, 1);
          this.fileitems_TARJADELLENADO.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='TICKETDEPESO'){
        this.fileitem_TICKETDEPESO = null;
        this.fileitem = null;
        let filname1 = this.filename_TICKETDEPESO;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_TICKETDEPESO.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_TICKETDEPESO = this.TotalMB_TICKETDEPESO - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_TICKETDEPESO;
            //if (this.TotalMB_TICKETDEPESO < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_TICKETDEPESO);
          this.fileitems.splice(pos, 1);
          this.fileitems_TICKETDEPESO.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='BOOKING'){
        this.fileitem_BOOKING = null;
        this.fileitem = null;
        let filname1 = this.filename_BOOKING;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_BOOKING.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_BOOKING = this.TotalMB_BOOKING - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_BOOKING;
            //if (this.TotalMB_BOOKING < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_BOOKING);
          this.fileitems.splice(pos, 1);
          this.fileitems_BOOKING.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='OTROS'){
        this.fileitem_OTROS = null;
        this.fileitem = null;
        let filname1 = this.filename_OTROS;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_OTROS.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_OTROS = this.TotalMB_OTROS - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_OTROS;
            //if (this.TotalMB_OTROS < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_OTROS);
          this.fileitems.splice(pos, 1);
          this.fileitems_OTROS.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }else if (TipoArchivoCarga=='REPORTDECARGASUELTA'){
        this.fileitem_REPORTDECARGASUELTA = null;
        this.fileitem = null;
        let filname1 = this.filename_REPORTDECARGASUELTA;
        let fnam1 = this.fname1;
        if (filname1 != "") {
          var fitemz = this.fileitems_REPORTDECARGASUELTA.filter(function (f) {
            return f.name == fnam1;
          });
  
          if (fitemz.length == 1) {
            let fitemf = fitemz[0];
            this.TotalMB_REPORTDECARGASUELTA = this.TotalMB_REPORTDECARGASUELTA - ((fitemf.size / 1024) / 1024);
            let totalmbb = this.TotalMB_REPORTDECARGASUELTA;
            //if (this.TotalMB_REPORTDECARGASUELTA < 5) { this.EsMayor5 = false }
          }
          var pos = this.fileitems.map(function (e) {
            return e.NombreArc;
          }).indexOf(this.filename_REPORTDECARGASUELTA);
          this.fileitems.splice(pos, 1);
          this.fileitems_REPORTDECARGASUELTA.splice(pos, 1);
          let leng = this.fileitems.length;
          console.log(pos.toString());
        }
      }


    }
  }

  LeerArchivos(pNombreArchivo:string,pArchivo:any, pRefrendoTipoArcCod:number,TipoArchivoCarga:string ){
    if (TipoArchivoCarga=='DAM'){
      this.fileitem_DAM = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_DAM = pNombreArchivo;
      this.fileitems_DAM.push(this.fileitem_DAM);
      //console.log(this.fileitem_DAM);
    }else if (TipoArchivoCarga=='GUIAREMISION'){
      this.fileitem_GUIAREMISION = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_GUIAREMISION = pNombreArchivo;
      this.fileitems_GUIAREMISION.push(this.fileitem_GUIAREMISION);
      //console.log(this.fileitem_GUIAREMISION);
    }else if (TipoArchivoCarga=='TARJADELLENADO'){
        this.fileitem_TARJADELLENADO = new FileItem(pNombreArchivo, 0, pArchivo, 0);
        this.filename_TARJADELLENADO = pNombreArchivo;
        this.fileitems_TARJADELLENADO.push(this.fileitem_TARJADELLENADO);
        //console.log(this.fileitem_TARJADELLENADO);
    }else if (TipoArchivoCarga=='TICKETDEPESO'){
      this.fileitem_TICKETDEPESO = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_TICKETDEPESO = pNombreArchivo;
      this.fileitems_TICKETDEPESO.push(this.fileitem_TICKETDEPESO);
      //console.log(this.fileitem_TICKETDEPESO);
    }else if (TipoArchivoCarga=='TICKETDEPESO'){
      this.fileitem_TICKETDEPESO = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_TICKETDEPESO = pNombreArchivo;
      this.fileitems_TICKETDEPESO.push(this.fileitem_TICKETDEPESO);
      //console.log(this.fileitem_TICKETDEPESO);
    }else if (TipoArchivoCarga=='BOOKING'){
      this.fileitem_BOOKING = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_BOOKING = pNombreArchivo;
      this.fileitems_BOOKING.push(this.fileitem_BOOKING);
      //console.log(this.fileitem_BOOKING);
    }else if (TipoArchivoCarga=='REPORTDECARGASUELTA'){
      this.fileitem_REPORTDECARGASUELTA = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_REPORTDECARGASUELTA = pNombreArchivo;
      this.fileitems_REPORTDECARGASUELTA.push(this.fileitem_REPORTDECARGASUELTA);
      //console.log(this.fileitem_REPORTDECARGASUELTA);
    }else if (TipoArchivoCarga=='OTROS'){
      this.fileitem_OTROS = new FileItem(pNombreArchivo, 0, pArchivo, 0);
      this.filename_OTROS = pNombreArchivo;
      this.fileitems_OTROS.push(this.fileitem_OTROS);
      //console.log(this.fileitem_OTROS);
    }
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  AgregarArchivo(nombarc: string, TipoArchivoCarga: string) {
    this.cerrado = true;
    if (nombarc != "") {
      var res = nombarc.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        if ((tipoarchivo.toLowerCase() == "jpg") || (tipoarchivo.toLowerCase() == "jpeg") || (tipoarchivo.toLowerCase() == "pdf") || (tipoarchivo.toLowerCase() == "png")) {
          if (TipoArchivoCarga == "DAM") {
            for (var i = 0; i <= this.fileitems_DAM.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          } else if (TipoArchivoCarga == "GUIAREMISION") {
            for (var i = 0; i <= this.fileitems_GUIAREMISION.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          } else if (TipoArchivoCarga == "TARJADELLENADO") {
            for (var i = 0; i <= this.fileitems_TARJADELLENADO.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          } else if (TipoArchivoCarga == "TICKETDEPESO") {
            for (var i = 0; i <= this.fileitems_TICKETDEPESO.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          }else if (TipoArchivoCarga == "BOOKING") {
            for (var i = 0; i <= this.fileitems_BOOKING.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          }else if (TipoArchivoCarga == "REPORTDECARGASUELTA") {
            for (var i = 0; i <= this.fileitems_REPORTDECARGASUELTA.length - 1; i++) {
              swal({
                text: "Solamente puede adjuntar un archivo",
                icon: "warning",
              });
              return;
            }
          }else if (TipoArchivoCarga == "OTROS") {
            for (var i = 0; i <= this.fileitems_OTROS.length - 1; i++) {
              if (this.fileitems_OTROS[i].name == nombarc) {
                {
                  swal({
                    text: "El archivo ya se encuentra en el listado",
                    icon: "warning",
                  });
                  return;
                }
              }
            }
          }



          //this.TotalMB = 0;
          this.TotalMB_DAM = 0;
          this.TotalMB_GUIAREMISION = 0;
          this.TotalMB_TARJADELLENADO = 0;
          this.TotalMB_TICKETDEPESO = 0;
          this.TotalMB_BOOKING = 0;
          this.TotalMB_BOOKING = 0;
          this.TotalMB_REPORTDECARGASUELTA = 0;

          if (this.fileitem != null) {
            this.fileitems.push(this.fileitem);
          }
          if (TipoArchivoCarga == "DAM") {
            if (this.fileitem_DAM != null) {
              this.fileitems_DAM.push(this.fileitem_DAM);
               console.log(this.fileitem_DAM);
               console.log(this.fileitems_DAM);
            }
            for (var i = 0; i <= this.fileitems_DAM.length - 1; i++) {
              this.TotalMB_DAM = this.TotalMB_DAM + ((this.fileitems_DAM[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "GUIAREMISION") {
            if (this.fileitem_GUIAREMISION != null) {
              this.fileitems_GUIAREMISION.push(this.fileitem_GUIAREMISION);
            }
            for (var i = 0; i <= this.fileitems_GUIAREMISION.length - 1; i++) {
              this.TotalMB_GUIAREMISION = this.TotalMB_GUIAREMISION + ((this.fileitems_GUIAREMISION[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "TARJADELLENADO") {
            if (this.fileitem_TARJADELLENADO != null) {
              this.fileitems_TARJADELLENADO.push(this.fileitem_TARJADELLENADO);
            }
            for (var i = 0; i <= this.fileitems_TARJADELLENADO.length - 1; i++) {
              this.TotalMB_TARJADELLENADO = this.TotalMB_TARJADELLENADO + ((this.fileitems_TARJADELLENADO[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "TICKETDEPESO") {
            if (this.fileitem_TICKETDEPESO != null) {
              this.fileitems_TICKETDEPESO.push(this.fileitem_TICKETDEPESO);
            }
            for (var i = 0; i <= this.fileitems_TICKETDEPESO.length - 1; i++) {
              this.TotalMB_TICKETDEPESO = this.TotalMB_TICKETDEPESO + ((this.fileitems_TICKETDEPESO[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "BOOKING") {
            if (this.fileitem_BOOKING != null) {
              this.fileitems_BOOKING.push(this.fileitem_BOOKING);
            }
            for (var i = 0; i <= this.fileitems_BOOKING.length - 1; i++) {
              this.TotalMB_BOOKING = this.TotalMB_BOOKING + ((this.fileitems_BOOKING[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "REPORTDECARGASUELTA") {
            if (this.fileitem_REPORTDECARGASUELTA!= null) {
              this.fileitems_REPORTDECARGASUELTA.push(this.fileitem_REPORTDECARGASUELTA);
            }
            for (var i = 0; i <= this.fileitems_REPORTDECARGASUELTA.length - 1; i++) {
              this.TotalMB_REPORTDECARGASUELTA= this.TotalMB_REPORTDECARGASUELTA + ((this.fileitems_REPORTDECARGASUELTA[i].size / 1024) / 1024);
            }
          } else if (TipoArchivoCarga == "OTROS") {
            if (this.fileitem_OTROS != null) {
              this.fileitems_OTROS.push(this.fileitem_OTROS);
            }
            for (var i = 0; i <= this.fileitems_OTROS.length - 1; i++) {
              this.TotalMB_OTROS = this.TotalMB_OTROS + ((this.fileitems_OTROS[i].size / 1024) / 1024);
            }
          }

          //if (this.TotalMB > 5) { this.EsMayor5 = true }
        }
        else {
          swal({
            text: "El archivo debe ser del tipo pdf, jpg, png",
            icon: "warning",
          });
          return;
        }
      }
    }
  }

  EliminarSelect(TipoArchivoCarga: string) {
    this.cerrado = true;
    //this.TotalMB = 0;
    this.TotalMB_DAM = 0;
    this.TotalMB_GUIAREMISION = 0;
    this.TotalMB_TARJADELLENADO = 0;
    this.TotalMB_TICKETDEPESO = 0;
    this.TotalMB_BOOKING = 0;
    this.TotalMB_OTROS = 0;
    this.TotalMB_REPORTDECARGASUELTA = 0;

    if (TipoArchivoCarga == 'DAM') {
      for (var i = 0; i <= this.selectedOptions_DAM.length - 1; i++) {
        var pos = this.fileitems_DAM.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_DAM[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_DAM.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_DAM.length - 1; i++) {
        let pos = this.selectedOptions_DAM[i];
        this.fileitems_DAM[i].index = i;
      }

      if (this.fileitems_DAM.length == 0) { this.TotalMB_DAM = 0; }
      for (var i = 0; i <= this.fileitems_DAM.length - 1; i++) {
        this.TotalMB_DAM = this.TotalMB_DAM + ((this.fileitems_DAM[i].size / 1024) / 1024);
        //if (this.TotalMB_DAM < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'GUIAREMISION') {
      for (var i = 0; i <= this.selectedOptions_GUIAREMISION.length - 1; i++) {
        var pos = this.fileitems_GUIAREMISION.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_GUIAREMISION[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_GUIAREMISION.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_GUIAREMISION.length - 1; i++) {
        let pos = this.selectedOptions_GUIAREMISION[i];
        this.fileitems_GUIAREMISION[i].index = i;
      }

      if (this.fileitems_GUIAREMISION.length == 0) { this.TotalMB_GUIAREMISION = 0; }
      for (var i = 0; i <= this.fileitems_GUIAREMISION.length - 1; i++) {
        this.TotalMB_GUIAREMISION = this.TotalMB_GUIAREMISION + ((this.fileitems_GUIAREMISION[i].size / 1024) / 1024);
        //if (this.TotalMB_GUIAREMISION < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'TARJADELLENADO') {
      for (var i = 0; i <= this.selectedOptions_TARJADELLENADO.length - 1; i++) {
        var pos = this.fileitems_TARJADELLENADO.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_TARJADELLENADO[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_TARJADELLENADO.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_TARJADELLENADO.length - 1; i++) {
        let pos = this.selectedOptions_TARJADELLENADO[i];
        this.fileitems_TARJADELLENADO[i].index = i;
      }

      if (this.fileitems_TARJADELLENADO.length == 0) { this.TotalMB_TARJADELLENADO = 0; }
      for (var i = 0; i <= this.fileitems_TARJADELLENADO.length - 1; i++) {
        this.TotalMB_TARJADELLENADO = this.TotalMB_TARJADELLENADO + ((this.fileitems_TARJADELLENADO[i].size / 1024) / 1024);
        //if (this.TotalMB_TARJADELLENADO < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'TICKETDEPESO') {
      for (var i = 0; i <= this.selectedOptions_TICKETDEPESO.length - 1; i++) {
        var pos = this.fileitems_TICKETDEPESO.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_TICKETDEPESO[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_TICKETDEPESO.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_TICKETDEPESO.length - 1; i++) {
        let pos = this.selectedOptions_TICKETDEPESO[i];
        this.fileitems_TICKETDEPESO[i].index = i;
      }

      if (this.fileitems_TICKETDEPESO.length == 0) { this.TotalMB_TICKETDEPESO = 0; }
      for (var i = 0; i <= this.fileitems_TICKETDEPESO.length - 1; i++) {
        this.TotalMB_TICKETDEPESO = this.TotalMB_TICKETDEPESO + ((this.fileitems_TICKETDEPESO[i].size / 1024) / 1024);
        //if (this.TotalMB_TICKETDEPESO < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'BOOKING') {
      for (var i = 0; i <= this.selectedOptions_BOOKING.length - 1; i++) {
        var pos = this.fileitems_BOOKING.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_BOOKING[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_BOOKING.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_BOOKING.length - 1; i++) {
        let pos = this.selectedOptions_BOOKING[i];
        this.fileitems_BOOKING[i].index = i;
      }

      if (this.fileitems_BOOKING.length == 0) { this.TotalMB_BOOKING = 0; }
      for (var i = 0; i <= this.fileitems_BOOKING.length - 1; i++) {
        this.TotalMB_BOOKING = this.TotalMB_BOOKING + ((this.fileitems_BOOKING[i].size / 1024) / 1024);
        //if (this.TotalMB_BOOKING < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'OTROS') {
      for (var i = 0; i <= this.selectedOptions_OTROS.length - 1; i++) {
        var pos = this.fileitems_OTROS.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_OTROS[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_OTROS.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_OTROS.length - 1; i++) {
        let pos = this.selectedOptions_OTROS[i];
        this.fileitems_OTROS[i].index = i;
      }

      if (this.fileitems_OTROS.length == 0) { this.TotalMB_OTROS = 0; }
      for (var i = 0; i <= this.fileitems_OTROS.length - 1; i++) {
        this.TotalMB_OTROS = this.TotalMB_OTROS + ((this.fileitems_OTROS[i].size / 1024) / 1024);
        //if (this.TotalMB_OTROS < 5) { this.EsMayor5 = false }
      }
    }else if (TipoArchivoCarga == 'REPORTDECARGASUELTA') {
      for (var i = 0; i <= this.selectedOptions_REPORTDECARGASUELTA.length - 1; i++) {
        var pos = this.fileitems_REPORTDECARGASUELTA.map(function (e) {
          return e.name;
        }).indexOf(this.selectedOptions_REPORTDECARGASUELTA[i].toString());
        this.fileitems.splice(pos, 1);
        this.fileitems_REPORTDECARGASUELTA.splice(pos, 1);
      }
      for (var i = 0; i <= this.fileitems_REPORTDECARGASUELTA.length - 1; i++) {
        let pos = this.selectedOptions_REPORTDECARGASUELTA[i];
        this.fileitems_REPORTDECARGASUELTA[i].index = i;
      }

      if (this.fileitems_REPORTDECARGASUELTA.length == 0) { this.TotalMB_REPORTDECARGASUELTA = 0; }
      for (var i = 0; i <= this.fileitems_REPORTDECARGASUELTA.length - 1; i++) {
        this.TotalMB_REPORTDECARGASUELTA = this.TotalMB_REPORTDECARGASUELTA + ((this.fileitems_REPORTDECARGASUELTA[i].size / 1024) / 1024);
        //if (this.TotalMB_OTROS < 5) { this.EsMayor5 = false }
      }
    }



  }

  registrarBase64(carpeta: string): void {
    for (var i = 0; i <= this.fileitems.length - 1; i++) {
      let reqBas64 = this.fileitems[i];
      reqBas64.Carpeta = carpeta;
      if (i == this.fileitems.length - 1) {
        var ultarch = reqBas64.NombreArc + "." + reqBas64.TipoArc;
      }
      let oldstr = reqBas64.Base64;
      let ind = oldstr.indexOf(",");
      let repstr = oldstr.substr(0, ind + 1);
      var newstr = oldstr.toString().replace(repstr, "");
      reqBas64.Base64 = newstr;
      console.log(reqBas64.Carpeta);
      console.log(reqBas64.Base64);
      this.reportService
        .RegistrarBase64(reqBas64)
        .subscribe(
          data => {
            this.respBase64 = data;
            if (this.respBase64 != null) {
              if (data != null) {
                console.log("Archivo guardado correctamente");
                if (ultarch.toString() == data.toString()) {
                  this.ConvertirZip(carpeta);
                }
              }
              else {
                this.msjfinal = data.toString();
                swal({ text: this.msjfinal.toString() });
              }
            }
            else {
              localStorage.removeItem('StockTotal');
              this.onIsError();
            }
          },
          error => {
            this.onIsError();
            console.log("Error");
          }
        );
    }
    this.onClose();
  }
  ConvertirZip(carpeta: string): void {
    this.reqZip.Carpeta = carpeta;
    this.reportService
      .ConvertirZip(this.reqZip)
      .subscribe(
        data => {
          this.respZip = data;
          if (this.respZip != null) {
            if (data != null) {
              console.log("Carpeta Zipeada correctamente");
            }
            else {
              this.msjfinal = data.toString();
              swal({ text: this.msjfinal.toString() });
            }

          }
          else {
            localStorage.removeItem('StockTotal');
            this.onIsError();
          }
        },
        error => {
          this.onIsError();
          console.log("Error");
        }
      );
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

  private reqZip: ZipRQT = {
    Carpeta: ""
  };

  private respZip: ZipRPT = {
    Archivo: ""
  };

  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
  };

  private respBase64: Base64RPT = {
    Archivo: ""
  };

  onListControlChanged(list: any, TipoArchivoCarga: string) {
    if (TipoArchivoCarga == "DAM") {
      this.selectedOptions_DAM = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "GUIAREMISION") {
      this.selectedOptions_GUIAREMISION = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "TARJADELLENADO") {
      this.selectedOptions_TARJADELLENADO = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "TICKETDEPESO") {
      this.selectedOptions_TICKETDEPESO = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "BOOKING") {
      this.selectedOptions_BOOKING = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "OTROS") {
      this.selectedOptions_OTROS = list.selectedOptions.selected.map(item => item.value);
    } else if (TipoArchivoCarga == "REPORTDECARGASUELTA") {
      this.selectedOptions_REPORTDECARGASUELTA = list.selectedOptions.selected.map(item => item.value);
    }

  }


  public IniciarForm(form: NgForm) {
  }
  public ngOnDestroy(): any {
    this.dtTrigger.unsubscribe();
  }

  public AgregarRefrendo(form: NgForm) {
/*     var NBooking: string
    NBooking = form.value.txtbox_NBooking

    if (NBooking == undefined) {
      swal("Error: Ingresar Numero de Booking");
      //return false;
    } else { */
      let DetalleDatos = [];
      let DetalleArchivos = [];
      for (var clave in this.objConsultaIDDetalleBookingRefrendoExpoRPT) {
        DetalleDatos.push({ 'CodContenedor': this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].ContCargCodigo, 'Contenedor': this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].ContDesc, 'Bultos': Number.parseInt(this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].Bultos.toString()), 'Peso': Number.parseInt(this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].Pesos.toString()), 'PctoAduana': this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].PctoAduana, 'RefrendoCodDetalle': this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].RefrendoCodDetalle });
      }
      this.Datos = DetalleDatos;
      console.log("Detalle Booking Guardar " + this.Datos);
      //this.objGenerarRefrendoExpoActualizarRQT.FechaNum = new Date();
      for (var DAM in this.fileitems_DAM) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 1, 'Archivo': this.fileitems_DAM[DAM].base64, 'NombreArchivo': this.fileitems_DAM[DAM].name, 'RefrendoCodDetalle': this.fileitems_DAM[DAM].RefrendoCodDetalle});
      }
      for (var GUIAREMISION in this.fileitems_GUIAREMISION) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 2, 'Archivo': this.fileitems_GUIAREMISION[GUIAREMISION].base64, 'NombreArchivo': this.fileitems_GUIAREMISION[GUIAREMISION].name, 'RefrendoCodDetalle': this.fileitems_GUIAREMISION[GUIAREMISION].RefrendoCodDetalle });
      }
      for (var TARJADELLENADO in this.fileitems_TARJADELLENADO) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 3 , 'Archivo': this.fileitems_TARJADELLENADO[TARJADELLENADO].base64, 'NombreArchivo': this.fileitems_TARJADELLENADO[TARJADELLENADO].name, 'RefrendoCodDetalle': this.fileitems_TARJADELLENADO[TARJADELLENADO].RefrendoCodDetalle });
      }
      for (var TICKETDEPESO in this.fileitems_TICKETDEPESO) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 4, 'Archivo': this.fileitems_TICKETDEPESO[TICKETDEPESO].base64, 'NombreArchivo': this.fileitems_TICKETDEPESO[TICKETDEPESO].name, 'RefrendoCodDetalle': this.fileitems_TICKETDEPESO[TICKETDEPESO].RefrendoCodDetalle });
      }
      for (var BOOKING in this.fileitems_BOOKING) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 5, 'Archivo': this.fileitems_BOOKING[BOOKING].base64, 'NombreArchivo': this.fileitems_BOOKING[BOOKING].name, 'RefrendoCodDetalle': this.fileitems_BOOKING[BOOKING].RefrendoCodDetalle });
      }
      for (var OTROS in this.fileitems_OTROS) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 6, 'Archivo': this.fileitems_OTROS[OTROS].base64, 'NombreArchivo': this.fileitems_OTROS[OTROS].name, 'RefrendoCodDetalle': this.fileitems_OTROS[OTROS].RefrendoCodDetalle });
      }
      for (var REPORTDECARGASUELTA in this.fileitems_REPORTDECARGASUELTA) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 7, 'Archivo': this.fileitems_REPORTDECARGASUELTA[REPORTDECARGASUELTA].base64, 'NombreArchivo': this.fileitems_REPORTDECARGASUELTA[REPORTDECARGASUELTA].name, 'RefrendoCodDetalle': this.fileitems_REPORTDECARGASUELTA[REPORTDECARGASUELTA].RefrendoCodDetalle  });
      }

      console.log("Archivos Actualizar " + JSON.stringify(DetalleArchivos)); 


      this.objGenerarRefrendoExpoActualizarRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        BookLineCodigo: this.Codigo,
        BookLineNroDoc: this.Booking,
        DAM: form.value.txtbox_NroDeDAM,
        Exportador: this.EntidadesSelect,
        NumOrden: this.NroDeOrden, //form.value.txtbox_NroDeOrden,
        //Despachador: this.DespachadorSelect,
        Despachador: this.Despachador,
        EntiCodAgencia: localStorage.getItem("EntiCodigo").toString(),
        //AgenciaAduana: this.AgenciaAduanaSelect,
        AgenciaAduana: this.AgenciaDeAduana,
        FechaNum: this.FechaDeNum,//form.value.txtbox_FechaDeNum,
        Mercancia: this.Mercaderia,//form.value.txtbox_Mercaderia,
        EmpaCodigo: this.ModalidadSelect,
        Llenado: true,
        Aduana: this.Aduana,
        Anio: this.AnioSelect,
        Regimen: this.RegimenSelect,
        CodProducto: this.CodProducto,
        Producto: this.ProductosSelect,
        FechaCutOff: this.FechaCutOff,//form.value.txtbox_FechaCutOff,
        FOB: this.FOB,//form.value.txtbox_FOB,
        MandatoElectronico: this.MandatoElectronico,
        RefrendoCod: Number.parseInt(this.paramCodigo),
        Deta: DetalleDatos,
        ArchivoRefrendo: DetalleArchivos

        
      }

      console.log("Datos REFRENDON ACTUALIZAR " + JSON.stringify(this.objGenerarRefrendoExpoActualizarRQT));

      if (this.ValidarInput(this.objGenerarRefrendoExpoActualizarRQT)) {
        swal({
          text: "Error en los campos de ingreso, por favor verificar",
          icon: "warning",
        });
        return;
      }

      

      console.log("EMPEZAR A GUARDAR DATOS ACTUALIZAR")
      this.reportService.ActualizarRefrendoExpo(this.objGenerarRefrendoExpoActualizarRQT).subscribe(
        data => {
          this.objGenerarRefrendoExpoActualizarRPT = data;
          console.log("Mensaje : " + JSON.stringify(data));
          console.log("Ruta : " + data.Msj.toString());
          console.log("EMPEZAR A Imagenes")

          swal("Se Guardo Correctamente");
          this.cerrarPopup();
        },
        error => {
          swal("Error al crear Refrendo Expo");
          console.log("Error : ", error);
        });

    //}
  }

  public Recalcular() {
    this.CantidadBultos = 0;
    this.CantidadPeso = 0;
    for (var clave in this.objConsultaIDDetalleBookingRefrendoExpoRPT) {
      this.CantidadBultos = this.CantidadBultos + Number.parseInt(this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].Bultos.toString());
      this.CantidadPeso = this.CantidadPeso + + Number.parseInt(this.objConsultaIDDetalleBookingRefrendoExpoRPT[clave].Pesos.toString());
    }
  }

  public ValidarInputCabecera(param: ConsultaBookingRefrendoExpoRQT): boolean {

    if (this.NullEmpty(param.Modalidad)) {
      return true;
    }
    return false;
  }
  public ValidarInput(param: GenerarRefrendoExpoActualizarRQT): boolean {

    if (this.EntidadesSelect == "" || this.ControlEntidades.value.toString() == ""){
      return true;
    }
    if (this.ProductosSelect == "" || this.ControlProductos.value.toString() == ""){
      return true;
    }
/*     if (this.DespachadorSelect == "" || this.ControlDespachador.value.toString() == ""){
      return true;
    }
    if (this.AgenciaAduanaSelect == "" || this.ControlAgenciaAduana.value.toString() == ""){
      return true;
    } */

    /* if (this.NullEmpty(param.Exportador)) {
      return true;
    }*/

    if (this.NullEmpty(param.Despachador)) {
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
    }
/*     if (this.NullEmpty(param.Regimen)) {
      return true;
    } */
/*      var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarRefrendoExpoActualizarRQT.FechaNum = this.objGenerarRefrendoExpoActualizarRQT.FechaNum.toLocaleDateString("es-ES", options);
     console.log(this.objGenerarRefrendoExpoActualizarRQT.FechaNum); */
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
      console.log(this.ProductosSelect);
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

  private _filterEntidades(value: string): entidad[] {
    const filterValue = value.toLowerCase();
    //console.log(this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0 ));
    return this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0 );
  }
  private _filterProductos(value: string): Producto[] {
    const filterValue = value.toLowerCase();
    console.log(this.ListaProductos.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0 ));
    return this.ListaProductos.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  
  private _filterDespachador(value: string): Despachador[] {
    const filterValue = value.toLowerCase();
    return this.ListaDespachador.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterAgenciaAduana(value: string): AgenciaAduana[] {
    const filterValue = value.toLowerCase();
    return this.ListaAgenciaAduana.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
