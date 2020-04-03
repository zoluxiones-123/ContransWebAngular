import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {  Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse } 
from '../../../services/usuario/Usuario';

import swal from 'sweetalert';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { stringify } from 'querystring';

@Component({
  selector: 'app-actualizar-datos-usuario',
  templateUrl: './actualizar-datos-usuario.component.html',
  styleUrls: ['./actualizar-datos-usuario.component.css']
})
export class ActualizarDatosUsuarioComponent implements OnInit {

  razonSocial :string;
  nombres :string;
  apellidos :string;
  docIdentidad :string;
  cargo :string;
  telefono :string;
  celular :string;
  correo :string;

  codRolDefault :string;
  roles: Array<RolResponse>;

  cambiarClave :string; 
  claveActual :string; 
  claveNueva :string; 
  claveRepetida :string; 

  usuarioRequest : UsuarioRequest;
  actualizarClaveRequest : ActualizarClaveRequest;

  constructor(private usuario: Usuario
            , public dialogRef : MatDialogRef<ActualizarDatosUsuarioComponent>
            , @Inject(MAT_DIALOG_DATA) public data:any,) { 

              var emptyString = "";
    this.razonSocial = emptyString;
    this.nombres = emptyString;
    this.apellidos = emptyString;
    this.docIdentidad = emptyString;

    this.cargo = emptyString;
    this.telefono = emptyString;
    this.celular = emptyString;
    this.correo = emptyString;
    this.codRolDefault = "0";

    this.cambiarClave = "NO";
    this.claveActual = emptyString;
    this.claveNueva = emptyString;
    this.claveRepetida = emptyString;   

    this.usuarioRequest = { 
      IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
      Cargo : "",
      Telefono : "",
      Celular : "",
      Email : "",
      RolEmpUsuaCodigoDefault : 0
    }
    this.CargarDatosUsuario(this.usuarioRequest);
  }

  ngOnInit() {
  }
  public IniciarForm(form: NgForm){

    
  }

  /*public ChangingValue(param : any){
    this.codRolDefault = param.target.value;
    var t = "";
    t = "d";
  }*/

  public CargarDatosUsuario(param: UsuarioRequest) {
    this.usuario.obtUsuario(param).subscribe( 
      data => { 
        var resp : UsuarioResponse;
        resp = data;

        this.razonSocial = resp.EntiNombre;
        this.nombres = resp.UsuaNombres;
        this.apellidos = resp.UsuarioApellido;
        this.docIdentidad = resp.UsuaNumDoc;
    
        this.cargo = resp.UsuaCargo;
        this.telefono = resp.UsuaTelf;
        this.celular = resp.UsuaCelular;
        this.correo = resp.UsuaEmail;
        
        this.roles = data.listRol;
        this.codRolDefault = resp.RolEmpUsuaCodigoDefault.toString();
      }, 
      error => {
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
        console.log("Error : ", error); 
      });
  }

  public GuardarUsuario(form: NgForm){

    this.usuarioRequest = {
      IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
      Cargo : this.cargo,
      Telefono : this.telefono,
      Celular : this.celular,
      Email : this.correo,
      RolEmpUsuaCodigoDefault : Number.parseInt(this.codRolDefault)
    }

    if(this.cambiarClave == "SI")
      this.actualizarClaveRequest = {
        IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        OldPass : this.claveActual,
        NewPass : this.claveNueva
      }

    var msgValidacion : string;
    msgValidacion = this.validarPrevioGuardar();
    
    if(msgValidacion.length > 0){        
      swal({
            text: msgValidacion,
            icon: "warning",
          });
      return false;
    }

    this.usuario.actualizarDatos(this.usuarioRequest).subscribe( 
      data => { 
        if(this.cambiarClave == "NO"){
          swal("Datos Guardados Correctamente");
          this.dialogRef.close();
        }
        else{    
          this.usuario.actualizarClave(this.actualizarClaveRequest).subscribe( 
            data => { 
              if(data != null){
                var resp : ActualizarClaveResponse;
                resp = data;

                if(resp.Cod == 0){
                  this.claveActual = "";
                  this.claveNueva = "";
                  this.claveRepetida = "";
                  swal("Datos Guardados y Contraseña Cambiada Correctamente");
                  this.dialogRef.close();
                }                  
                else 
                  swal("Datos Guardados correctamente pero no se pudo cambiar la contraseña. " + resp.Msj);
              }
            }, 
            error => {
              swal("Se guardaron los datos pero sucedio un error al cambiar la contraseña"); 
              console.log("Error : ", error); 
            });        
        }          
      }, 
      error => {
        swal("Error al intentar guardar los datos del servicio"); 
        console.log("Error : ", error); 
      });

      return false;
  }

  public validarPrevioGuardar(){
    var msg : string = "";

    if(this.cargo.length == 0) msg = "Debe indicar el Cargo";
      else if(this.telefono.length == 0) msg = "Debe indicar el Teléfono";
        else if(this.celular.length == 0) msg = "Debe indicar el Celular";
          else if(this.correo.length == 0) msg = "Debe indicar el Correo";
    
    if(this.cambiarClave == "SI"){
      if(this.claveActual.length == 0) msg = "Ingrese la Contraseña Actual";
      else if(this.claveNueva.length == 0) msg = "Ingrese la Contraseña Nueva";
      else if(this.claveNueva != this.claveRepetida) msg = "Debe repetir correctamente la Contraseña";      
    }

    return msg;
  }

  public cerrarPopup(){
    this.dialogRef.close();
    return false;
  }

}