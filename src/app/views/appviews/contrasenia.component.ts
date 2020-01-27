import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { actContraseniaRQT} from 'app/models/user_actContraseniaRQT';
import { actContraseniaRPT} from 'app/models/user_actContraseniaRPT';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import swal from 'sweetalert';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.component.html'
})
export class ContraseniaComponent implements OnInit {

  
  contraseniaForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
  public dialogRef : MatDialogRef<ContraseniaComponent>, 
  @Inject(MAT_DIALOG_DATA) public data:any,) { }
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

  ngOnInit() {
    this.contraseniaForm = this.formBuilder.group({
      contraAct: ['', Validators.required],
      contraNueva: ['', Validators.required],
      confContra: ['', [Validators.required, Validators.minLength(8)]]
  }); 

  //this.contraseniaForm.controls['contraAct'].setValue("Era momsoso");

  }

  CambiarContrasenia() {
    this.submitted = true;

    let contraseniaact = this.contraseniaForm.controls['contraAct'].value.toString();
    let contrasenian = this.contraseniaForm.controls['contraNueva'].value.toString();
    // stop here if form is invalid
    if (this.contraseniaForm.invalid) {
        return;
    }

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
            this.dialogRef.close();
            //this.router.navigate(['home']);
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


onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}


}
