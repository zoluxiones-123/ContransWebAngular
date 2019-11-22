import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SolicitudInscrip } from '../../models/solicinsc';
import { RespSolicitud } from '../../models/resp_solicinsc';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';

@Component({
  selector: 'app-suscrip',
  templateUrl: './suscrip.component.html',
  styleUrls: ['./suscrip.component.css']
})

export class SuscripComponent implements OnInit {
  constructor(private reportService: ReportService, private router: Router, private location: Location) { }
  
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  public isError = false;
  //public solicIns : SolicitudInscrip = null;
  //public respSolic : RespSolicitud = null;
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
          }

          let dre = 1;

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

  public RegistrarSusc(form: NgForm)
  {

    let razonsocial = form.value.txtbox_razonSocial;
    let nombres = form.value.txtbox_nombres;
    let apellidos = form.value.txtbox_apellidos;  
    
    this.solicIns.Entidad =   form.value.txtbox_razonSocial;
    this.solicIns.EntiCodigo =  form.value.txtbox_razonSocial;
    this.solicIns.NombreSolicitud = form.value.txtbox_nombres;
    this.solicIns.ApellidoSolicitud = form.value.txtbox_apellidos;  
    this.solicIns.CargoSolicitud = form.value.txtbox_cargo;
    this.solicIns.NroDocSolicitud = form.value.txtbox_docIdentidad;
    this.solicIns.TelefonoSolicitud = form.value.txtbox_telefono;
    this.solicIns.CelularSolicitud =  form.value.txtbox_celular;
    this.solicIns.EmailSolicitud =  form.value.txtbox_correo;

    this.registrarSuscripcion();

    
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

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
