import { Component, ViewChild, ViewContainerRef, ElementRef, AfterViewInit, TemplateRef} from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { UserInterfaceRQT } from 'app/models/user-interfaceRQT';
import { UserInterfaceRPT } from 'app/models/user-interfaceRPT';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { LoginRQT } from 'app/models/user-LoginRQT';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { SuscripComponent } from '../appviews/suscrip.component';
import { ContraseniaComponent } from '../appviews/contrasenia.component';
import {SwAlert} from 'app/models/swalert';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert';
import 'sweetalert2';
import Swal from 'sweetalert2';
import { Notificaciones } from 'app/models/notificacion';
import { ReportService } from 'app/services/report.service';
import { actContraseniaRQT} from 'app/models/user_actContraseniaRQT';
import { actContraseniaRPT} from 'app/models/user_actContraseniaRPT';


@Component({
  selector: 'login',
  templateUrl: 'login.template.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild("contraseniamodal") contraseniamodal: TemplateRef<any>; 

  @ViewChild('contraseniamodal', { read: TemplateRef }) _template: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  ngAfterViewInit() {
   // let elementRef = this.contraseniamodal.elementRef;
    //this.contraseniamod = this.contraseniamodal.createEmbeddedView;
    // outputs `template bindings={}`
    //console.log(elementRef.nativeElement.textContent);

    this.contraseniamod = this._template.createEmbeddedView({fromContext: 'John'});
    //this.vc.insert(view);

  }

  modalRef: BsModalRef;
  tycObj:any;
  notify:any;
  public lista : number;
  public contraseniamod : any;

  RecObj : LoginRQT = {
    User: '',
    Password: '',
    Ip: '',
    Hostname: '',
    App: '',
    TipEnvio: ''
  }


  constructor(private authService: AuthService, private modalService: BsModalService, private dialog : MatDialog,
  private dialogc : MatDialog, private router: Router, private location: Location, private spinner: NgxSpinnerService, private reportService : ReportService, 
  private formBuilder: FormBuilder) 
  { }
  
  private actContra: actContraseniaRQT = {
    IDUser: 0,
    OldPass: '',
    NewPass: ''
  };
  public isError = false;
  public errorgen = true;
  public errormsj = ''; 

  private respactContra: actContraseniaRPT = {
    Cod : -1,
    Msj: ''
  };
  
  contraseniaForm: FormGroup;
  submitted = false;

  public user: UserInterfaceRQT = {
    Usuario: '',
    Password: ''
  };

  public UserRPT :UserInterfaceRPT = null;
  public LNotif : Notificaciones;
  public notific: any;
  public notific1: any;

  public swmodal : SwAlert = {
   title : '',
   html : '',
   width : 0,
   confirmButtonText : "Aceptar"
  }
  
  private login: LoginRQT = {
    User: '',
    Password: '',
    Ip: '',
    Hostname: 'HP-LPPER20-004',
    App: 'W',
    TipEnvio : ''
  };
  public e:any;
  steps = [];
  notifys = [];
  notificaciones = [];

  ngOnInit() {

    this.contraseniaForm = this.formBuilder.group({
          contraAct: ['', Validators.required],
          contraNueva: ['', Validators.required],
          confContra: ['', [Validators.required, Validators.minLength(8)]]
           }); 
          
      localStorage.removeItem('NombreUsuario');   
      localStorage.removeItem('DireccionIP');               
      this.authService.getIp(); 
      
  
   }
   
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "40%";
    this.dialog.open(SuscripComponent, dialogConfig);      
  }

  onCambioContrasenia()
  {
    const dialogConfigC = new MatDialogConfig();
    dialogConfigC.disableClose = true;
    dialogConfigC.autoFocus = true;
    dialogConfigC.panelClass = "dialogContrans";
    // dialogConfigC.width = "40%";
    
    localStorage.setItem("CambiaContrasenia","1");
    // this.dialogc.open(ContraseniaComponent, dialogConfigC);
    
    //var contraseniamod = jQuery('#contraseniamodal');

    // this.openModal(this.contraseniamod);
  }

  CambiarContrasenia() {
    this.submitted = true;

    let contraseniaact = this.contraseniaForm.controls['contraAct'].value.toString();
    let contrasenian = this.contraseniaForm.controls['contraNueva'].value.toString();
    // stop here if form is invalid
    if (this.contraseniaForm.invalid) { return; }

    this.actContra.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.actContra.OldPass = this.contraseniaForm.controls['contraAct'].value.toString();
    this.actContra.NewPass = this.contraseniaForm.controls['contraNueva'].value.toString();

    if (this.contraseniaForm.controls['contraNueva'].value.toString() != this.contraseniaForm.controls['confContra'].value.toString())
    {
      this.errorgen = true;
      this.errormsj = "La nueva contraseña y su confirmación debe ser la misma";
      return;
    }

    this.authService
        //.loginuser(this.user.Usuario, this.user.Password)
        .actContrasenia(this.actContra)
        .subscribe(
        data => {          
          this.respactContra = data;
          if (this.respactContra.Cod == 0)
          { 
            swal({text :"Se ha cambiado la contraseña correctamente", icon:"success"});
            localStorage.setItem("CambiaContrasenia","0");
            this.modalRef.hide();
          }
          else{
            this.errorgen = true;
            this.errormsj = this.respactContra.Msj;           
          }
        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        );
   
}



  onLogin(form: NgForm) {

    if (form.valid) {
      this.login.User = this.user.Usuario;
      this.login.Password = this.user.Password;
      this.login.Ip =  localStorage.getItem("DireccionIP")
       
      this.authService.loginusuario(this.login).subscribe(data => {
          this.UserRPT = data;   
          
          if (this.UserRPT.IDMsj == 0) {
            localStorage.setItem("Usuario", this.UserRPT.UsuaCodigo.toString());
            localStorage.setItem("NombreUsuario", this.UserRPT.UsuaNombres);
            localStorage.setItem("RolEmpUsuaCodigoDefault", this.UserRPT.RolEmpUsuaCodigoDefault.toString());
            localStorage.setItem("EntiNombre", this.UserRPT.EntiNombre);
            localStorage.setItem("ListaRol",JSON.stringify(this.UserRPT.listRol));
            localStorage.setItem("EntiCodigo", this.UserRPT.EntiCodigo);
            localStorage.setItem("NombreIniciales", this.UserRPT.UsuaInicial);
            localStorage.setItem("tiemposesion", this.UserRPT.TiempoEspera);
            localStorage.setItem("Menu",JSON.stringify(this.UserRPT.Menu));
            localStorage.setItem("Graficos",JSON.stringify(this.UserRPT.Dashboards.Data));

            if(!this.UserRPT.UsuaAceptUso)
            {
              this.authService.getTyC().toPromise().then((data) => {
                this.tycObj = data;
                this.EsUsuarioNuevo();
              });
              return;
            }
                        
            localStorage.setItem("CambiaContrasenia","0");    

            if (this.UserRPT.DiaCaducacion <= 0)
            {
                this.onCambioContrasenia();
            }
            
            this.authService.getNotificaciones().subscribe(
              data => {                
                this.LNotif = data;          
                if (this.LNotif.Data != null)
                {                            
                  let listanotif =JSON.parse(JSON.stringify(this.LNotif.Data));
                  for (var i = 0; i <= listanotif.length-1; i++) {                    
                    let notifi = listanotif[i]; 
                    let modal = new SwAlert( 
                    "Notificacion " + (i + 1).toString(),
                    `<div class="form-control" style="overflow-y: scroll; height:400px; text-align: justify;">` + notifi.Aviso + "</div>",
                     500
                    )
                    this.notificaciones.push(modal);                  
                  }
                  Swal.queue(this.notificaciones);
                }                         
              },  
              error => {
                this.onIsError();           
                console.log("Error");}
              );
            this.router.navigate(['/dashboards/dashboardglobal']);
          }
          else{
            localStorage.removeItem('NombreUsuario');   
            localStorage.removeItem('DireccionIP');           
            localStorage.removeItem("NombreIniciales");
            this.onIsError();   
          }
        },  
        error => {
          this.onIsError();           
          console.log("Error");
        }
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
    if( this.NullEmpty(this.RecObj) || this.NullEmpty(this.RecObj.TipEnvio) || this.NullEmpty(form.value.Usuario)){
      swal({ icon: "warning", text: "Algunos campos estan vacios"});
      return;
    }
    this.spinner.show();

    this.RecObj.User = form.value.Usuario.toString();
    this.authService.recuperarContrasena(this.RecObj)
    .subscribe((data)=>
    {
      setTimeout(() => {
        this.spinner.hide();
      }, 1);
      if (data.Cod === 0) {
        swal({
          icon: "success",
          text: "Se realizo correctamente el cambio de contraseña"
        });
      }
      else if(data.Cod === 1) {
        swal({
          icon: "error",
          text: data.Msj.toString()
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

  

  async EsUsuarioNuevo() {

    let accept = await Swal({
      title: this.tycObj.Titulo,
      input: "checkbox",
      html: `<div class="form-control" style="overflow-y: scroll; height:400px; text-align: justify;">` + this.tycObj.Cuerpo + "</div>",
      inputPlaceholder: "Estoy de acuerdo con los terminos y condiciones",
      confirmButtonText: "Acepto",
      width: 500
    });
    
    if (accept.value == '1') {
      this.AceptarTyC(this.UserRPT.UsuaCodigo.toString());
      this.router.navigate(['starterview']);
    }else{
      Swal("","Debe aceptar el termino de \n condiciones para poder continuar",'warning');
    }
    
  }

  AceptarTyC(idusuario:string)
  {
    this.authService.setTyCUsuario(idusuario).subscribe(null,(error)=>console.log("Error en el servicio de actualizar el TyC ", error));
  }
}   
