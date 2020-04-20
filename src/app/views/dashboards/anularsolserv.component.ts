
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
import { AnularSolServRPT,AnularSolServRQT} from '../../models/SolicitudServicio';
import { Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse } 
from '../../services/usuario/Usuario';
import "rxjs/add/operator/toPromise";
import swal from 'sweetalert';

@Component({
  selector: 'app-anularsolserv',
  templateUrl: './anularsolserv.component.html',
  styleUrls: ['./anularsolserv.component.css']
})
export class AnularsolservComponent implements OnInit {

  public NroSolServ: string = "";
 
  myMotivo = new FormControl();
  
  
  private anulasolservRqt: AnularSolServRQT = {
    IDUser: 0,
    IDRol: 0,
    HojaServCodigo: "",
    Observacion: ""   
  };

  
  private anulasolservRpt: AnularSolServRPT = {
    Cod: -1,
    Msj: ""
  };

  constructor(
    private reportService: ReportService, 
    private router: Router, 
    public dialogRef : MatDialogRef<AnularsolservComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    
   this.NroSolServ = localStorage.getItem("NroSolServ").toString();



  }

  AnularSolServ()
  {

    if (this.myMotivo.value == null  || this.myMotivo.value.toString() == "" || this.myMotivo.value == undefined)
    {
      swal("Debe ingresar el motivo de anulación");
      return true;
    }

   this.anulasolservRqt = {
    IDUser:  Number(localStorage.getItem("Usuario").toString()), 
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    HojaServCodigo :  this.NroSolServ,
    Observacion : this.myMotivo.value.toString()
  };

  this.reportService
  //.loginuser(this.user.Usuario, this.user.Password)
  .AnularSolicitudServicio(this.anulasolservRqt)
  .subscribe(
  data => {      
    this.anulasolservRpt  = data;
    if (this.anulasolservRpt.Cod == 0)
    {                          
        //if (this.respSolic.Msj == "Ok")
      
         // console.log(data[0].Msj);
         localStorage.setItem("AnuloSolServ","Si"); 
          swal("Se anulo correctamente la solicitud Nro: " + this.NroSolServ); 
          this.dialogRef.close();
      
        
     
    } 
    else{
      swal("No se pudo anular la solicitud Nro: " + this.NroSolServ); 
    }                       
  },  
  error => {
       
    console.log("Error");}
  );
 



}

  onClose(){

   
    localStorage.setItem("AnuloSolServ","No"); 

    this.dialogRef.close();
  }

}
