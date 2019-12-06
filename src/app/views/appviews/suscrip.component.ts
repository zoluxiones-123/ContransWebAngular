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
import swal from 'sweetalert';

@Component({
  selector: 'app-suscrip',
  templateUrl: './suscrip.component.html'
  //styleUrls: ['./suscrip.component.css']
})

export class SuscripComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
  private reportService: ReportService, 
  private router: Router, 
  public dialogRef : MatDialogRef<SuscripComponent>, 
  @Inject(MAT_DIALOG_DATA) public data:any,
  private location: Location,
  private fb: FormBuilder,
  private formBuilder: FormBuilder 
  ) { }
  
  filteredUsers: entid[] = [];
  usersForm: FormGroup;
  isLoading = false;

  myControl = new FormControl();
  
  filteredOptions: Observable<string[]>;
  public isError = false;
  
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];

  private solicIns: SolicitudInscrip = {
    NombreSolicitud: "",
    ApellidoSolicitud: "",
    CargoSolicitud: "",
    NroDocSolicitud: "",
    TelefonoSolicitud: "",
    CelularSolicitud: "",
    EmailSolicitud: "",
    EntiCodigo: "",
    Entidad: ""
  };

  private respSolic: RespSolicitud = {
    Cod: 0,
    Msj: ""
  };
  
 
  updateEmail()
  {
    //this.email.setValue('test@testdomain.com');
  }

  onSubmit()
  {
  }

  
  
  ngOnInit() {


    this.usersForm = this.fb.group({
      userInput: null
    })

      this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.reportService.search({nombre: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.Data);

      //console.log("Filtered" + this.filteredUsers.length.toString());
      
  //  this.filteredOptions = this.myControl.valueChanges
  //  .pipe(
  //    startWith(''),
  //    map(value => this._filter(value))
 //   );

    this.ListaEntidades = new Array

    this.reportService
    .getListaEntidades()
    .subscribe(
      data => {
        
        this.LEntidades = data;
  
        if (this.LEntidades.Data != null)
        {                          
          //localStorage.setItem("ListaEntidades",JSON.stringify(this.LEntidades.Data));      
          let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));
                
          //JSON.parse(localStorage.getItem("ListaEntidades"));
         
          for (var i = 0; i <= listaent.length-1; i++) {
            let last = listaent[i];            
            this.ListaEntidades.push(last);
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

  }

  f() 
  { return this.registerForm.controls; }

  displayFn(user: entid) {
    if (user) { return user.Nombre; }
  }

  
  onClose(){
    this.dialogRef.close();
  }

  public RegistrarSusc(form: NgForm)
  {
    
    interface MyObj {
      Entidad: string;
      Nombre: string;
    }
  
    let obj: MyObj = JSON.parse(JSON.stringify(this.usersForm.get('userInput').value));
    
    this.solicIns.Entidad = obj.Nombre;
    //form.value.txtbox_razonSocial;
    this.solicIns.EntiCodigo =  obj.Entidad;
    //form.value.txtbox_razonSocial;
    this.solicIns.NombreSolicitud = form.value.txtbox_nombres;
    this.solicIns.ApellidoSolicitud = form.value.txtbox_apellidos;  
    this.solicIns.CargoSolicitud = form.value.txtbox_cargo;
    this.solicIns.NroDocSolicitud = form.value.txtbox_docIdentidad;
    this.solicIns.TelefonoSolicitud = form.value.txtbox_telefono;
    this.solicIns.CelularSolicitud =  form.value.txtbox_celular;
    this.solicIns.EmailSolicitud =  form.value.txtbox_correo;
        
    if (this.solicIns.NombreSolicitud != null && this.solicIns.ApellidoSolicitud != null)
    {this.registrarSuscripcion();
    swal({text :"Se ha registrado la suscripción correctamente", icon:"success"});  
    this.dialogRef.close();
    } 
        
  }

  registrarSuscripcion():void{

    //Reporte Eri...............//
    this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .SolicitudInsc(this.solicIns)
    .subscribe(
    data => {      
      this.respSolic = data;
      if (this.respSolic != null)
      {
                        
          if (this.respSolic.Msj == "Ok")
          {
            console.warn("Usuario Registrado Correctamente")
          }
      }
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }                       
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

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
