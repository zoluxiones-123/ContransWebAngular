import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { MatDialog, MatDialogConfig} from '@angular/material';
import {ActualizarDatosUsuarioComponent} from '../../../views/formularios/actualizar-datos-usuario/actualizar-datos-usuario.component'

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  constructor(private dialog : MatDialog){

  }
  
  LogOut(){
    
    localStorage.removeItem("NombreUsuario");   
    localStorage.removeItem("DireccionIP");              
    localStorage.removeItem("Usuario");
    localStorage.removeItem("NombreUsuario");
    localStorage.removeItem("RolEmpUsuaCodigoDefault");
    localStorage.removeItem("EntiNombre");
    localStorage.removeItem("ListaRol");
    localStorage.removeItem("EntiCodigo");    
    localStorage.removeItem("EsStarter");

  }

  popupActualizarDatos(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ActualizarDatosUsuarioComponent, dialogConfig); 

    return false;
  }  

}
