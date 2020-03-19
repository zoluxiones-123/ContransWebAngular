
import { TipoContenedor, TipoContenedores, CitaVacioAsig } from 'app/models/Cita';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import {map, startWith} from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import swal from 'sweetalert2';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { Subject, fromEventPattern } from 'rxjs';
import { CitasRPT, CitasRQT, Citas, TokenCitaRPT, TokenCitaRQT, ActCitaRPT, ActCitaRQT, ValidarTokenCitaRQT, 
  ValidarTokenCitaRPT, ActTokenCitaRPT, AnularCitaRPT, AnularCitaRQT, ActTokenCitaRQT, ImpriCitaRPT, ImpriCitaRQT,
  CitaPermisoRPT, CitaPermisoRQT, CitasPermiso, CitaLContenedorRPT, CitaLContenedorRQT, CitasContenedor,
  CitasCFechaRQT, CitasCFechaRPT, CitasCHoras, CitasCHorasRQT, CitasCHorasRPT, InsertarCitaRPT, InsertarCitaRQT,
  InsertarCitaDetalleRPT, InsertarCitaDetalleRQT } from '../../models/Cita';
  

@Component({
  selector: 'app-citavacioasig',
  templateUrl: './citavacioasig.component.html',
  styleUrls: ['./citavacioasig.component.css']
})
export class CitavacioasigComponent implements AfterViewInit, OnDestroy, OnInit {

  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  constructor(
    private reportService: ReportService, 
    public dialogRef : MatDialogRef<CitavacioasigComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) {    
   }

  
  public ListaTiposCont : Array<TipoContenedor> = [];
  public TiposCont : TipoContenedores;
 
  
  public objCitasVAsig = [];
  public objCitasDetalles = [];

  
  public isError = false;
  public EntidadSelect:string = "";
  public NEntidadSelect:string = "";
  //public TokenCita : string = "";
  public msjfinal:string = "";
  public NroCita : string = "";
  public TituloCita : string = "";
  public SubTituloCita : string = "";
  public MuestraImp : boolean = true;
  public TipoContSelect :  string = "";
  public TipoCitaSelect :  string = "";
  public UnidadNegSelect : string = "";

  public Empaque : string = "";
  public UnidadNegocio : string = "";
  public TipoCita : string = "";
  public Trasegado : string = "";
  public Paletizada : number;
  public Extemp : number;
  public Extra : number;
  public RetiCuotCodigo : string = "";
  public IDRol : number;
  public Token : string = "";
  public PermCodigo : string = "";
  public Registro : string = ""; 
  public Placa : string = "";
  public Brevete : string = "";
  public TipoContenedor : string = "";
  
  

  public LCitasPermiso : any;

  
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

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
  }

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
    
    let num = Number.parseInt(localStorage.getItem("CantContenedores").toString());
    
    
    this.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.Token = this.reportService.getToken();

    this.LCitasPermiso = JSON.parse(localStorage.getItem("CitasPermiso"));

    this.Registro = this.LCitasPermiso[0].BL.toString();
    
    this.PermCodigo =  this.LCitasPermiso[0].PermCodigo.toString(); 
    
    this.InsertarCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.InsertarCitaRqt.Token = this.reportService.getToken();

    
    this.RetiCuotCodigo =  localStorage.getItem("RetiCuotCodigo").toString();
    
    this.Empaque = localStorage.getItem("Empaque").toString();
    this.UnidadNegocio  = localStorage.getItem("UnidadNegocio").toString();
    this.TipoCita  = localStorage.getItem("TipoCita").toString();
    this.Trasegado  = localStorage.getItem("Trasegado").toString();

    this.Paletizada = Number.parseInt(localStorage.getItem("Paletizada").toString());    
    this.Extemp = Number.parseInt(localStorage.getItem("Extemp").toString());
    this.Extra = Number.parseInt(localStorage.getItem("Extra").toString());  
    
    
    let traseg;

    if (this.Trasegado == "1")
    {traseg = true}
    else
    {traseg = false}

    this.objCitasVAsig = [];
    
    for (var i = 0; i <= num-1; i++) {
      
      let citavasig = new CitaVacioAsig((i + 1), "","","" );

      this.objCitasVAsig.push(citavasig);

      let citadetalle = new InsertarCitaDetalleRQT(this.Token,this.IDRol, "", this.PermCodigo,"", "000000", "","", this.Registro,
      "",0,0,0,0, this.Empaque,this.UnidadNegocio, this.TipoCita, "", traseg);

      this.objCitasDetalles.push(citadetalle);
  
    }

    this.reportService
    .getTipoContenedor()
    .subscribe(
    data => {
      
      this.TiposCont = data;

      if (this.TiposCont.Data != null)      
      {                              
        this.ListaTiposCont = data.Data;
      
      }
      else{  
        this.onIsError();   
      }
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.objCitasVAsig);         
    });
    this.SetGrillaVisibility(true);

  }
  
  
 public SetGrillaVisibility(param:boolean)
 {
   if (param) {
     document.getElementById('grillacitavasig').style.visibility = "visible";
   }
   else {
     document.getElementById('grillacitavasig').style.visibility = "hidden";
   }
 }

  public ChangingValue(param : any)
  {
    this.TipoContSelect = param.target.value;
    swal(this.TipoContSelect.toString());
   
  }

  public GrabarCita()
  {
    
    let traseg;

    if (this.Trasegado == "1")
    {traseg = true}
    else
    {traseg = false}

    this.InsertarCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.InsertarCitaRqt.Token = this.reportService.getToken();
    this.InsertarCitaRqt.RegiCodigo = this.LCitasPermiso[0].BL.toString();
    this.InsertarCitaRqt.RetiCuotProgCodigo = this.RetiCuotCodigo;
    this.InsertarCitaRqt.PermCodigo =  this.LCitasPermiso[0].PermCodigo.toString();    
    this.InsertarCitaRqt.Empaque =  this.Empaque;    
    this.InsertarCitaRqt.UnidadNeg = this.UnidadNegocio;    
    this.InsertarCitaRqt.TipoCita = this.TipoCita;    
    this.InsertarCitaRqt.Trasegado = traseg;

    this.InsertarCitaRqt.Extra = this.Extra;
    this.InsertarCitaRqt.Extemp = this.Extemp;
    this.InsertarCitaRqt.Paletizada = this.Paletizada;
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

      this.objCitasDetalles[i].VehiPlacaPri = this.objCitasVAsig[i].Placa; 
      this.objCitasDetalles[i].NroBrevete = this.objCitasVAsig[i].Brevete; 
      this.objCitasDetalles[i].TipoCont =  this.objCitasVAsig[i].TipoCont;
  
    }
    
    
    
    
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

        this.GrabarCitaDetalle();

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

  GrabarCitaDetalle()
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
  
      this.Cerrar();      
      swal("Se inserto la cita " +  codcita + " correctamente");


    }


  }

  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  
  Cerrar(){

   // this.cerrado = true;
   
  this.Empaque = "";
  this.UnidadNegocio = "";
  this.TipoCita = "";
  this.Trasegado = "";
  this.Paletizada = 0;
  this.Extemp = 0;
  this.Extra = 0;
  this.RetiCuotCodigo = "";
  this.IDRol = 0;
  this.Token  = "";
  this.PermCodigo  = "";
  this.Registro  = ""; 
  this.Placa  = "";
  this.Brevete  = "";
  this.TipoContenedor = "";
    
  this.dialogRef.close();
  }


}
