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
import { ContraseniaComponent } from '../appviews/contrasenia.component';


@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent { 

  modalRef: BsModalRef;
  private dialogc : MatDialog,
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
    App: 'W'
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

  onCambioContrasenia()
  {
    const dialogConfigC = new MatDialogConfig();
    dialogConfigC.disableClose = true;
    dialogConfigC.autoFocus = true;
    dialogConfigC.width = "40%";
    this.dialogc.open(ContraseniaComponent, dialogConfigC);      

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
          // this.authService.setUser(data.user);
          // const token = data.id;
          // this.authService.setToken(token);
          // this.router.navigate(['/user/profile']);
          // location.reload();
          // this.isError = false;
          //this.UserRPT = data[0];
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

            if (this.UserRPT.DiaCaducacion <= 0)
            {
                this.onCambioContrasenia();
            }

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
    
  }

  onItemChange(param :any){
    
  }

}   
