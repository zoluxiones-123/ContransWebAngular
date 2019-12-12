import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
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

}
