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
import { Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse} 
from '../../services/usuario/Usuario';
import { AutEntregaPrec,AutEntregaPrecRPT,AutEntregaPrecRQT, ValidaEdiPrecRPT, ValidaEdiPrecRQT, ActualizaPrecRPT,
  ActualizaPrecRQT}  from '../../models/Liquidacion';
import "rxjs/add/operator/toPromise";
import swal from 'sweetalert';

@Component({
  selector: 'app-actualizaprecinto',
  templateUrl: './actualizaprecinto.component.html',
  styleUrls: ['./actualizaprecinto.component.css']
})
export class ActualizaprecintoComponent implements OnInit {

  
  public Registro : string;
  Nombres: string;

  Documento: string;
  Empresa: string;

  
  private objActPrecRQT: ActualizaPrecRQT = {
    IDUser : 0,
    IDRol : 0,
    NombreCompleto : "",
    DNI : "",
    EmpresaPertenece : "",
    CodLiqu : 0
     };

  private objActPrecRPT: ActualizaPrecRPT = {
      Cod : -1,
      Msj : ""
     };
  


  constructor(private reportService: ReportService, 
    private router: Router, 
    private usuario: Usuario,
    public dialogRef : MatDialogRef<ActualizaprecintoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.Registro =  localStorage.getItem("RegiCod");

    this.Nombres =  localStorage.getItem("NombreCompleto");
    this.Documento =   localStorage.getItem("DNICarnet");
    this.Empresa =  localStorage.getItem("EmpresaPert");

   

  }

  ActualizarPrecinto()
  {

    this.objActPrecRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      NombreCompleto : this.Nombres,
      CodLiqu : Number.parseInt(localStorage.getItem("CodLiqui")),
      DNI : this.Documento,
      EmpresaPertenece : this.Empresa
      };

      let res = this.reportService.ActualizaPrecinto(this.objActPrecRQT);

      // console.log(this.objAutEntregaPrecRQT)
       
       res.subscribe( 
         data => { 
           //this.objConsultaRefrendoExpoRPT = data.data;
           this.objActPrecRPT = data;
 
           console.log(data);
           if (data[0].Msj == "Ok")
           {
             //this.SiCargoData = true;
             //this.dtTrigger.next(this.objTemperaturaRQT);
             //this.SetGrillaVisibility(true);
             // this.TieneData = true;
             swal("Se actualizo correctamente la información");             
             localStorage.setItem("GraboPrec", "Si");
             this.dialogRef.close();            
            
           }
           else
           {
             swal("Error al actualizar la información");
             this.dialogRef.close();

           }
           //this.dtTrigger.unsubscribe();
         }, 
         error => {
           swal("Error al cargar los datos"); 
           console.log("Error : ", error); 
         }
       );  

  }

  onClose()
  {
    localStorage.setItem("GraboPrec", "No");
    this.dialogRef.close();
  }

}
