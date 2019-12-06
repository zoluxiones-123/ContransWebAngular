import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {  Usuario, UsuarioRequest, UsuarioResponse } from '../../../services/usuario/Usuario';

import swal from 'sweetalert';
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
  rolDefault :string;
  roles: Array<string>;

  cambiarClave :string; 
  claveActual :string; 
  claveNueva :string; 
  claveRepetida :string; 

  usuarioRequest : UsuarioRequest;

  constructor(private usuario: Usuario ) { 
    var emptyString = ".";

    this.razonSocial = emptyString;
    this.nombres = emptyString;
    this.apellidos = emptyString;
    this.docIdentidad = emptyString;

    this.cargo = emptyString;
    this.telefono = emptyString;
    this.celular = emptyString;
    this.correo = emptyString;
    this.rolDefault = "ADMINISTRADOR";

    this.cambiarClave = "NO";
    

    this.usuarioRequest = { IDUSer : 10,
      Cargo : "",
      Telefono : "",
      Celular : "",
      Email : "",
      RolEmpUsuaCodigoDefault : 0}
    this.CargarDatosUsuario(this.usuarioRequest);
  }

  ngOnInit() {
  }

  public IniciarForm(form: NgForm){

    
  }

  public CargarDatosUsuario(param: UsuarioRequest) {
    this.usuario.obtUsuario(param).subscribe( 
      data => { 
        var resp : UsuarioResponse;
        resp = data;

        this.razonSocial = "CONTRANS S.A.C.";
        this.nombres = resp.UsuaNombres;
        this.apellidos = resp.UsuarioApellido;
        this.docIdentidad = resp.UsuaNumDoc;
    
        this.cargo = resp.UsuaCargo;
        this.telefono = resp.UsuaTelf;
        this.celular = resp.UsuaCelular;
        this.correo = resp.UsuaEmail;        
      }, 
      error => {
        swal("Error al cargar los datos"); 
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
      RolEmpUsuaCodigoDefault : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"))
    }

    var msgValidacion : string;
    msgValidacion = this.validarPrevioGuardar();
    
    if(msgValidacion.length > 0)
    {        
      swal({
            text: msgValidacion,
            icon: "warning",
          });
      return;
    }

    this.usuario.obtUsuario(this.usuarioRequest).subscribe( 
      data => { 
        if(this.cambiarClave == "NO")
          swal("Datos Guardados Correctamente"); 
      }, 
      error => {
        swal("Error al intentar guardar los datos"); 
        console.log("Error : ", error); 
      });

      if(this.cambiarClave == "SI"){
        this.usuario.cambiarClave(this.usuarioRequest).subscribe( 
          data => { 
            swal("Datos Guardados y Contraseña Cambiada Correctamente"); 
          }, 
          error => {
            swal("Se guardaron los datos pero sucedio un error al cambiar la contraseña"); 
            console.log("Error : ", error); 
          });        
      }

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

  

}