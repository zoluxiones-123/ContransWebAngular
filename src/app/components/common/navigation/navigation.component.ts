import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { stringify } from 'querystring';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  public usuarionombre:string;
  public rolactual:string;
  public entinombre:string;
  public listarol:any;


  constructor(private router: Router) {


  }

  ngOnInit() {
    this.usuarionombre = localStorage.getItem("NombreUsuario");
    this.listarol = JSON.parse(localStorage.getItem("ListaRol"));
    this.rolactual =  this.ObtenerRolActual(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.entinombre = localStorage.getItem("EntiNombre");


  }

  ObtenerRolActual (rolxdefecto:string)
  {
    let Rol:string = "";
    this.listarol.forEach(item => {
      if(item.RolCodigo == rolxdefecto)
      {
        Rol = item.RolDesc;
      }    
    });
    
    return Rol;
  }


  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
