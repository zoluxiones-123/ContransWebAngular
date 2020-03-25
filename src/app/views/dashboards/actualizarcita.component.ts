import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SolicitudInscrip } from '../../models/solicinsc';
import { RespSolicitud } from '../../models/resp_solicinsc';
import { ReportService } from '../../services/report.service';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { CitasRPT, CitasRQT, Citas, TokenCitaRPT, TokenCitaRQT, ActCitaRPT, ActCitaRQT, ValidarTokenCitaRQT, 
ValidarTokenCitaRPT, ActTokenCitaRPT, AnularCitaRPT, AnularCitaRQT, ActTokenCitaRQT, ImpriCitaRPT, ImpriCitaRQT} from '../../models/Cita';
import { Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse } 
from '../../services/usuario/Usuario';
import "rxjs/add/operator/toPromise";

import swal from 'sweetalert';

@Component({
  selector: 'app-actualizarcita',
  templateUrl: './actualizarcita.component.html',
  styleUrls: ['./actualizarcita.component.css']
})

export class ActualizarcitaComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  cerrado = false;

  myControl = new FormControl();
  myPlaca = new FormControl();
  myBrevete = new FormControl();
  myMotivo = new FormControl();
  
  
  constructor(
  private reportService: ReportService, 
  private router: Router, 
  private usuario: Usuario,
  public dialogRef : MatDialogRef<ActualizarcitaComponent>, 
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
  public OperacionCita : string = "";
  public myToken : string = "";
  public MuestraMotivo : boolean = false;
  public MuestraImp : boolean = true;
  
  public ValTokenCita : boolean = false;
  public clicked : boolean = false;
  public NoGrabarAun : boolean = false;
  
  
  public telefono : string;
  public celular : string;
  public correo : string;
    
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];

  private tokenCitaRqt: TokenCitaRQT = {
    Token : "",
    IDRol : 0,
    Tipo : "",
    Descripcion : "",
    Operacion : "",
    Cita: ""
     };

  private usuariorqt : UsuarioRequest = { 
      IDUSer : 0,
      Cargo : "",
      Telefono : "",
      Celular : "",
      Email : "",
      RolEmpUsuaCodigoDefault : 0
    }

  private actCitaRqt: ActCitaRQT = {
    Token: "",
    IDRol: 0,
    HojaservCodigo: "",
    Placa: "",
    Brevete: ""
   
  };

  private anulaCitaRqt: AnularCitaRQT = {
    Token: "",
    IDRol: 0,
    HojaservCodigo: "",
    Motivo: ""   
  };

  
  private anulaCitaRpt: AnularCitaRPT = {
    Cod: -1,
    Msj: ""
  };


  private valCitaRqt: ValidarTokenCitaRQT = {
    Token: "",
    IDRol: 0,
    Operacion: "",
    Cita:  "",
    TokenCita:  ""    
  };

  

  private impCitaRqt: ImpriCitaRQT = {

    Token:  "",
    IDRol: 0,
    TCarga:  "",
    Almacen: "",
    NroCita: "" ,
    Documento:  "",
    Registro:  "",
    Permiso:   "",
    Desde:  "",
    Hasta:  ""
  };

  private impCitaRpt: ImpriCitaRPT = {
    
    Data:  "",
    };

  
  private actTokenCitaRqt: ActTokenCitaRQT = {
    Token: "",
    IDRol: 0,
    TokenCita:  ""    
  };
  
  private actTokenCitaRpt: ActTokenCitaRPT = {
    Cod: -1,
    Msj: ""
  };


  private resptokenCita: TokenCitaRPT = {
    Cod: 0,
    Msj: ""
  };

  
  private valCitaRpt: ValidarTokenCitaRPT = {
    Cod: -1,
    Msj: ""
  };

  
  private respActCita: ActCitaRPT = {
    Cod: -1,
    Msj: ""
  };
  
 
  
  onSubmit()
  {

  }

  
  
  ngOnInit() {
    
   this.NroCita = localStorage.getItem("NroCita").toString();

   this.usuariorqt.IDUSer =  Number.parseInt(localStorage.getItem("Usuario"));

   this.OperacionCita = localStorage.getItem("OperacionCita").toString();

  if (this.OperacionCita == "AnularCita")
      {this.MuestraMotivo = true;
       this.TituloCita = "Anular Cita";
       this.SubTituloCita = "Anular Nro Cita: "
      }

  if (this.OperacionCita == "ActCita")
       {this.MuestraMotivo = false;
        this.TituloCita = "Actualizar Cita";
        this.SubTituloCita = "Actualizar Placa y Brevete Nro Cita: "}

  if (this.OperacionCita == "ImprimirCita")
  { this.MuestraMotivo = false;
    this.MuestraImp = false;
    this.TituloCita = "Imprimir Cita";
    this.SubTituloCita = "Imprimir Nro Cita: "}
 

   this.CargarDatosUsuario(this.usuariorqt);

    
  
  
  }

  public CargarDatosUsuario(param: UsuarioRequest) {
    this.usuario.obtUsuario(param).subscribe( 
      data => { 
        var resp : UsuarioResponse;
        resp = data;
    
        this.telefono = resp.UsuaTelf;
        this.celular = resp.UsuaCelular;
        this.correo = resp.UsuaEmail;
        
      }, 
      error => {
        swal("Error al cargar los datos del usuario"); 
        console.log("Error : ", error); 
      });
  }

  
  onItemChange(param :any){

    if(param.target.id == "SMS"){
      this.tokenCitaRqt.Tipo = "S";
      this.tokenCitaRqt.Descripcion = this.celular ;
      
    }
    else if(param.target.id == "E-MAIL"){
      this.tokenCitaRqt.Tipo = "E";      
      this.tokenCitaRqt.Descripcion = this.correo;
      
    }
  }

  
  public ChangingValue(param : any)
    {
      var codenti = param.option.value.toString().split(",");
      var codentif = codenti[0].toString();
      
      //this.EntidadSelect = param.option.value;
      this.EntidadSelect = codentif;      
      this.NEntidadSelect = param.option.viewValue;
      let enti = this.EntidadSelect;
    }

    GenerarTokenCita()
    {

      if (this.tokenCitaRqt.Tipo == "")
      {
        {swal({text :"Debe seleccionar el Tipo de Envio: SMS o EMAIL"})}
        return;
      }

      this.tokenCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
      this.tokenCitaRqt.Cita = localStorage.getItem("NroCita").toString();
      this.tokenCitaRqt.Token = this.reportService.getToken();
    

      
     if (this.OperacionCita == "ActCita")
        { this.tokenCitaRqt.Operacion = "Update Cita";}
      
        
     if (this.OperacionCita == "AnularCita")
     { this.tokenCitaRqt.Operacion = "Delete Cita";}

     if (this.OperacionCita == "ImprimirCita")
     { this.tokenCitaRqt.Operacion = "Print Cita";}

      //this.cerrado = true;

      this.generarToken();

     // this.cerrado = false;


    }

  /*  public VistaPreviaPDF(paramIdCT:string, paramNombre:string){
      this.reportService.ImprimirPDF(Number.parseInt(localStorage.getItem("Usuario")),
      paramIdCT,Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"))).subscribe(
        data => {
          
          const linkSource = 'data:application/pdf;base64,' + data;
          const downloadLink = document.createElement("a");
          const fileName = paramNombre + ".pdf";
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
  
        }, (error)=> console.log("Salio error en la descarga: ", error));
    }*/
  
  onClose(){

    this.tokenCitaRqt.Token = null;
    //form.value.txtbox_razonSocial;
    this.tokenCitaRqt.IDRol = null;
    //form.value.txtbox_razonSocial;
    this.tokenCitaRqt.Cita = null;

    this.actCitaRqt.IDRol = null;
    this.actCitaRqt.Token = null;
    this.actCitaRqt.Placa = null;
    this.actCitaRqt.Brevete = null;
    this.actCitaRqt.HojaservCodigo = null;

    this.valCitaRqt.Cita = null;
    this.valCitaRqt.IDRol = null;
    this.valCitaRqt.Operacion = null;
    this.valCitaRqt.Token = null;
    this.valCitaRqt.TokenCita = null;


    this.actTokenCitaRqt.IDRol = null;
    this.actTokenCitaRqt.Token = null;
    this.actTokenCitaRqt.TokenCita = null;
    
    
  //  this.cerrado = true;


    this.dialogRef.close();
  }

  public ActualizarCita(form: NgForm)
  {


   /* if (this.NoGrabarAun == true)
    { return;  }

    if (this.cerrado == true)
    { return;  }*/

    //this.myControl.setValue(this.myToken);

    if (this.OperacionCita == "ActCita")
    {
    if (this.myBrevete.value.toString() == "" || this.myPlaca.value.toString() == "" || this.myControl.value.toString() == "")   
    {swal({text :"Debe ingresar todos los campos obligatorios"});
    return;}
    }

    if (this.OperacionCita == "AnularCita")
    {
    if (this.myMotivo.value.toString() == "" || this.myControl.value.toString() == "")   
    {swal({text :"Debe ingresar todos los campos obligatorios"});
    return;}
    }

    
    if (this.OperacionCita == "ImprimirCita")
    {
    if (this.myControl.value.toString() == "")   
    {swal({text :"Debe ingresar todos los campos obligatorios"});
    return;}
    }

    this.tokenCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.tokenCitaRqt.Cita = localStorage.getItem("NroCita").toString();
    this.tokenCitaRqt.Token = this.reportService.getToken();
  

    this.valCitaRqt.Token = this.tokenCitaRqt.Token;
    this.valCitaRqt.IDRol = this.tokenCitaRqt.IDRol;
    this.valCitaRqt.Operacion = this.tokenCitaRqt.Operacion;
    this.valCitaRqt.Cita = this.tokenCitaRqt.Cita;
    this.valCitaRqt.TokenCita = this.myControl.value.toString();
    
    if (this.OperacionCita == "ActCita")
    {
    this.actCitaRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.actCitaRqt.Token = this.tokenCitaRqt.Token;
    this.actCitaRqt.HojaservCodigo = localStorage.getItem("NroCita").toString();
    this.actCitaRqt.Placa = this.myPlaca.value.toString();
    this.actCitaRqt.Brevete =  this.myBrevete.value.toString();
    }

    if (this.OperacionCita == "ImprimirCita")
    {
  
    this.impCitaRqt.IDRol =  Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.impCitaRqt.Token = this.tokenCitaRqt.Token;
    this.impCitaRqt.TCarga = localStorage.getItem("TCarga").toString();
    this.impCitaRqt.Almacen = localStorage.getItem("TAlmacen").toString();    
    this.impCitaRqt.NroCita =  localStorage.getItem("NroCita").toString();
    this.impCitaRqt.Documento =  localStorage.getItem("Documento").toString();
    this.impCitaRqt.Registro =  localStorage.getItem("Registro").toString();
    this.impCitaRqt.Permiso =  localStorage.getItem("Permiso").toString();

    }

    this.actTokenCitaRqt.IDRol = this.valCitaRqt.IDRol;
    this.actTokenCitaRqt.Token = this.valCitaRqt.Token
    this.actTokenCitaRqt.TokenCita = this.valCitaRqt.TokenCita;

    //Parametros para anular una cita, de ser el caso//
    
    if (this.OperacionCita == "AnularCita")
    {
    this.anulaCitaRqt.IDRol = this.valCitaRqt.IDRol;
    this.anulaCitaRqt.HojaservCodigo = this.tokenCitaRqt.Cita;
    this.anulaCitaRqt.Motivo = this.myMotivo.value.toString();
    this.anulaCitaRqt.Token =  this.tokenCitaRqt.Token;
    }
      
    this.validarToken();

    //this.cerrado = true;
    
      
  }

  generarToken(): void {
    //void{
  
      //Reporte Eri...............//
      this.reportService
      //.loginuser(this.user.Usuario, this.user.Password)
      .generarTokenCita(this.tokenCitaRqt)
      .subscribe(
      data => {      
        this.resptokenCita  = data;
        if (this.resptokenCita != null)
        {                          
            //if (this.respSolic.Msj == "Ok")
            if (data.Cod != 1)
            {
              console.log(data.Msj);
              let TokenCita = data.Msj.toString();
              swal({text : "Se genero correctamente el Token"});
              //this.NoGrabarAun = true;

              this.myControl.setValue(TokenCita);
              this.myControl.disable(); 
              
              //this.myControl = undefined;
             
             //this.myToken = TokenCita;
          

            }
            else
            { 

             let TokenCita = data.Msj.toString();

             this.myControl.setValue(TokenCita);
            }
        } 
        else{
        }                       
      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );
     //  return "";
      }

  validarToken(): void {
        //void{
          this.reportService
          //.loginuser(this.user.Usuario, this.user.Password)
          .validarTokenCita(this.valCitaRqt)
          .subscribe(
          data => {      
            this.valCitaRpt  = data;
            if (this.valCitaRpt != null)
            {                          
                //if (this.respSolic.Msj == "Ok")
                if (data.Msj == "Ok")
                {
                  console.log(data.Msj);
                  this.ValTokenCita = true;

                  if (this.valCitaRqt.Operacion == "Update Cita")
                  {this.GrabarCita();}

                  if (this.valCitaRqt.Operacion == "Delete Cita")
                  {this.AnularCita();}
                  
                  
                  if (this.valCitaRqt.Operacion == "Print Cita")
                  {this.ImprimirCita();}
  
    
                }
                else
                { 

                 //swal({text :"El Token ya no es valido. Generar otro."});
                 swal({text : data.Msj.toString()});
                 return;
               
                }
            } 
            else{
            }                       
          },  
          error => {
            this.onIsError();           
            console.log("Error");}
          );
         //  return "";
          }

  actualizarToken(): void {
            //void{
              this.reportService
              //.loginuser(this.user.Usuario, this.user.Password)
              .actualizarTokenCita(this.actTokenCitaRqt)
              .subscribe(
              data => {      
                this.actTokenCitaRpt  = data;
                if (this.actTokenCitaRpt != null)
                {                          
                    //if (this.respSolic.Msj == "Ok")
                    if (data.Msj == "Ok")
                    {
                      console.log(data.Msj);
                      this.onClose();     
        
                    }
                    else
                    { 
                     //this.msjfinal = data[0].Msj.toString(); 
                     swal({text : data.Msj.toString()}); 
                     this.onClose();

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

  GrabarCita(): void {
        //void{
      
          //Reporte Eri...............//
          this.reportService
          //.loginuser(this.user.Usuario, this.user.Password)
          .ActualizarCita(this.actCitaRqt)
          .subscribe(
          data => {      
            this.respActCita  = data[0];
            if (this.respActCita != null)
            {                          
                //if (this.respSolic.Msj == "Ok")
                if (data[0].Cod == 0)
                {
                  console.log(data[0].Msj);
                  swal({text : data[0].Msj.toString()}); 
                  this.actualizarToken(); 
                                                 
    
                }
                else
                { 
                 //this.msjfinal = data[0].Msj.toString(); 
                 //swal({text : this.msjfinal.toString()});
                 
                 swal({text : data[0].Msj.toString()});               
    
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
      
         ImprimirCita(): void {
            //void{
          
              //Reporte Eri...............//
              this.reportService
              //.loginuser(this.user.Usuario, this.user.Password)
              .ImprimirCita(this.impCitaRqt)
              .subscribe(
              data => {      
                this.impCitaRpt  = data;
                if (this.impCitaRpt != null)
                {                          
                    //if (this.respSolic.Msj == "Ok")
                    if (data != "")
                    {
                      console.log(data);
                      //swal({text : data[0].Msj.toString()}); 
                                                
                            const linkSource = 'data:application/pdf;base64,' + data;
                            const downloadLink = document.createElement("a");
                            const fileName = this.NroCita + ".pdf";
                    
                            downloadLink.href = linkSource;
                            downloadLink.download = fileName;
                            downloadLink.click();
                    
                      


                      this.actualizarToken(); 
                                                     
        
                    }
                    else
                    { 
                     //this.msjfinal = data[0].Msj.toString(); 
                     //swal({text : this.msjfinal.toString()});
                     
                     swal({text : data[0].Msj.toString()});               
        
                    }
                    // return 0;}
                } 
                else{
                 //this.TokenCita = "";
                }                       
              },  
              error => {
                this.onIsError();
                swal(error.toString());           
                console.log("Error");}
              );
             //  return "";
              }
  
              AnularCita(): void {
                //void{
              
                  //Reporte Eri...............//
                  this.reportService
                  //.loginuser(this.user.Usuario, this.user.Password)
                  .AnularCita(this.anulaCitaRqt)
                  .subscribe(
                  data => {      
                    this.anulaCitaRpt  = data[0];
                    if (this.anulaCitaRpt != null)
                    {                          
                        //if (this.respSolic.Msj == "Ok")
                        if (data[0].Cod == 0)
                        {
                          console.log(data[0].Msj);
                          swal({text : data[0].Msj.toString()}); 
                          this.actualizarToken(); 
                                                         
            
                        }
                        else
                        { 
                         //this.msjfinal = data[0].Msj.toString(); 
                         //swal({text : this.msjfinal.toString()});
                         
                         swal({text : data[0].Msj.toString()});               
            
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
