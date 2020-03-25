
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewChildren,QueryList, ElementRef } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import {map, startWith} from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { Subject, fromEventPattern } from 'rxjs';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio, TipoCarga, TiposCarga, Almacenes, Almacen, AlmacenRQT, TipoCita,TiposCita } from '../../models/Factura';
import { CitasRPT, CitasRQT, Citas, TokenCitaRPT, TokenCitaRQT, ActCitaRPT, ActCitaRQT, ValidarTokenCitaRQT, 
ValidarTokenCitaRPT, ActTokenCitaRPT, AnularCitaRPT, AnularCitaRQT, ActTokenCitaRQT, ImpriCitaRPT, ImpriCitaRQT,
CitaPermisoRPT, CitaPermisoRQT, CitasPermiso, CitaLContenedorRPT, CitaLContenedorRQT, CitasContenedor,
CitasCFechaRQT, CitasCFechaRPT, CitasCHoras, CitasCHorasRQT, CitasCHorasRPT, CitaVacioDev,InsertarCitaDetalleRPT,
InsertarCitaDetalleRQT, InsertarCitaRPT, InsertarCitaRQT } from '../../models/Cita';
import swal from 'sweetalert';
import { CitavacioasigComponent  } from 'app/views/dashboards/citavacioasig.component';




@Component({
  selector: 'app-generarcita',
  templateUrl: './generarcita.component.html',
  styleUrls: ['./generarcita.component.css']
})


export class GenerarcitaComponent implements AfterViewInit, OnDestroy, OnInit {

  
  @ViewChild(DataTableDirective)
 // @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  registerForm: FormGroup;
  submitted = false;
  cerrado = false;
  
  public SiCargoData = true;
  public Trasegado = false;
  public MuestraTipoCita = false;
  public MuestraCont = false;
  public MuestraPalet = false;
  public MuestraVacio = false;
  
  public MuestraProg = false;
  public RegiCodigo : string = "";
  
  
  public MuestraTabla = false;
  public FechaSelec : string = "";
  public FechaSeleccionada : string = "";
  
  
  public MuestraCantCTN = false;
  public ServExt : string = "";
  public ServExtra : string = "";
  public Serie : string = "";
  public Descripcion : string = ""; 

  public unaAM : string = "";
  public dosAM : string = "";
  public tresAM : string = "";
  public cuatroAM : string = "";
  public cincoAM : string = "";
  public seisAM : string = "";
  public sieteAM : string = "";
  public ochoAM : string = "";
  public nueveAM : string = "";
  public diezAM : string = "";
  public onceAM : string = "";
  public doceAM : string = "";
  
  
  public unaPM : string = "";
  public dosPM : string = "";
  public tresPM : string = "";
  public cuatroPM : string = "";
  public cincoPM : string = "";
  public seisPM : string = "";
  public sietePM : string = "";
  public ochoPM : string = "";
  public nuevePM : string = "";
  public diezPM : string = "";
  public oncePM : string = "";
  public docePM : string = "";

  public DiaSelec : number;
  public RetiCuotCodigo : number;
  public HoraProg : string;
  public Paletizada : string = "";
  public PaletizadaD : string = "";
  
  public Extra: string = "";
  public ExtraD: string = "";
  
  public Extemp: string = "";

  
  myControl = new FormControl();
  
  myPlacaV = new FormControl();
  myBreveteV = new FormControl();
  myBultoCita = new FormControl();
  myPesoCita = new FormControl();
  myTraseg = new FormControl();
  myNroCont = new FormControl();
  
  
  
  constructor(
  private reportService: ReportService, 
  private router: Router, 
  public dialogRef : MatDialogRef<GenerarcitaComponent>, 
  @Inject(MAT_DIALOG_DATA) public data:any,
  private location: Location,
  private dialog : MatDialog,
  private formBuilder: FormBuilder)
   { }

  usersForm: FormGroup;
  heroForm: FormGroup;
  isLoading = false;

  //myControl = new FormControl();
  //filteredOptions: Observable<string[]>;

  public isError = false;
  public EntidadSelect:string = "";
  public NEntidadSelect:string = "";
  //public TokenCita : string = "";
  public msjfinal:string = "";
  public NroCita : string = "";
  public TituloCita : string = "";
  public SubTituloCita : string = "";
  public MuestraImp : boolean = true;
  public TipoCargaSelect :  string = "";
  public TipoCitaSelect :  string = "";
  public UnidadNegSelect : string = "";

  
  public objCitasVDev = [];
  selectedOptions = [];
  public objCitasDetalles = [];
  public objCitasCodigos = [];
  
  
  
  public campo : string = "Registro";
  public labelfecha : string = "";
  public IDRol : number;
  public Token : string = "";
  public Registro : string = "";
  public PermCodigo : string = "";
  public Index : number;
  public BultoCitaTotal : number = 0;
  public PesoCitaTotal : number = 0;
  


  minDate: Date;
  maxDate: Date;
  

  public ListaTiposCarga : Array<TipoCarga> = [];
  public TipoCargaE : TiposCarga;

  public ListaTiposCita : Array<TipoCita> = [];
  public TiposCitaE : TiposCita;
  
  public ListaAlmacenes : Array<Almacen> = [];
  public AlmacenE : Almacenes;
  public objAlmacenRqt : AlmacenRQT = {
    EmpaCodigo : ""
  };
  
  public objCitasPermisos : Array<CitaPermisoRPT> = [];
  public objCitasContenedor : Array<CitaLContenedorRPT> = [];

  public objCitasHoras : Array<CitasCHorasRPT> = [];

  public TieneData = false;  


  private citaPermisoRqt: CitaPermisoRQT = {
    Token : "",
    IDRol : 0,
    TCarga : "",
    Almacen : "",
    Registro : "",
    Trasegado : false,
    TipoCita: ""

    };

    
  private InsertarCitaRqt: InsertarCitaRQT = {
    Token : "",
    IDRol : 0,
    RegiCodigo: "",
    RetiCuotProgCodigo: "",
    PermCodigo:  "",
    Empaque: "",
    UnidadNeg: "",
    TipoCita: "",
    Trasegado: false,
    Extra: -1,
    Extemp: -1,
    Paletizada: -1,
    ColdTreatment: false,
    FechaCT: "",
    HoraCT: "",
    LugarProg: ""
    };

    
  private InsertarCitaRpt: InsertarCitaRPT = {
    Cod : -1,
    Msj : ""
  }

   
  private InsertarCitaDetRpt: InsertarCitaDetalleRPT = {
    Cod : -1,
    Msj : ""
  }

    
  private citaContenedorRqt: CitaLContenedorRQT = {
    Token : "",
    IDRol : 0,
    TCarga : "",
    Almacen : "",
    Permiso : "",
    Trasegado : false
    };

    private citaCHorasRqt: CitasCHorasRQT = {
      Token : "",
      IDRol : 0,
      Fecha : "",
      Registro : "",
      TipoCarga : "",
      Almacen : ""
      };

      private citachoras : CitasCHoras = {
        Data : [] 
      }

    
  private citaCFechaRQT: CitasCFechaRQT = {
    Token : "",
    IDRol : 0,   
    };

  private citaCFechaRPT: CitasCFechaRPT = {
    ErrMsg: "",
    Proceso: 0,
    Dia: 0,
    DiasRepetecion: 0,
    FInicio: "",
    FTermino: "",
    Cantidad: 0
      };
  
    
  private citasContenedor: CitasContenedor = {
    Error: -1,
    ErrorMsg: "",
    Data: []
  }
  
  onSubmit()
  {

  }

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
   // this.dtTriggerDev.next();    
    console.log(this.dtElement);
  }

  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
//    this.dtTriggerDev.unsubscribe();
    
  }

  
  onListControlChanged(list:any)
  {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

  }

  dtTriggerImpo:Subject<any> = new Subject();
  dtOptionsImpo : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
 

  dtTriggerDev:Subject<any> = new Subject();
  dtOptionsDev : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
 
  dtTriggerSuelta:Subject<any> = new Subject();
  dtOptionsSuelta : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    select : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
 
  
  dtTrigger:Subject<any> = new Subject();
  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
  
  ngOnInit() {
    
   //this.NroCita = localStorage.getItem("NroCita").toString();

   
   this.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
   this.Token = this.reportService.getToken();

   this.myTraseg.disable();

   this.SetGrillaVisibility(false);
   this.SetGrillaVisibilityDev(false);
   this.SetGrillaVisibilityImpo(false);
   this.SetGrillaVisibilitySuelta(false);
   
   

   //this.setearFechasLimite();

   this.ServExt = "NO";
   this.ServExtra = "NO";
   

   this.ListaTiposCarga = new Array;

    this.reportService
    .getTipoCarga()
    .subscribe(
    data => {
      
      this.TipoCargaE = data;

      if (this.TipoCargaE.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.TipoCargaE.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaTiposCarga.push(last);      
        }
      
      }
      else{  
        this.onIsError();   
      }
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

    
   this.ListaTiposCita = new Array;

   this.reportService
   .getTiposCita()
   .subscribe(
   data => {
     
     this.TiposCitaE = data;

     if (this.TiposCitaE.Data != null)
     {                              
       let listaent = JSON.parse(JSON.stringify(this.TiposCitaE.Data));              
      
       for (var i = 0; i <= listaent.length-1; i++) {
         let last = listaent[i];            
         this.ListaTiposCita.push(last);      
       }
     
     }
     else{  
       this.onIsError();   
     }
   },  
   error => {
     this.onIsError();           
     console.log("Error");}
   );


 

    
  
  
  }

 
  public GetRowIndex(param : any)
  {
    //swal(param.toString());
 //   this.Index = Number.parseInt(param.toString());

  }

  public ChangingBulto(param : any, indexrow : number)
  {

    this.PesoCitaTotal = 0;
    this.BultoCitaTotal = 0;
   // swal("Este es el evento");

   this.Index = indexrow;

  // swal(this.Index.toString());

    let bultos = Number.parseFloat(param.target.value);

    let salbulto = this.objCitasDetalles[this.Index].AutBulto;
    let salpeso = this.objCitasDetalles[this.Index].AutPeso;

    let pesoaprox = (salpeso * bultos)/salbulto;

    this.objCitasDetalles[this.Index].Peso = pesoaprox.toFixed(2);
    this.objCitasDetalles[this.Index].Bulto = bultos;

    this.objCitasVDev[this.Index].Bultos = bultos;
    
    this.objCitasVDev[this.Index].PesoTotal = pesoaprox;

    var bultotot = 0;

    for (var i = 0; i <= this.objCitasVDev.length-1; i++) {

      if (this.objCitasVDev[i].Bultos == "")
      {this.objCitasVDev[i].Bultos = 0;}
      
      this.PesoCitaTotal = this.PesoCitaTotal + Number.parseFloat(this.objCitasVDev[i].PesoTotal);
      this.BultoCitaTotal = this.BultoCitaTotal + Number.parseFloat(this.objCitasVDev[i].Bultos);

      
      
      //bultotot = bultotot + Number.parseFloat(this.objCitasVDev[i].PesoTotal);

    }


    this.myBultoCita.setValue(this.BultoCitaTotal.toFixed(2));
    this.myPesoCita.setValue(this.PesoCitaTotal.toFixed(2));

    //this.myPesoCita.setValue(bultotot.toFixed(2));
        

  }

  public ChangingValue(param : any)
  {
    this.TipoCargaSelect = param.target.value;
    this.objAlmacenRqt.EmpaCodigo = this.TipoCargaSelect;
    
    this.ListaAlmacenes = new Array;

    if (this.TipoCargaSelect == "001")
    { this.myTraseg.enable(); }


    if (this.TipoCargaSelect == "002")
    { this.MuestraTipoCita = false;
      this.myTraseg.disable();}


    this.reportService
    .getunidadnegocioxtipo(this.objAlmacenRqt)
    .subscribe(
    data => {
      
      this.AlmacenE = data;

      if (this.AlmacenE.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.AlmacenE.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaAlmacenes.push(last);      
        }
      
      }
      else{  
        this.onIsError();   
      }
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );





  }

  
  public ChangingValueUN(param : any)
  {
    this.UnidadNegSelect = param.target.value;

    if (this.UnidadNegSelect == "03")
     {
      this.MuestraTipoCita = true;
      this.campo = "BL"}

     if (this.UnidadNegSelect == "01")
     {
      this.MuestraTipoCita = false;
      this.TipoCitaSelect = "";
      this.campo = "Registro";}
  }

  
  public ChangingValueTC(param : any)
  {
    this.TipoCitaSelect = param.target.value;

    if (this.TipoCitaSelect == "01")
     {this.campo = "BL";     
     }

     
    if (this.TipoCitaSelect == "02")
    {     this.campo = "BK Oscar"   
          this.MuestraProg = false;
   }
   ;
  
  }


  

  
  public ChangeFecha(param : any)
  {
    //this.TipoCitaSelect = param.target.value;
   // let valor = document.getElementById('dpFechaProg').textContent;    
    /*document.getElementById("txtbox_Cliente").textContent = entiNombre;
    document.getElementById("txtbox_Cliente").innerText = entiNombre;
    document.getElementById("txtbox_Cliente").setAttribute("placeholder",entiNombre)
    document.getElementById("txtbox_Cliente").setAttribute("disabled","true");*/
if (param != null)
{
    this.MuestraTabla = true;
    console.log(param);
   // swal(valor.toString());

    //let date = new Date("Sun Mar 15 2020");

    var datePipe = new DatePipe("en-US");
    let value = datePipe.transform(param.toString(), 'dd/MM/yyyy');
    this.FechaSelec =  datePipe.transform(param.toString(), 'yyyy/MM/dd');
    this.FechaSeleccionada = value.toString();

    let dia = datePipe.transform(param.toString(), 'dd');

    this.DiaSelec = Number.parseInt(dia.toString()),
  //  swal(value.toString());

    
this.citaCHorasRqt = {
  Token : this.citaContenedorRqt.Token,
  IDRol : this.citaContenedorRqt.IDRol,
  Fecha : value.toString(),
  Registro : this.citaPermisoRqt.Registro ,
  TipoCarga : this.citaContenedorRqt.TCarga,
  Almacen : this.UnidadNegSelect
  };
     
this.VisualizarHoras();

}
  }

  
  public Checked(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.Trasegado = chekeado;

   
  }

  AgregarProgramacion()
  {

    if (this.selectedOptions.length == 0)
    { swal("Debe seleccionar un contenedor para agregar una programación");
    return};

    if (this.RetiCuotCodigo == undefined || this.RetiCuotCodigo == 0)
    { swal("Debe seleccionar una fecha y hora de programación");
    return;}

    if (this.TipoCargaSelect == "002" && (this.myPlacaV.value == "" || this.myBreveteV.value == "" )  )
    { swal("Debe ingresar una placa y un brevete para agregar una programación");
      return;
    }
    
    if (this.TipoCargaSelect == "002" && (this.myPlacaV.value == undefined || this.myBreveteV.value == undefined )  )
    { swal("Debe ingresar una placa y un brevete para agregar una programación");
      return;
    }

    if (this.MuestraPalet == true)
    {
    let extra= document.getElementById('SEXTNo').getAttribute("checked").valueOf();

    if (extra == "true")
      { this.Extra = "0";
        this.ExtraD = "NO";
      }
    }
    else
    { this.Extra = "0"; this.ExtraD = "NO"; }



    for (var i = 0; i <= this.selectedOptions.length-1; i++) {
      
      let cont = this.selectedOptions[i].toString();

      var fitemz = this.objCitasVDev.filter(function (f) {
        return f.Serie == cont;
      });
      
      if (fitemz.length == 1)
      {
        swal("Ya existe una programación para el Contenedor: " + cont.toString());
      }
      else
      {
       

        let conte = this.selectedOptions[i].toString();

        var citacont = this.objCitasContenedor.filter(function (f) {
          return f.Contenedor == conte;
        });
        
       let desccont;
       let autbulto = 0;
       let autpeso = 0;
       let seriesu = "";
       let cpeso = 0;
       let cbulto = 0;
       let descontsu = "";
       let codicont = "";


        if (citacont.length == 1)
        {
          desccont = citacont[0].DesCTNR;
          descontsu = citacont[0].Contenedor;

          autbulto = citacont[0].AutBulto;
          autpeso =  citacont[0].AutPeso;

          seriesu =  citacont[0].Serie;
          cpeso =  citacont[0].CuotaPeso;
          cbulto =  citacont[0].CuotaBulto;

          codicont = citacont[0].CodiContenedor;
          this.RegiCodigo =  citacont[0].Registro;

        }  
        
        
    let serief = "";
    let desccontf = "";
    

    if (this.TipoCargaSelect == "002")
    {
       serief = seriesu;
       desccontf = descontsu;
    }
    else
    { serief = this.selectedOptions[i].toString();
      desccontf = desccont;
      
    }
        
      let placa = "";
      let brevete = "";

      if (this.TipoCargaSelect == "002")
      {
        brevete = this.myBreveteV.value;        
        placa = this.myPlacaV.value;
      }

      autbulto = 1000;
      cbulto = 1000;
   

      let citavdev = new CitaVacioDev(serief, desccontf, this.FechaSeleccionada,this.HoraProg,
      this.ServExt,placa , brevete, autbulto, autpeso , cpeso , cbulto,"",0, this.PaletizadaD , this.ExtraD  );
       
      this.objCitasVDev.push(citavdev);
      
      let citadetalle = new InsertarCitaDetalleRQT(this.Token,this.IDRol,"", this.PermCodigo,"", codicont, placa, brevete, this.Registro,
      cont,autpeso, autbulto, cpeso, cbulto, this.TipoCargaSelect,this.UnidadNegSelect, this.TipoCitaSelect, "", this.Trasegado);

      this.objCitasDetalles.push(citadetalle);
      
    }

    if (this.TipoCitaSelect == "01")
    {
     this.Serie = "Serie";
     this.Descripcion = "Descripción";

     
    this.dtTriggerDev.next(this.objCitasVDev);         
    this.SetGrillaVisibilityDev(true);

    /* this.dtOptionsDev.columnDefs = [
      {
          "targets": [ 4 ],
          "visible": true
        }
     ]*/

    }

    if (this.UnidadNegSelect == "01" && this.TipoCargaSelect == "001")
    {
     this.Serie = "Contenedor";
     this.Descripcion = "Tipo/Tamaño";

          
    this.dtTriggerImpo.next(this.objCitasVDev);         
    this.SetGrillaVisibilityImpo(true);


    }

    if (this.TipoCargaSelect == "002")
    {
    
          
    this.dtTriggerSuelta.next(this.objCitasVDev);         
    this.SetGrillaVisibilitySuelta(true);


    }
    /*this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
    });*/
    
    //this.dtTrigger.next(this.objCitasPermisos);     

    //this.dtTriggerDev.unsubscribe();
    //this.SetGrillaVisibility(true);
  }

  }

  popupGenerarCitaVacios()
  {
    let traseg;
    if (this.Trasegado == true)
    {  traseg = "1" }
    else
    { traseg = "0"}

    let CantCont;

   // swal("Citas Vacios");

    if ((this.objCitasPermisos.length >= 1) && (this.TipoCitaSelect == "02"))
    {CantCont = this.objCitasPermisos[0].CantContenedores;  
  //    swal("CantContenedores" + CantCont.toString());  
     localStorage.setItem("CantContenedores", CantCont.toString()); }

    localStorage.setItem("CitasPermiso",JSON.stringify(this.objCitasPermisos));    
    localStorage.setItem("Empaque",this.TipoCargaSelect);
    localStorage.setItem("UnidadNegocio", this.UnidadNegSelect);
    localStorage.setItem("TipoCita",this.TipoCitaSelect );
    localStorage.setItem("Trasegado", traseg);
    localStorage.setItem("Paletizada", this.Paletizada );
   
    if (this.TipoCargaSelect == "002")
    {
    let extemp= document.getElementById('SENo').getAttribute("checked").valueOf();

    if (extemp == "true")
    this.Extemp = "0";
    
    let extra= document.getElementById('SEXTNo').getAttribute("checked").valueOf();

    if (extra == "true")
    {this.Extra = "0";
    this.ExtraD = "NO";
    }
  }
  else
  {
    this.Extemp = "0";
    this.Extra = "0";
    this.ExtraD = "NO";
    this.Paletizada = "0";
  }


    localStorage.setItem("Extemp",this.Extemp);
    localStorage.setItem("Extra",this.Extra);

  if (this.TipoCitaSelect == "02")
  {
    if (this.RetiCuotCodigo == undefined || this.RetiCuotCodigo == 0)
    {
      swal("Debe seleccionar una fecha y hora de programación");
      return;
    }

  const dialogRef = this.dialog.open(CitavacioasigComponent,{
    disableClose: true,
    autoFocus: true,
    width: "500px",
    height : "500px",
    position: {
      top: '10%'
             }
     });

     
    dialogRef.afterClosed().subscribe(  result => {         
      
    let GrabaCita =  localStorage.getItem("GraboCita").toString();

    if (GrabaCita == "SI")
    {this.onClose();}    
      
  }

      );

  }

  
  if (this.TipoCitaSelect == "01" || this.UnidadNegSelect == "01" || this.TipoCargaSelect == "002")
  {

    if (this.objCitasDetalles.length == 0)
    {
      swal("Agregar al menos una programación ");
      return;
    }

    this.GrabarCita()

  }

  }

  public GrabarCita()
  {
    

    this.InsertarCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.InsertarCitaRqt.Token = this.reportService.getToken();

    
  if (this.TipoCitaSelect == "02")
  {

    this.InsertarCitaRqt.RegiCodigo = this.objCitasPermisos[0].BL.toString();
  }
  else
  {
    this.InsertarCitaRqt.RegiCodigo = this.RegiCodigo;

  }

    this.InsertarCitaRqt.RetiCuotProgCodigo = this.RetiCuotCodigo.toString();
    this.InsertarCitaRqt.PermCodigo =  this.objCitasPermisos[0].PermCodigo.toString();    
    this.InsertarCitaRqt.Empaque =  this.TipoCargaSelect;    
    this.InsertarCitaRqt.UnidadNeg = this.UnidadNegSelect;    
    this.InsertarCitaRqt.TipoCita = this.TipoCitaSelect;    
    this.InsertarCitaRqt.Trasegado = this.Trasegado;

    this.InsertarCitaRqt.Extra = Number.parseInt(this.Extra);
    this.InsertarCitaRqt.Extemp =  Number.parseInt(this.Extemp);
    this.InsertarCitaRqt.Paletizada =  Number.parseInt(this.Paletizada);
    this.InsertarCitaRqt.ColdTreatment = false;
    this.InsertarCitaRqt.FechaCT = "";
    this.InsertarCitaRqt.HoraCT = "";
    this.InsertarCitaRqt.LugarProg = "";

    
    //let placa= document.getElementById('txtPlaca').nodeValue;

    //let placa= document.getElementById('txtPlaca').getAttribute("").valueOf();
        
    /*document.getElementById("txtbox_Cliente").textContent = entiNombre;
    document.getElementById("txtbox_Cliente").innerText = entiNombre;*/

    //let brevete= document.getElementById('txtBrevete').getAttribute("innerText").valueOf();

    //this.Placa = placa;
   // this.Brevete = brevete;

    
   /* for (var i = 0; i <= this.objCitasVAsig.length -1; i++) {

       this.Placa = this.objCitasVAsig[i].Placa; 
       this.Brevete = this.objCitasVAsig[i].Brevete; 
       this.TipoContenedor =  this.objCitasVAsig[i].TipoCont;

    }*/
    

    for (var i = 0; i <= this.objCitasDetalles.length -1; i++) {

      this.objCitasDetalles[i].VehiPlacaPri = this.objCitasVDev[i].Placa; 
      this.objCitasDetalles[i].NroBrevete = this.objCitasVDev[i].Brevete; 
      this.objCitasDetalles[i].TipoCont =  "00";
      this.objCitasDetalles[i].PermCodigo =  this.InsertarCitaRqt.PermCodigo;
    
  
    }

    var citas =  this.objCitasDetalles.length; 
    var citg = 0;


    //Grabación de Carga Suelta//
    if (this.TipoCargaSelect == "002")
    {

      this.InsertarCitaRqt.Paletizada = 0;
      this.reportService
      .InsertarCita(this.InsertarCitaRqt)
      .subscribe(
      data => {
        
        this.InsertarCitaRpt = data;
  
        if (data != null)      
        {    
          if (data[0].Cod == 0)                          
          {
            
          for (var i = 0; i <= this.objCitasDetalles.length -1; i++) {
  
            // this.objCitasDetalles[i].Hoja = this.Placa;
           //  this.objCitasDetalles[i].NroBrevete = this.Brevete;           
             this.objCitasDetalles[i].hojaServCodigo =  data[0].Msj;         
    
           }
  
          this.GrabarCitaDetalleCargaSuelta();
  
         // swal("Se registro la cita " + data[0].Msj + " correctamente"); }
        
        }
        else{  
          this.onIsError();   
        }
      }
    },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );
  

    }

  
    if (this.TipoCitaSelect == "01" || (this.TipoCargaSelect == "001" && this.UnidadNegSelect == "01" ))
    {

    for (var j = 0; j <= this.objCitasDetalles.length ; j++) 
    {
  
      console.log(j.toString());
      console.log(this.InsertarCitaRqt);

      this.reportService
      .InsertarCita(this.InsertarCitaRqt)
      .subscribe(
      data => {
        
        this.InsertarCitaRpt = data;
  
        if (data != null)      
        {    
          if (data[0].Cod == 0)                          
          {        
            
             
             this.objCitasCodigos.push(data[0].Msj);
             
             if (this.objCitasDetalles.length ==  this.objCitasCodigos.length)
                {
                  
                  for (var i = 0; i <= this.objCitasDetalles.length -1; i++) {
    
                    this.objCitasDetalles[i].hojaServCodigo = this.objCitasCodigos[i].toString();
                  }              
                  
                  this.GrabarCitaDetalle()
                
                
                }
           
        
        }
        else{  
          this.onIsError();   
        }
      }
    },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );
     
  
    }
    
  }
    //Aca acaba
    
   // this.GrabarCitaDetalle();
    
 // this.onClose();

  }

  EditarPlacaVacios()
  {

    for (var i = 0; i <= this.objCitasDetalles.length -1; i++) {

      this.objCitasVDev[i].Placa = this.myPlacaV.value;
      this.objCitasVDev[i].Brevete = this.myBreveteV.value;
    }
  }

  GrabarCitaDetalleCargaSuelta()
  {

    for (var i = 0; i <= this.objCitasDetalles.length -1; i++) {

    let citadetrqt = this.objCitasDetalles[i];
    let codcita = this.objCitasDetalles[i].hojaServCodigo;

      this.reportService
      .InsertarCitaDetalle(citadetrqt)
      .subscribe(
      data => {
        
        this.InsertarCitaDetRpt = data;
  
        if (data != null)      
        {    
          if (data[0].Cod == 0)                          
          {
            console.log(data[0].Msj + " Se inserto el detalle de la cita correctamente");

           }
       
        }
      else
      {  
          this.onIsError();   
    }
      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );
  
      
      localStorage.setItem("GraboCita","SI");
      this.onClose();      
      swal("Se inserto la cita " +  codcita + " correctamente");


    }


  }


  GrabarCitaDetalle()
  {
    for (var j = 0; j <= this.objCitasDetalles.length-1; j++) {
    
    //  this.objCitasDetalles[j].hojaServCodigo = this.objCitasCodigos[j].toString();

      let citadetrqt = this.objCitasDetalles[j];

      this.reportService
      .InsertarCitaDetalle(citadetrqt)
      .subscribe(
      data => {
        
        this.InsertarCitaDetRpt = data;
  
        if (data != null)      
        {    
          if (data[0].Cod == 0)                          
          {
            console.log(data[0].Msj + " Se inserto el detalle de la cita correctamente");
            swal("Se inserto correctamente la cita " + citadetrqt.hojaServCodigo);
            this.onClose();
           }
       
        }
      else
      {  
          this.onIsError();   
    }
      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );
      }
  }


  onItemChangeCP(param :any){

    if(param.target.id == "CPSi"){
      this.Paletizada = "1";
      this.PaletizadaD = "SI";
      
    }
    else if(param.target.id == "CPNo"){
      this.Paletizada = "0";
      this.PaletizadaD = "NO";
      
    }
  }

  
  onItemChangeExt(param :any){

    if(param.target.id == "SESi"){
      this.Extemp = "1";
    }
    else if(param.target.id == "SENo"){
      this.Extemp = "0";
    }
  }


  onItemChangeExtr(param :any){

    if(param.target.id == "SEXTSi"){
      this.Extra = "1";
    }
    else if(param.target.id == "SEXTNo"){
      this.Extra = "0";
    }
  }

  
  onItemChangeHora(param :any){

  let control =  param.target.id;
  switch (control.toString()) {
      case "runaAM":
        var fitemz = this.objCitasHoras.filter(function (f) {
          return f.RetiCuotHora == 1;
        });
        
        if (fitemz.length == 1)
        {
        this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
        this.HoraProg = fitemz[0].HoraProg;
        
        }
      break;
      case "rdosAM":
        var fitemz = this.objCitasHoras.filter(function (f) {
          return f.RetiCuotHora == 2;
        });
        
        if (fitemz.length == 1)
        {
        this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
        this.HoraProg = fitemz[0].HoraProg;  }
        break;
        case "rdosAM":
          var fitemz = this.objCitasHoras.filter(function (f) {
            return f.RetiCuotHora == 2;
          });
          
          if (fitemz.length == 1)
          {
          this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo; 
          this.HoraProg = fitemz[0].HoraProg; }
          break;
       
        case "rtresAM":
              var fitemz = this.objCitasHoras.filter(function (f) {
                return f.RetiCuotHora == 3;
              });
              
              if (fitemz.length == 1)
              {
              this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo; 
              this.HoraProg = fitemz[0].HoraProg; }
              break;
        case "rcuatroAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 4;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rcincoAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 5;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rseisAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 6;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg; }
                break;
        case "rsieteAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 7;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rochoAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 8;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg; }
                break;
        case "rnueveAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 9;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rdiezAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 10;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "ronceAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 11;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rdoceAM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 12;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "runaPM":
                var fitemz = this.objCitasHoras.filter(function (f) {
                  return f.RetiCuotHora == 13;
                });
                
                if (fitemz.length == 1)
                {
                this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                this.HoraProg = fitemz[0].HoraProg;  }
                break;
        case "rdosPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 14;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rtresPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 15;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo; 
                  this.HoraProg = fitemz[0].HoraProg; }
                  break;  
        case "rcuatroPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 16;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo; 
                  this.HoraProg = fitemz[0].HoraProg; }
                  break;  
        case "rcincoPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 17;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rseisPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 18;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rsietePM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 19;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rochoPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 20;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rnuevePM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 21;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
         case "rdiezPM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 22;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "roncePM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 23;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg;  }
                  break;  
        case "rdocePM":
                  var fitemz = this.objCitasHoras.filter(function (f) {
                    return f.RetiCuotHora == 24;
                  });
                  
                  if (fitemz.length == 1)
                  {
                  this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
                  this.HoraProg = fitemz[0].HoraProg; }
                  break;  
        }

        
    localStorage.setItem("RetiCuotCodigo",this.RetiCuotCodigo.toString());

    
    }

    /*let chekeado = param.currentTarget.checked;

    swal("este es el evento");

    if (chekeado == true)
    {

    if(param.target.id == 23){

      var fitemz = this.objCitasHoras.filter(function (f) {
        return f.RetiCuotHora == 1;
      });
      
      if (fitemz.length == 1)
      {
      this.RetiCuotCodigo = fitemz[0].RetiCuotCodigo;
      }
    
     }
   }*/

    

  

 public setearFechasLimite(FechaInicio: string, FechaFin: string){
    let date = new Date();
    //this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    //this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    

    //let fechaini = "12/03/2020";

    var parts = FechaInicio.split("/")
    this.minDate =  new Date(Number(parts[2]), Number(parts[1])-1, Number(parts[0]));

    //let fechafin = "15/03/2020";
    var parts = FechaFin.split("/")

    this.maxDate =  new Date(Number(parts[2]), Number(parts[1])-1, Number(parts[0]));



  }

  
  public CargarGrilla(form: NgForm) {

  if (this.cerrado == true)
    { return;  }

  if (this.TieneData)
   {
     return;
   } 
   
  /*  this.SiCargoData = true;
   this.dtTrigger.next(this.objTemperaturaRPT);
   this.SetGrillaVisibility(true); */
   
 this.citaPermisoRqt = {
          Token : this.reportService.getToken(),
          IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
          TCarga : this.TipoCargaSelect ,
          Almacen : this.UnidadNegSelect,
          Registro : form.value.txtbox_Booking,
          Trasegado : this.Trasegado,
          TipoCita: this.TipoCitaSelect
 };

 this.MuestraCont = false;
 this.MuestraTabla = false;
 this.Registro = this.citaPermisoRqt.Registro;
 this.objCitasHoras = [];
 this.objCitasVDev = [];
 this.objCitasDetalles = [];
 this.MuestraProg = false;
 this.MuestraPalet = false;
 this.MuestraVacio = false;
   
    if(this.ValidarInput(this.citaPermisoRqt))
   {        
     swal({
           text: "Error en los campos de ingreso, por favor verificar",
           icon: "warning",
         });
     return;
   } 


   if (this.campo == "BK Oscar" || this.campo == "BL")
    {
   
    this.labelfecha = "F. Registro";

    this.dtOptions.columnDefs = [
    {
        "targets": [ 1 ],
        "visible": false
      },
    {
        "targets": [ 2 ],
        "visible": false
    },
    {
      "targets": [ 3 ],
      "visible": false
    },
    {
      "targets": [ 5 ],
      "visible": false
    },
    {
      "targets": [ 8 ],
      "visible": false
    }
    ];
    }
    else
    {
      this.labelfecha = "F. Numeración";

      this.dtOptions.columnDefs = [
        {
            "targets": [ 1 ],
            "visible": true
          },
        {
            "targets": [ 2 ],
            "visible": true
        },
        {
          "targets": [ 3 ],
          "visible": true
        },
        {
          "targets": [ 5 ],
          "visible": true
        },
        {
          "targets": [ 8 ],
          "visible": true
        }
        ];


    }
///Aun Falta obtener el servicio ///
    let res = this.reportService.getCitasPermiso(this.citaPermisoRqt);
    //console.log(this.objCartaTemperaturaRQT)
   
   res.subscribe( 
     data => { 
       this.objCitasPermisos = data.Data;
       console.log(data.Data);
       //swal( this.objCitasPermisos[0].CantContenedores.toString());  
       if (data.Data.length >= 1)
       {
            if (data.Data[0].Error == 1)
              {
                swal(data.Data[0].ErrorMsg.toString()); 
                this.objCitasPermisos = [];
                this.SiCargoData = true;

                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.destroy();
                  this.dtTrigger.next(this.objCitasPermisos);         
                });
                this.SetGrillaVisibility(false);

               /* this.dtElements.forEach((dtElement: DataTableDirective) => {
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
                });
                this.dtTrigger.next(this.objCitasPermisos);   */      
        
              //  this.SetGrillaVisibility(true);
                this.SetGrillaVisibilityDev(false); 
                this.SetGrillaVisibilityImpo(false);
                this.SetGrillaVisibilitySuelta(false);


                return false;
              }   
              else     
        {this.SiCargoData = true;
         
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
           dtInstance.destroy();
           this.dtTrigger.next(this.objCitasPermisos);
           this.myNroCont.setValue(this.objCitasPermisos[0].CantContenedores.toString());           
         });

       /* this.dtElements.forEach((dtElement: DataTableDirective) => {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
        });*/
        //this.dtTrigger.next(this.objCitasPermisos);         

        this.SetGrillaVisibility(true);
        this.SetGrillaVisibilityDev(false);
        this.SetGrillaVisibilityImpo(false);
        this.SetGrillaVisibilitySuelta(false);

        }
       }
       else
       {
         this.SiCargoData = true;
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
           dtInstance.destroy();
            this.dtTrigger.next(this.objCitasPermisos);
            this.SetGrillaVisibility(true);
            this.SetGrillaVisibilityDev(false);
            this.SetGrillaVisibilityImpo(false);
            this.SetGrillaVisibilitySuelta(false);
         });


        /*this.dtElements.forEach((dtElement: DataTableDirective) => {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
        });
        this.dtTrigger.next(this.objCitasPermisos);  */       

       

         swal("No existen datos");
       }
       //this.dtTrigger.unsubscribe();
     }, 
     error => {
       swal("Error al cargar los datos"); 
       console.log("Error : ", error); 
     }
   );  

 }

 public ValidarInput(param : CitaPermisoRQT) : boolean
 {
   var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
/*       if (this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta))
   {
     return true;
   } */
   //console.log(this.objCartaTemperaturaRQT.Desde);


   if(this.NullEmpty(param.TCarga)||this.citaPermisoRqt.TCarga == "")
   {
       this.citaPermisoRqt.TCarga = "";
   }

   if(this.NullEmpty(param.Almacen)||this.citaPermisoRqt.Almacen == "")
   {
       this.citaPermisoRqt.Almacen = "";
   }

   
   if(this.NullEmpty(param.Registro)||this.citaPermisoRqt.Registro == "")
   {
       this.citaPermisoRqt.Registro = "";
   }


   return false;
 }

 public NullEmpty (param:any) : boolean
 {
   return !(typeof param!='undefined' && param)
 }

 public SetGrillaVisibility(param:boolean)
 {
   if (param) {
     document.getElementById('grillacitas').style.visibility = "visible";
     document.getElementById('grillacitasdev').style.visibility = "visible";
    

   }
   else {
     document.getElementById('grillacitas').style.visibility = "hidden";     
     document.getElementById('grillacitasdev').style.visibility = "hidden";
   }
 }

 
 public SetGrillaVisibilityDev(param:boolean)
 {
   if (param) {
     document.getElementById('grillacitasdev').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillacitasdev').style.visibility = "hidden";
   }
 }

 public SetGrillaVisibilitySuelta(param:boolean)
 {
   if (param) {
     document.getElementById('grillacitassuelta').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillacitassuelta').style.visibility = "hidden";
   }
 }



 
 public SetGrillaVisibilityImpo(param:boolean)
 {
   if (param) {
     document.getElementById('grillacitasimpo').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillacitasimpo').style.visibility = "hidden";
   }
 }



 public SiTieneData(param :boolean)
 {
   this.TieneData = false;
 }

 getCitasConsultarFecha(): void {
  //void{
    this.citaCFechaRQT.Token =  this.reportService.getToken();
    this.citaCFechaRQT.IDRol =  Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    
    this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .getCitasConsultarFecha(this.citaCFechaRQT)
    .subscribe(
    data => {      
      this.citaCFechaRPT  = data;
      if (this.citaCFechaRPT != null)
      {                          
          //if (this.respSolic.Msj == "Ok")
          if (data.ErrMsg.toString() == "Validación Correcta...!!!")
          {
            this.setearFechasLimite(data.FInicio.toString(), data.FTermino.toString());
         
          }
          else
          { 
           //this.msjfinal = data[0].Msj.toString(); 
           swal({text : data.ErrMsg.toString()}); 
           //this.onClose();

          }
          // return 0;}
      } 
      else{
       //this.TokenCita = "";
      }                       
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );
   //  return "";
    }

 VisualizarHoras()
 {  
let resh = this.reportService.getCitasConsultarHoras(this.citaCHorasRqt);

resh.subscribe( 
  data => { 
    this.citachoras = data;
    
    if (data.Data.length >= 1)
    {
       this.objCitasHoras = data.Data;

       let date = new Date();
       var datePipe = new DatePipe("en-US");
       let fechaact = datePipe.transform(date.toString(), 'yyyy/MM/dd'); 
       let horaact = date.getHours();
       
       //if ( this.FechaSelec < fechaact.toString() )
      // {return false;}
       
       for (var i = 0; i <= this.objCitasHoras.length-1; i++) {
     
        let hora = this.objCitasHoras[i].RetiCuotHora;
        let deshora =  this.objCitasHoras[i].HoraProg;
        let cantdisp = this.objCitasHoras[i].CantidadDisponible;
        
      switch (hora) {
        case 1:
          this.unaAM = deshora.toString().toUpperCase();
          
          //if ((cantdisp <= 0) || (this.FechaSelec < fechaact.toString() && hora <= horaact))          
          if ((cantdisp <= 0) || (hora <= horaact))
          { document.getElementById('runaAM').setAttribute("disabled","disabled");
            document.getElementById('unaAM').style.color = "red";}
          else
          { document.getElementById('unaAM').style.color = "blue";}          
          break;

        case 2:
          this.dosAM = deshora.toString().toUpperCase();
          
          if ((cantdisp <= 0) || (hora <= horaact))
          { document.getElementById('dosAM').style.color = "red";
            document.getElementById('rdosAM').setAttribute("disabled","disabled");
          }
          else
          { document.getElementById('dosAM').style.color = "blue";}          
          break;
          
        case 3:
          this.tresAM = deshora.toString().toUpperCase();  
          if ((cantdisp <= 0) || (hora <= horaact))
          {
            document.getElementById('rtresAM').setAttribute("disabled","disabled");    
            document.getElementById('tresAM').style.color = "red";}
          else
          { document.getElementById('tresAM').style.color = "blue";}          
          break;
        
        case 4:
          this.cuatroAM = deshora.toString().toUpperCase();    
          if ((cantdisp <= 0) || (hora <= horaact))
          {  document.getElementById('rcuatroAM').setAttribute("disabled","disabled");
            document.getElementById('cuatroAM').style.color = "red";}
          else
          { document.getElementById('cuatroAM').style.color = "blue";}          
          break;
            
      
        case 5:
          this.cincoAM = deshora.toString().toUpperCase();          
          if ((cantdisp <= 0) || ( hora <= horaact))
          {  document.getElementById('rcincoAM').setAttribute("disabled","disabled");
            document.getElementById('cincoAM').style.color = "red";}
          else
          { document.getElementById('cincoAM').style.color = "blue";}          
          break;
          
      
        case 6:
          this.seisAM = deshora.toString().toUpperCase();      
          if ((cantdisp <= 0) || (hora <= horaact))
          {  document.getElementById('rseisAM').setAttribute("disabled","disabled");
            document.getElementById('seisAM').style.color = "red";}
          else
          { document.getElementById('seisAM').style.color = "blue";}          
          break;
          
          
        case 7:
          this.sieteAM = deshora.toString().toUpperCase();
          if ((cantdisp <= 0) || (hora <= horaact))
          {  document.getElementById('rsieteAM').setAttribute("disabled","disabled");
            document.getElementById('sieteAM').style.color = "red";}
          else
          { document.getElementById('sieteAM').style.color = "blue";}          
          break;
                
        case 8:   
         this.ochoAM = deshora.toString().toUpperCase();      
         if ((cantdisp <= 0) || (hora <= horaact))
          { document.getElementById('rochoAM').setAttribute("disabled","disabled");
             document.getElementById('ochoAM').style.color = "red";}
          else
          { document.getElementById('ochoAM').style.color = "blue";}          
          break;
          
        case 9:
          this.nueveAM = deshora.toString().toUpperCase();
          if ((cantdisp <= 0) || (hora <= horaact))
          { document.getElementById('rnueveAM').setAttribute("disabled","disabled");
             document.getElementById('nueveAM').style.color = "red";}
          else
          { document.getElementById('nueveAM').style.color = "blue";}          
          break;
               
        case 10:
          this.diezAM = deshora.toString().toUpperCase();      
          if ((cantdisp <= 0) || (hora <= horaact))
          { 
            document.getElementById('rdiezAM').setAttribute("disabled","disabled");
            document.getElementById('diezAM').style.color = "red";}
          else
          { document.getElementById('diezAM').style.color = "blue";}          
          break;
          
        case 11:
          this.onceAM = deshora.toString().toUpperCase();      
          if ((cantdisp <= 0) || (hora <= horaact))
          { 
            document.getElementById('ronceAM').setAttribute("disabled","disabled");
            document.getElementById('onceAM').style.color = "red";}
          else
          { document.getElementById('onceAM').style.color = "blue";}          
          break;
          
        case 12:    
        this.doceAM = deshora.toString().toUpperCase();
        if ((cantdisp <= 0) || (hora <= horaact))
          {  document.getElementById('rdoceAM').setAttribute("disabled","disabled");
            document.getElementById('doceAM').style.color = "red";}
          else
          { document.getElementById('doceAM').style.color = "blue";}          
          break;
                
        case 13:    
        this.unaPM = deshora.toString().toUpperCase();
        
        if ((cantdisp <= 0) || (hora <= horaact))
          { 
            document.getElementById('runaPM').setAttribute("disabled","disabled");
            document.getElementById('unaPM').style.color = "red";}
          else
          { document.getElementById('unaPM').style.color = "blue";}

        break;
        case 14:    
        this.dosPM = deshora.toString().toUpperCase();
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          
          document.getElementById('rdosPM').setAttribute("disabled","disabled");
          document.getElementById('dosPM').style.color = "red";}
        else
        { document.getElementById('dosPM').style.color = "blue";}

        
        break;
        case 15:    
        this.tresPM = deshora.toString().toUpperCase();      
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          document.getElementById('rtresPM').setAttribute("disabled","disabled");
          document.getElementById('tresPM').style.color = "red";}
        else
        { document.getElementById('tresPM').style.color = "blue";}

        break;
        case 16:    
        this.cuatroPM = deshora.toString().toUpperCase();      
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          document.getElementById('rcuatroPM').setAttribute("disabled","disabled");
          document.getElementById('cuatroPM').style.color = "red";}
        else
        { document.getElementById('cuatroPM').style.color = "blue";}

        break;
        case 17:    
        this.cincoPM = deshora.toString().toUpperCase();      
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          
          document.getElementById('rcincoPM').setAttribute("disabled","disabled");
          document.getElementById('cincoPM').style.color = "red";}
        else
        { document.getElementById('cincoPM').style.color = "blue";}

        break;
        case 18:    
        this.seisPM = deshora.toString().toUpperCase();
        if ((cantdisp <= 0) || (hora <= horaact))
        { 
          document.getElementById('rseisPM').setAttribute("disabled","disabled");
          document.getElementById('seisPM').style.color = "red";}
        else
        { document.getElementById('seisPM').style.color = "blue";}
    
        break;
        case 19:    
        this.sietePM = deshora.toString().toUpperCase();
        if ((cantdisp <= 0) || (hora <= horaact))
        { 
          
          document.getElementById('rsietePM').setAttribute("disabled","disabled");
          document.getElementById('sietePM').style.color = "red";}
        else
        { document.getElementById('sietePM').style.color = "blue";}
    
        break;
        case 20:    
        this.ochoPM = deshora.toString().toUpperCase();
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          
          document.getElementById('rochoPM').setAttribute("disabled","disabled");
          document.getElementById('ochoPM').style.color = "red";}
        else
        { document.getElementById('ochoPM').style.color = "blue";}
    
        break;          
        case 21:    
        this.nuevePM = deshora.toString().toUpperCase();      
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          document.getElementById('rnuevePM').setAttribute("disabled","disabled");
          document.getElementById('nuevePM').style.color = "red";}
        else
        { document.getElementById('nuevePM').style.color = "blue";}

        break;
        case 22:    
        this.diezPM = deshora.toString().toUpperCase();      
        if ((cantdisp <= 0) || ( hora <= horaact))
        { 
          document.getElementById('rdiezPM').setAttribute("disabled","disabled");
          document.getElementById('diezPM').style.color = "red";}
        else
        { document.getElementById('diezPM').style.color = "blue";}

        break;
        case 23:    
        this.oncePM = deshora.toString().toUpperCase();      
        if ((cantdisp <= -2) || ( hora <= horaact))
        { 
          document.getElementById('roncePM').setAttribute("disabled","disabled");
          document.getElementById('oncePM').style.color = "red";}
        else
        { document.getElementById('oncePM').style.color = "blue";}

        break;
        case 24:    
        this.docePM = deshora.toString().toUpperCase();
        if ((cantdisp <= -2) || ( hora <= horaact))
        { 
          document.getElementById('rdocePM').setAttribute("disabled","disabled");
          document.getElementById('docePM').style.color = "red";}
        else
        { document.getElementById('docePM').style.color = "blue";}
    
        break;

        default:
          console.log("No existe la hora!");
          break;
        }
      }
    }
    else
    {
     this.objCitasHoras = [];
      swal("No existen datos");
    }
    //this.dtTrigger.unsubscribe();
  }, 
  error => {
    swal("Error al cargar los datos"); 
    console.log("Error : ", error); 
  }
 );



 }

 
 EliminarDevolucion(Serie:string)
 {  
  var pos = this.objCitasVDev.map(function(e) { 
    return e.Serie; 
   }).indexOf(Serie); 


   this.objCitasVDev.splice(pos,1);  

   var poscit = this.objCitasDetalles.map(function(e) { 
    return e.Contenedor; 
   }).indexOf(Serie); 

   this.objCitasDetalles.splice(poscit,1);  
 
 }

 VisualizarContenedores(RPermiso:string, BL:string)
 {
   this.MuestraCont = true;
   
 this.citaContenedorRqt = {
  Token : this.reportService.getToken(),
  IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
  TCarga : this.TipoCargaSelect ,
  Almacen : this.UnidadNegSelect,
  Permiso : RPermiso,
  Trasegado : this.Trasegado
};


let res = this.reportService.getCitasLContenedores(this.citaContenedorRqt);
//console.log(this.objCartaTemperaturaRQT)


if (this.TipoCitaSelect == "02")
{   
  this.MuestraProg = false;
}
else
{   
  this.MuestraProg = true;
}

if (this.TipoCargaSelect == "002")
{
  this.MuestraPalet = true;
  this.MuestraVacio = true;
  
}
else
{
 this.MuestraPalet = false;
 this.MuestraVacio = false;
  
}

res.subscribe( 
 data => { 
   this.citasContenedor = data;
   console.log(data);
   if (data.Data.length >= 1)
   {
      this.objCitasContenedor = data.Data;
      this.selectedOptions = [];

      if (this.TipoCitaSelect == "01")
      {this.MuestraCantCTN = false;}
 
      
     if (this.TipoCitaSelect == "02")
     {this.MuestraCantCTN = true;}

     
     if (this.TipoCargaSelect == "002")
     {this.MuestraCantCTN = false;}

     this.getCitasConsultarFecha();

       
   }
   else
   {
    this.objCitasContenedor = [];
     swal("No existen datos");
   }
   //this.dtTrigger.unsubscribe();
 }, 
 error => {
   swal("Error al cargar los datos"); 
   console.log("Error : ", error); 
 }
);

 





 }

  

    
  
  onClose(){

    this.cerrado = true;


    this.dialogRef.close();
  }

 

 

  

  

  
      
  

  solo_letras(val)
  {
    var k = val.keyCode;
    var res = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 );
    return res
  }

  solo_numerostelf(val)
  {
    var k = val.keyCode;
    var res = (k == 45 || k == 8 || k == 32 || (k >= 48 && k <= 57));
    return res
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}