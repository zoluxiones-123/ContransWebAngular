import { Component, TemplateRef} from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { UserInterfaceRQT } from 'app/models/user-interfaceRQT';
import { UserInterfaceRPT } from 'app/models/user-interfaceRPT';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { LoginRQT } from 'app/models/user-LoginRQT';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { SuscripComponent } from '../appviews/suscrip.component';
import swal from 'sweetalert';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent { 

  modalRef: BsModalRef;

  RecObj : LoginRQT = {
    User: '',
    Password: '',
    Ip: '',
    Hostname: '',
    App: '',
    TipEnvio: ''
  }


  constructor(private authService: AuthService, private modalService: BsModalService, private dialog : MatDialog, private router: Router, private location: Location) { }
  public user: UserInterfaceRQT = {
    Usuario: '',
    Password: ''
  };
  public isError = false;
  public UserRPT :UserInterfaceRPT = null;
  
  private login: LoginRQT = {
    User: '',
    Password: '',
    Ip: '',
    Hostname: 'HP-LPPER20-004',
    App: 'W',
    TipEnvio : ''
  };
  public e:any;

  ngOnInit() {
      localStorage.removeItem('NombreUsuario');   
      localStorage.removeItem('DireccionIP');               
      this.authService.getIp();       
   }
   
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(SuscripComponent, dialogConfig);      
  }


  onLogin(form: NgForm) {
    if (form.valid) {

      this.login.User = this.user.Usuario;
      this.login.Password = this.user.Password;
      this.login.Ip =  localStorage.getItem("DireccionIP")
       
      return this.authService
        .loginusuario(this.login)
        .subscribe(
        data => {
          this.UserRPT = data;

          if (this.UserRPT.IDMsj == 0)
          { 
            localStorage.setItem("Usuario", this.UserRPT.UsuaCodigo.toString());
            localStorage.setItem("NombreUsuario", this.UserRPT.UsuaNombres);
            localStorage.setItem("RolEmpUsuaCodigoDefault", this.UserRPT.RolEmpUsuaCodigoDefault.toString());
            localStorage.setItem("EntiNombre", this.UserRPT.EntiNombre);
            localStorage.setItem("ListaRol",JSON.stringify(this.UserRPT.listRol));
            localStorage.setItem("EntiCodigo", this.UserRPT.EntiCodigo);
            this.router.navigate(['starterview']);
          }
          else{
            localStorage.removeItem('NombreUsuario');   
            localStorage.removeItem('DireccionIP');           
            this.onIsError();   
          }
        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        );


    } else {
      this.onIsError();
    }

  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  omit_special_char(val)
  {
    var k = val.keyCode;
    var res = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    return res
  }

  

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onRecoverPass(form: NgForm){
    if( this.NullEmpty(this.RecObj) || this.NullEmpty(this.RecObj.TipEnvio) ){
      swal({ icon: "warning", text: "Algunos campos estan vacios"});
      return;
    }
    this.RecObj.User = form.value.Usuario.toString();

    this.authService.recuperarContrasena(this.RecObj)
    .subscribe((data)=>
    {
      if (data.Cod === 0) {
        swal({
          icon: "success",
          text: "Se realizo correctamente el cambio de contraseña"
        });
      }
      else if(data.Cod === 1) {
        swal({
          icon: "error",
          text: "Ocurrio error"
        });
      }
    });    
  }

  onItemChange(param :any){

    if(param.target.id == "SMS"){
      this.RecObj.TipEnvio = "S";
    }
    else if(param.target.id == "Correo"){
      this.RecObj.TipEnvio = "M";
    }
  }

  NullEmpty (param:any) : boolean{
    return (typeof param=='undefined' || !param);
  }

}   
