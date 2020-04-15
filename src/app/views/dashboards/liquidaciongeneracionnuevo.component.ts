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
import { Despachador,Despachadores,AgenciaAduana, AgenciaAduanera,ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo, GenerarRefrendoExpoRQT, GenerarRefrendoExpoRPT, GenerarDetalleRefrendoExpoRQT,GenerarArchivoRefrendoExpoRQT } from '../../models/RefrendoExpo';
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
import Swal from 'sweetalert2';
import {SwAlertC} from 'app/models/swalert';
import { DatePipe } from '@angular/common';


import { LiquidacionCliente, LiquidacionBRQT,LiquidacionBRPT,LiquidacionCont, ValidaFacturarARPT, ValidaFacturarARQT,
ValidarTerceroRPT, ValidarTerceroRQT, MensajeRPT, MensajeRQT, VisLiquidacion,VisualizarLiqRPT, VisualizarLiqRQT,
RegLiquidacionRPT, RegLiquidacionRQT}  
from '../../models/Liquidacion';



@Component({
  selector: 'liquidaciongeneracionnuevo',
  templateUrl: 'liquidaciongeneracionnuevo.template.html',
  styleUrls: ['liquidaciongeneracionnuevo.component.css']
})

export class LiquidacionGeneracionNuevoComponent implements OnInit {
  filteredEntidad: Observable<entidad[]>;
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];
  ControlEntidades = new FormControl();
  myAgencia = new FormControl();
  myEmpresa = new FormControl();
  myButton = new FormControl();
  
  
  public EntidadesSelect:string = "";

  filteredDespachador: Observable<Despachador[]>;
  public LDespachador : Despachadores;
  public ListaDespachador : Array<Despachador> = [];
  ControlDespachador = new FormControl();
  public DespachadorSelect:string = "";
  public FechaSelec : string = "";

  filteredAgenciaAduana: Observable<AgenciaAduana[]>;
  public LAgenciaAduana : AgenciaAduanera;
  public ListaAgenciaAduana : Array<AgenciaAduana> = [];
  ControlAgenciaAduana = new FormControl();
  public AgenciaAduanaSelect:string = "";
  public CodigoAgenciaAduanaSelect:string = "";

  public MsjLiqCont : string = "";

  public objCitasVDev = [];
  
  public MsjLiqCont1 : string = "";
  public MsjLiqCont2 : string = "";

  public CodigoLiqui : number = 0;
  public SubTotal : number = 0;
  public Impuesto : number = 0;
  public Total : number = 0;
  public CodigoMoneda : string = "";
  

  public objLiquidacionBRPT: LiquidacionBRPT;
  public objLiquidacionBRQT: LiquidacionBRQT;
  public objListLiquiCont : Array<LiquidacionCont>;
  public objListLiquiCliente : Array<LiquidacionCliente>;

  
  public objRegLiquiRPT: RegLiquidacionRPT;
  public objRegLiquiRQT: RegLiquidacionRQT;

  
  public objVisLiquiRPT: VisualizarLiqRPT;
  public objVisLiquiRQT: VisualizarLiqRQT;
  
  /*public objListVisLiqui: Array<VisLiquidacion>;*/
  
  public objListVisLiqui = []; 
  
  public objLiquiMsjRQT: MensajeRQT;
  public objLiquiMsjRPT: MensajeRPT;

  
  public objLiquiMsj1RQT: MensajeRQT;
  public objLiquiMsj1RPT: MensajeRPT;

  
  public objValFactARQT: ValidaFacturarARQT;
  public objValFactARPT: ValidaFacturarARPT;
  public swAlertC : SwAlertC;
  
  
  public objValTercRPT: ValidarTerceroRPT;
  public objValTercRQT: ValidarTerceroRQT;

  public EntidadSelect : string;
  public NEntidadSelect : string;

  public EmpresaSelect : string;
  public NEmpresaSelect : string;
  public Cantidad : number = 0;



  
  filteredEmp: Observable<entidad[]>;
  filteredEmpresa: Observable<entidad[]>;

  
  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];

  
  public LEmpresasF : Entidades;
  public ListaEmpresasF : Array<entidad> = [];
  

  public SiCargoData = true;
  public TieneData = false;
  public MuestraPAP = false;
  public MuestraLiq = false;
  public buttondis = true;

  fechaActual: any;
  minDate: Date;
  maxDate: Date;
  Contnumero: string;
  UnidadNegocio :  string;
  TipoConsulta: string;
  TipoConsultaD: string;
  Documento: string;
  Contenedor : string;

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

  UniNegocio : string;
  MBL: string;
  NombreCompleto: string;
  TipoDoc : string;
  Empresa : string;

  CantidadBultos: number;
  CantidadPeso: number;

  public Datos: ConsultaDetalleBookingRefrendoExpoRPT[];

  public objConsultaBookingRefrendoExpoRQT: ConsultaBookingRefrendoExpoRQT;
  public objConsultaBookingRefrendoExpoRPT: ConsultaBookingRefrendoExpoRPT;
  public objGenerarRefrendoExpoRQT: GenerarRefrendoExpoRQT;
  public objGenerarRefrendoExpoRPT: GenerarRefrendoExpoRPT;
  public objGenerarDetalleRefrendoExpoRQT: GenerarDetalleRefrendoExpoRQT;
  public objGenerarArchivoRefrendoExpoRQT: GenerarArchivoRefrendoExpoRQT;


  public ModalidadSelect: string;
  public ListaModalidad: Array<ListaModalidadRefrendoExpo>;

  //public Datas: Array<ConsultaDetalleBookingRefrendoExpoRPT>;
  setearFechasLimite() {
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<LiquidacionGeneracionNuevoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
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

    this.Despachador = emptyString;
    this.AgenciaDeAduana = emptyString;
    this.NroDeOrden = emptyString;
    this.NroDeDAM = emptyString;
    this.FechaDeNum = emptyString;
    this.CantidadBultos = 0;
    this.CantidadPeso = 0;
  }

  
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>

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

  
  dtTriggerCliente: Subject<any> = new Subject();
  dtOptionsCliente: any = {
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

  
  dtTriggerLiq: Subject<any> = new Subject();
  dtOptionsLiq: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    retrieve : true,
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


  public BuscarBooking(form: NgForm) {
    this.objConsultaBookingRefrendoExpoRQT = {
      IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Booking: form.value.txtbox_NBooking,
      Modalidad: this.ModalidadSelect,
      Llenado: true
    } 
    console.log(this.objConsultaBookingRefrendoExpoRQT);

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
          swal(data.Msj.toString());
        } else {
          let DetalleDatos = [];
          this.Codigo = resp.Codigo;
          this.Exportador = resp.Exportador;
          this.Despachador = "";
          this.AgenciaDeAduana = "";
          this.NroDeOrden = "";
          this.NroDeDAM = "";
          this.FechaDeNum = new Date();
          this.Mercaderia = resp.Mercaderia;
          
          this.EntidadesSelect=resp.Exportador;
          this.ControlEntidades.setValue(resp.Exportador);
          this.ControlDespachador.setValue("");
          this.ControlAgenciaAduana.setValue("");

          for (var clave in data.Datos) {
            this.CantidadBultos = this.CantidadBultos + data.Datos[clave].Bultos;
            this.CantidadPeso = this.CantidadPeso + data.Datos[clave].Peso;
            DetalleDatos.push({ 'CodContenedor': data.Datos[clave].CodContenedor, 'Contenedor': data.Datos[clave].Contenedor, 'Capacidad': data.Datos[clave].Capacidad, 'TipoCont': data.Datos[clave].TipoCont, 'Bultos': data.Datos[clave].Bultos, 'Peso': data.Datos[clave].Peso, 'PctoAduana': "" });
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
    this.dtTriggerCliente.next();
    this.dtTrigger.next();
    this.dtTriggerLiq.next();    
    console.log(this.dtElement);
  }



  public ngOnInit(): any {
   
    this.UnidadNegocio = localStorage.getItem("UniNegocioL");    
    this.TipoConsulta = localStorage.getItem("TipoConsultaL");
  /*  this.Documento = localStorage.getItem("DocumentoL");*/
    this.UniNegocio = localStorage.getItem("UniNegocioLD");

    this.TipoConsultaD = "";
    this.myButton.disable();

    //document.getElementById("btnGen").setAttribute("disabled","true");

    this.objLiquiMsjRQT = {
      Codigo : 1
      };

    if (this.TipoConsulta == "S")
    { this.MuestraPAP = true;
      //this.Contenedor =  localStorage.getItem("DocumentoL"); 
      this.Documento = localStorage.getItem("DocumentoL");       
      this.Contenedor =  "";       
      this.MBL = this.Documento;
      this.TipoConsultaD = "BOOKING";
      
      this.objLiquiMsj1RQT = {
          Codigo : 2
          };

      this.dtOptions.columnDefs = [
            {
                "targets": [ 5 ],
                "visible": true
              }
            ];

    }

    if (this.TipoConsulta == "I")
    { this.MuestraPAP = false;
      this.Contenedor = "" ;  
      this.TipoConsultaD = "MBL";  
      this.Documento = localStorage.getItem("DocumentoL"); 
      this.MBL = this.Documento;

      this.dtOptions.columnDefs = [
        {
            "targets": [ 5 ],
            "visible": false
          }
        ];

    }


    this.Contnumero = localStorage.getItem("paramNBooking");

    this.objLiquidacionBRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      UnidNegoCodigo: this.UnidadNegocio,
      Tipo: this.TipoConsulta,
      Documento: this.Documento,
      Contenedor: this.Contenedor
      };

      
    let resmsj = this.reportService.getMensajeLiquidacion(this.objLiquiMsjRQT);

    resmsj.subscribe( 
      data => {
        this.objLiquiMsjRPT = data;
        if (data.length >= 1)
        {                              
       
          this.MsjLiqCont = data[0].Msj;

        /*  let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
          for (var i = 0; i <= listaent.length-1; i++) {
            let last = listaent[i];           
            this.ListaEntidades.push(last);*/
     
        }
        else{
          this.onIsError();   
        }

      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );

      let resmsj1 = this.reportService.getMensajeLiquidacion(this.objLiquiMsj1RQT);

      resmsj1.subscribe( 
        data => {
          this.objLiquiMsj1RPT = data;
          if (data.length >= 1)
          {                              
         
            this.MsjLiqCont1 = data[0].Msj;

            this.MsjLiqCont2 = data[1].Msj;
  
          /*  let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
            for (var i = 0; i <= listaent.length-1; i++) {
              let last = listaent[i];           
              this.ListaEntidades.push(last);*/
       
          }
          else{
            this.onIsError();   
          }
  
        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        );
     
      
    let res = this.reportService.getLiquidacion(this.objLiquidacionBRQT);

    //  console.log(this.objAutEntregaPrecRQT)
    this.objListLiquiCliente = new Array;  

    res.subscribe( 
      data => {
        this.objLiquidacionBRPT = data;
        if (this.objLiquidacionBRPT.Msj == 'OK')
        {                              
       
          let clienteLiq = new LiquidacionCliente();
          clienteLiq.RegiCodigo = data.RegiCodigo;
          clienteLiq.Documento = data.Documento;
          clienteLiq.Cliente = data.Cliente;
          clienteLiq.NaveViaje = data.NaveViaje;
          clienteLiq.LineaNaviera = data.LineaNaviera;
          clienteLiq.Notificador = data.Notificador;
          clienteLiq.Terminal = data.Terminal;
          clienteLiq.EntiCodigo = data.EntiCodigo;
          clienteLiq.Volante = data.Volante
          clienteLiq.EntiCodigoAgAduanas = data.EntiCodigoAgAduanas;
          clienteLiq.AgenteAduanas = data.AgenteAduanas;
          clienteLiq.Termcodempty = data.Termcodempty;

          this.objListLiquiCliente.push(clienteLiq);

        /*  let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
          for (var i = 0; i <= listaent.length-1; i++) {
            let last = listaent[i];           
            this.ListaEntidades.push(last);*/
        this.objListLiquiCont = data.data;
        }
        else{
          swal(data.Msj.toString());
          this.dialogRef.close();
          this.onIsError();   
        }

        this.dtElements.forEach((dtElement: DataTableDirective) => {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
        });
        this.dtTriggerCliente.next(this.objListLiquiCliente); 
        this.dtTrigger.next(this.objListLiquiCont);
      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );

      
  this.filteredEmp = this.myAgencia.valueChanges.pipe(
    startWith(''),
    map(value => this._filteremp(value))
  );

  
  this.filteredEmpresa = this.myEmpresa.valueChanges.pipe(
    startWith(''),
    map(value => this._filterempf(value))
  );

  
  this.ListaEmpresas = new Array

  this.reportService
  .getListaEntidades()
  .subscribe(
    data => {
      
      this.LEmpresas = data;

      if (this.LEmpresas.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEmpresas.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEmpresas.push(last);
          //this.options.push(last.Nombre);
        }
      
      }
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }

     // this.router.navigate(['home']);    

    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

    
  this.ListaEmpresasF = new Array

  this.reportService
  .getListaEntidades()
  .subscribe(
    data => {
      
      this.LEmpresasF = data;

      if (this.LEmpresasF.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEmpresasF.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEmpresasF.push(last);
          //this.options.push(last.Nombre);
        }
      
      }
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }

     // this.router.navigate(['home']);    

    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );



    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }

    // this.SetGrillaVisibility(false);
    //this.setearFechasLimite();
    this.muestra_oculta("DAM");
    this.muestra_oculta("CONTENEDORES");
    this.muestra_oculta("DOCUMENTOS");
    this.muestra_oculta("PAP");
    this.muestra_oculta("LIQUIDACION");
    
    

  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  
  private _filteremp(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresas.filter(emp => emp.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterempf(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresasF.filter(empresa => empresa.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }


  
  public ChangingValueE(param : any)
  {
    var codenti = param.option.value.toString().split(",");
    var codentif = codenti[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.EntidadSelect = codentif;   
 //   swal(this.EntidadSelect);   
    this.NEntidadSelect = param.option.viewValue;
    let enti = this.EntidadSelect;

    this.myAgencia.setValue(this.NEntidadSelect);
  }
  
  public ChangingValueF(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.EmpresaSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NEmpresaSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

    this.myEmpresa.setValue(this.NEmpresaSelect);
  }

  
  public SetGrillaVisibility(param:boolean)
  {
    if (param) {
      document.getElementById('grillaliq').style.visibility = "visible";
    }
    else {
      document.getElementById('grillaliq').style.visibility = "hidden";
    }
  }

  VisualizarLiq()
  {

    if (this.EntidadSelect == "" || this.EntidadSelect == undefined || this.EmpresaSelect == "" || this.EmpresaSelect == undefined )
    {
       swal("Debe seleccionar la Agencia de Aduana y la Empresa a facturar");
       return;
    }

   this.Cantidad = 0;
 
    if (this.TipoConsulta == "S")
    { 

    /*for (var i = 0; i <= this.objListLiquiCont.length - 1; i++) {        
    
       if (this.objListLiquiCont[i].Cantidad == undefined || this.objListLiquiCont[i].Cantidad.toString() == "" )
       {
        swal("Debe ingresar todas las cantidades");
        return;
       }
       
      }*/
      
      for (var i = 0; i <= this.objListLiquiCont.length - 1; i++) {        
    
        this.Cantidad = this.Cantidad + Number.parseInt(this.objListLiquiCont[i].CantDisponible.toString());
      }

    }

    if (this.TipoConsulta == "I")
    { 

      for (var i = 0; i <= this.objListLiquiCont.length - 1; i++) {        
    
        this.Cantidad = this.Cantidad + Number.parseInt( this.objListLiquiCont[i].CantDisponible.toString());
      }

    }

    if (this.TipoConsulta == "S")
    {
     if (this.NombreCompleto == "" || this.NombreCompleto == undefined || this.TipoDoc == "" || this.TipoDoc == undefined || this.Empresa == "" || this.Empresa == undefined)
     {
        swal("Debe ingresar todos los datos de la Persona Autorizada");
        return;
     }
    }
    else
    {
      this.NombreCompleto = "";
      this.TipoDoc = "";
      this.Empresa = "";
     
    }

    
    var datePipe = new DatePipe("en-US");
    let value = new Date();
    this.FechaSelec =  datePipe.transform(value.toString(), 'dd/MM/yyyy');
  

    this.objValFactARQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      FacturarACod: this.EntidadSelect,
      FacturarA: this.EmpresaSelect

      };

      this.objValTercRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        EntidadCod: this.TipoConsulta,
        UnidNegoCodigo: this.UnidadNegocio,
        FacturarACod: this.EntidadSelect
        };
      
    let res = this.reportService.ValidarFacturarA(this.objValFactARQT);

    res.subscribe( 
      data => {
        this.objValFactARPT = data[0];

        if (this.objValFactARPT.Msj == "Ok")
        {                              
       
          let resval = this.reportService.ValidarTercero(this.objValTercRQT);

          resval.subscribe( 
            data => {
              this.objValTercRPT = data[0];

              if (this.objValTercRPT.Msj == "Ok")
              {                              
               /*habilitar el boton generar liquidacion*/
              } 
             else{

             /* this.swAlertC = {             
                 title: 'Alerta Contrans',
                 text: this.objValTercRPT.Msj.toString().toUpperCase(),
                 icon: 'info',
                 showCancelButton: true,
                 confirmButtonColor: '',
                 cancelButtonColor: '',
                 confirmButtonText: 'Aceptar',
                 width : 500          
                };              
              Swal(this.swAlertC         
              ).*/              
              Swal({
                title: this.objValTercRPT.Msj.toString().toUpperCase(),
               /* text: "You won't be able to revert this!",*/
                type : 'question',
                showCancelButton : true,
                confirmButtonText: "Aceptar",
                cancelButtonText : "Cancelar",
                cancelButtonColor: '#d33',
                width : 500      
              }).then((result) => {
                if (result.value) {
                  //this.myButton.enable();
                  //this.buttondis = false;
                

              

                  this.objVisLiquiRQT = {
                    IDUser: Number.parseInt(localStorage.getItem("Usuario")),
                    IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
                    Codigo: 0,
                    Accion: "N",
                    TipoOperacion: this.TipoConsulta,
                    CodigoUnidadNegocio: this.UnidadNegocio,
                    Extranet: 0,
                    Registro: this.MBL,
                    FechaLiquidacion: this.FechaSelec,
                    Facturar_A: this.EmpresaSelect,
                    NombreCompleto: this.NombreCompleto,
                    TipoDoc: this.TipoDoc,
                    EmpresaPertenece: this.Empresa,
                    Cantidad: this.Cantidad,
                    CodigoEntidadLista: "",
                    Fecha: "",
                    Usuario: "",
                    CodigoEntidadAgencia: "",
                    TipoEntiRecojoPrecinto: ""
                    };

                 // document.getElementById("btnGen").setAttribute("disabled","false");

                 let resvis = this.reportService.getVisLiquidacion(this.objVisLiquiRQT);

                 //  console.log(this.objAutEntregaPrecRQT)
                // this.objListVisLiqui = new Array;  

                this.MuestraLiq = true;
             
                 resvis.subscribe( 
                   data => {
                     this.objVisLiquiRPT = data;
                     if (this.objVisLiquiRPT.Msj == "OK")
                     {                              
                    
                 
                     /*  let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
                       for (var i = 0; i <= listaent.length-1; i++) {
                         let last = listaent[i];           
                         this.ListaEntidades.push(last);*/
                   
                        this.objListVisLiqui = data.data;

                  
                        this.CodigoLiqui = this.objVisLiquiRPT.Liquidacion;

                        this.dtTriggerLiq.next(this.objListVisLiqui);

                        if (this.objListVisLiqui.length >= 1)
                        {
   
                         if (this.objListVisLiqui[0].num_LiquDetaCantidad == 0)
                         {swal("No se puede grabar la liquidacion, no existen importes.");                       
                         }
                         else
                         {
   
                        var element = <HTMLButtonElement> document.getElementById("btnGen");
                        element.disabled = false;
                         }
                        }
                        
                       for (var i = 0; i <= this.objListVisLiqui.length - 1; i++) {  
                         
                         this.CodigoMoneda =  this.objListVisLiqui[i].chr_MoneCodigo.toString();          
                         this.SubTotal = this.SubTotal + Number.parseFloat(this.objListVisLiqui[i].num_LiquDetaTotal.toFixed(2));
                         this.Impuesto = this.Impuesto + Number.parseFloat(this.objListVisLiqui[i].num_LiquDetaImpuesto.toFixed(2));
                         this.Total = this.Total + Number.parseFloat(this.objListVisLiqui[i].num_LiquDetaNeto.toFixed(2));
   
                        }
                        

                      

                     

                   


                     }
                     else{
                      this.MuestraLiq = false;
                       swal(data.Msj);
                       this.onIsError();   
                     }
             
                     /*this.dtElements.forEach((dtElement: DataTableDirective) => {
                       dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
                     });
                     this.dtTriggerCliente.next(this.objListLiquiCliente); 
                     this.dtTrigger.next(this.objListLiquiCont);*/
                 
                   },  
                   error => {
                    this.MuestraLiq = false;
                    swal({
                    text: "Error al cargar los datos",
                    icon: "error",
                     }); 
                     this.onIsError();           
                     console.log("Error");}
                   );
             
                
                }
              })

            //   this.onIsError();   
             }
            }, 
           error => {
            swal({
              text: "Error al Validar Tercero",
              icon: "error",
               }); 
           this.onIsError();           
           console.log("Error");}
           );

        /*  Validar Tercero va aca*/
        }
        else{
          swal(this.objValFactARPT.Msj);
          this.onIsError();   
        }

     
      },  
      error => {
        swal({
          text: "Error al Validar Facturar A",
          icon: "error",
           }); 
        this.onIsError();           
        console.log("Error");}
      );






  }

  GenerarLiq()
  {}

  Limpiar()
  {}


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
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      this.fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let index: number = 0;

      if (TipoArchivoCarga=='DAM'){
        if (this.fileitems_DAM.length >= 1) { index = this.fileitems_DAM.length; }
        else { index = 0; }
        this.fileitem_DAM = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
        this.filename_DAM = file.name;
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
  
  public ngOnDestroy():any {
   // this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
    this.dtTriggerCliente.unsubscribe();
    this.dtTriggerLiq.unsubscribe();
  } 

  GrabarLiquidacion()
  {
    if (this.objListVisLiqui.length == 0 || this.objListVisLiqui.length == undefined)
    {swal('Debe de visualizarse la liquidación primero');
    return;}

    this.objRegLiquiRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Codigo: this.CodigoLiqui,
      Accion: "Y",
      TipoOperacion: this.TipoConsulta,
      CodigoUnidadNegocio: this.UnidadNegocio,
      Extranet: 0,
      Registro: this.MBL,
      FechaLiquidacion: this.FechaSelec,
      Facturar_A: this.EmpresaSelect,
      NombreCompleto: this.NombreCompleto,
      TipoDoc: this.TipoDoc,
      EmpresaPertenece: this.Empresa,
      Cantidad: this.Cantidad,
      CodigoEntidadLista: "",
      Fecha: this.FechaSelec,
      Usuario: "",
      CodigoEntidadAgencia: this.EntidadSelect,
      TipoEntiRecojoPrecinto: "",
      MoneCodigo: this.CodigoMoneda,
      LiquFactSubTotal: this.SubTotal ,
      LiquFactImpuesto: this.Impuesto ,
      LiquFactTotal: this.Total,
      UsuarioSAP: "",
      CodigoTipoVenta: "",
      CodigoDocumento: "",
      CodigoSerie: "",
      SerieDocumento: "",
      CarpetaOC: "",
      Referencia: "",
      CodigoFactura: 0    
      };

   // document.getElementById("btnGen").setAttribute("disabled","false");

   let resreg = this.reportService.RegLiquidacion(this.objRegLiquiRQT);

   //  console.log(this.objAutEntregaPrecRQT)
   
   resreg.subscribe( 
    data => {
      this.objRegLiquiRPT = data;

      if (this.objRegLiquiRPT.CodMsj == 0)
      {                              
         swal(data.Msj);
         this.dialogRef.close();


      }
      else{
        swal(data.Msj);
        this.onIsError();   
      }
    },  
    error => {
      swal({
        text: "Error al cargar los datos",
        icon: "error",
         }); 
      this.onIsError();           
      console.log("Error");}
    );



  }

  public AgregarRefrendo(form: NgForm) {
    var NBooking: string
    NBooking = form.value.txtbox_NBooking

    if (NBooking == undefined) {
      swal("Error: Ingresar Numero de Booking");
      //return false;
    } else {
      let DetalleDatos = [];
      let DetalleArchivos = [];
      for (var clave in this.Datos) {
        DetalleDatos.push({ 'CodContenedor': this.Datos[clave].CodContenedor, 'Contenedor': this.Datos[clave].Contenedor, 'Bultos': Number.parseInt(this.Datos[clave].Bultos.toString()), 'Peso': Number.parseInt(this.Datos[clave].Peso.toString()), 'PctoAduana': this.Datos[clave].Precinto });
      }
      this.Datos = DetalleDatos;
      console.log("Detalle Booking Guardar " + this.Datos);

      for (var DAM in this.fileitems_DAM) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 1, 'Archivo': this.fileitems_DAM[DAM].base64, 'NombreArchivo': this.fileitems_DAM[DAM].name });
      }
      for (var GUIAREMISION in this.fileitems_GUIAREMISION) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 2, 'Archivo': this.fileitems_GUIAREMISION[GUIAREMISION].base64, 'NombreArchivo': this.fileitems_GUIAREMISION[GUIAREMISION].name });
      }
      for (var TARJADELLENADO in this.fileitems_TARJADELLENADO) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 3 , 'Archivo': this.fileitems_TARJADELLENADO[TARJADELLENADO].base64, 'NombreArchivo': this.fileitems_TARJADELLENADO[TARJADELLENADO].name });
      }
      for (var TICKETDEPESO in this.fileitems_TICKETDEPESO) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 4, 'Archivo': this.fileitems_TICKETDEPESO[TICKETDEPESO].base64, 'NombreArchivo': this.fileitems_TICKETDEPESO[TICKETDEPESO].name });
      }
      for (var BOOKING in this.fileitems_BOOKING) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 5, 'Archivo': this.fileitems_BOOKING[BOOKING].base64, 'NombreArchivo': this.fileitems_BOOKING[BOOKING].name });
      }
      for (var OTROS in this.fileitems_OTROS) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 6, 'Archivo': this.fileitems_OTROS[OTROS].base64, 'NombreArchivo': this.fileitems_OTROS[OTROS].name });
      }
      for (var REPORTDECARGASUELTA in this.fileitems_REPORTDECARGASUELTA) {
        DetalleArchivos.push({ 'RefrendoTipoArcCod': 6, 'Archivo': this.fileitems_REPORTDECARGASUELTA[REPORTDECARGASUELTA].base64, 'NombreArchivo': this.fileitems_REPORTDECARGASUELTA[REPORTDECARGASUELTA].name });
      }

      console.log("Archivos " + JSON.stringify(DetalleArchivos)); 


      this.objGenerarRefrendoExpoRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        BookLineCodigo: this.Codigo,
        BookLineNroDoc: form.value.txtbox_NBooking,
        DAM: form.value.txtbox_NroDeDAM,
        Exportador: this.EntidadesSelect,
        NumOrden: form.value.txtbox_NroDeOrden,
        Despachador: this.DespachadorSelect,
        EntiCodAgencia: this.CodigoAgenciaAduanaSelect,
        AgenciaAduana: this.AgenciaAduanaSelect,
        FechaNum: form.value.txtbox_FechaDeNum,
        Mercancia: form.value.txtbox_Mercaderia,
        EmpaCodigo: this.ModalidadSelect,
        Llenado: true,
        Aduana: "",
        Anio: "",
        Regimen: "",
        CodProducto: "",
        Producto: "",
        FechaCutOff: "",
        FOB: "",
        MandatoElectronico: true,        
        Deta: this.Datos,
        ArchivoRefrendo: DetalleArchivos
      }

      console.log("Datos REFRENDON " + JSON.stringify(this.objGenerarRefrendoExpoRQT));

      if (this.ValidarInput(this.objGenerarRefrendoExpoRQT)) {
        swal({
          text: "Error en los campos de ingreso, por favor verificar",
          icon: "warning",
        });
        return;
      }

      

      console.log("EMPEZAR A GUARDAR DATOS")
      this.reportService.GenerarRefrendoExpo(this.objGenerarRefrendoExpoRQT).subscribe(
        data => {
          this.objGenerarRefrendoExpoRPT = data;
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

    }
  }

  public Recalcular() {
    this.CantidadBultos = 0;
    this.CantidadPeso = 0;
    for (var clave in this.Datos) {
      this.CantidadBultos = this.CantidadBultos + Number.parseInt(this.Datos[clave].Bultos.toString());
      this.CantidadPeso = this.CantidadPeso + + Number.parseInt(this.Datos[clave].Peso.toString());
    }
  }

  public ValidarInputCabecera(param: ConsultaBookingRefrendoExpoRQT): boolean {

    if (this.NullEmpty(param.Modalidad)) {
      return true;
    }
    return false;
  }
  public ValidarInput(param: GenerarRefrendoExpoRQT): boolean {

    if (this.EntidadesSelect == "" || this.ControlEntidades.value.toString() == ""){
      return true;
    }
    if (this.DespachadorSelect == "" || this.ControlDespachador.value.toString() == ""){
      return true;
    }
    if (this.AgenciaAduanaSelect == "" || this.ControlAgenciaAduana.value.toString() == ""){
      return true;
    }

    /* if (this.NullEmpty(param.Exportador)) {
      return true;
    }

    if (this.NullEmpty(param.Despachador)) {
      return true;
    }

    if (this.NullEmpty(param.AgenciaAduana)) {
      return true;
    } */

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
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarRefrendoExpoRQT.FechaNum = this.objGenerarRefrendoExpoRQT.FechaNum.toLocaleDateString("es-ES", options);
    console.log(this.objGenerarRefrendoExpoRQT.FechaNum);
    return false;
  }

  public NullEmpty(param: any): boolean {
    return !(typeof param != 'undefined' && param)
  }

  /*public SetGrillaVisibility(paramControl: string,  param: boolean) {
    if (param) {
      document.getElementById(paramControl).style.visibility = "visible";
    }
    else {
      document.getElementById(paramControl).style.visibility = "hidden";
    }
  }*/
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
      if (param.target.value=="001"){
        this.TARJADELLENADO= true;
        this.REPORTDECARGASUELTA=false;
      }else if (param.target.value=="002"){
        this.TARJADELLENADO= false;
        this.REPORTDECARGASUELTA=true;
      }
    }else if (paramTipo == "Entidad") {
      this.EntidadesSelect=param.option.viewValue
      this.ControlEntidades.setValue(param.option.viewValue);
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
    return this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0);
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
