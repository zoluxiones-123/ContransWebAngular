
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
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { Subject, fromEventPattern } from 'rxjs';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio, TipoCarga, TiposCarga, Almacenes, Almacen, AlmacenRQT, TipoCita,TiposCita } from '../../models/Factura';
import { CitasRPT, CitasRQT, Citas, TokenCitaRPT, TokenCitaRQT, ActCitaRPT, ActCitaRQT, ValidarTokenCitaRQT, 
ValidarTokenCitaRPT, ActTokenCitaRPT, AnularCitaRPT, AnularCitaRQT, ActTokenCitaRQT, ImpriCitaRPT, ImpriCitaRQT,
CitaPermisoRPT, CitaPermisoRQT, CitasPermiso, CitaLContenedorRPT, CitaLContenedorRQT, CitasContenedor,
CitasCFechaRQT, CitasCFechaRPT } from '../../models/Cita';
import swal from 'sweetalert';

@Component({
  selector: 'app-generarcita',
  templateUrl: './generarcita.component.html',
  styleUrls: ['./generarcita.component.css']
})


export class GenerarcitaComponent implements AfterViewInit, OnDestroy, OnInit {

  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  registerForm: FormGroup;
  submitted = false;
  cerrado = false;
  
  public SiCargoData = true;
  public Trasegado = false;
  public MuestraTipoCita = false;
  public MuestraCont = false;
  public MuestraCantCTN = false;
  public ServExt : string = "";
  public ServExtra : string = "";
  
  

  myControl = new FormControl();
  
  
  constructor(
  private reportService: ReportService, 
  private router: Router, 
  public dialogRef : MatDialogRef<GenerarcitaComponent>, 
  @Inject(MAT_DIALOG_DATA) public data:any,
  private location: Location,
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
  
  
  public campo : string = "Registro";
  public labelfecha : string = "";


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
    
  private citaContenedorRqt: CitaLContenedorRQT = {
    Token : "",
    IDRol : 0,
    TCarga : "",
    Almacen : "",
    Permiso : "",
    Trasegado : false
    };

    
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
      lengthMenu: "Mostrar _MENU_ registros" ,
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
    
   this.NroCita = localStorage.getItem("NroCita").toString();

   this.SetGrillaVisibility(false);

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
       let listaent =JSON.parse(JSON.stringify(this.TiposCitaE.Data));              
      
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

 

  public ChangingValue(param : any)
  {
    this.TipoCargaSelect = param.target.value;
    this.objAlmacenRqt.EmpaCodigo = this.TipoCargaSelect;
    
    this.ListaAlmacenes = new Array;

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
     {this.MuestraTipoCita = true;
      this.campo = "BL"}

     if (this.UnidadNegSelect == "01")
     {this.MuestraTipoCita = false;
      this.campo = "Registro";}
  }

  
  public ChangingValueTC(param : any)
  {
    this.TipoCitaSelect = param.target.value;

    if (this.TipoCitaSelect == "01")
     {this.campo = "BL";     
   
     }

     
    if (this.TipoCitaSelect == "02")
    {this.campo = "BK Oscar";
  
    }


  }

  
  public Checked(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.Trasegado = chekeado;

   
  }

  
  onItemChangeCP(param :any){

    if(param.target.id == "SMS"){
     // this.RecObj.TipEnvio = "S";
    }
    else if(param.target.id == "Correo"){
     // this.RecObj.TipEnvio = "M";
    }
  }

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
                return false;
              }   
              else     
        {this.SiCargoData = true;
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
           dtInstance.destroy();
           this.dtTrigger.next(this.objCitasPermisos);         
         });
         this.SetGrillaVisibility(true);
        }
       }
       else
       {
         this.SiCargoData = true;
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
           dtInstance.destroy();
            this.dtTrigger.next(this.objCitasPermisos);
            this.SetGrillaVisibility(true);
         });
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
   }
   else {
     document.getElementById('grillacitas').style.visibility = "hidden";
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

res.subscribe( 
 data => { 
   this.citasContenedor = data;
   console.log(data);
   if (data.Data.length >= 1)
   {
      this.objCitasContenedor = data.Data;

      if (this.TipoCitaSelect == "01")
      {this.MuestraCantCTN = false;}
 
      
     if (this.TipoCitaSelect == "02")
     {this.MuestraCantCTN = true;}

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