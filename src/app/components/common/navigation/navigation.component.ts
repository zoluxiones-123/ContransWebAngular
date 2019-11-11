import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  public usuarionombre:string;
  public rolactual:string;
  public entinombre:string;


  constructor(private router: Router) {


  }

  ngOnInit() {
    this.usuarionombre = localStorage.getItem("NombreUsuario");
    this.rolactual = localStorage.getItem("RolActual");
    this.entinombre = localStorage.getItem("EntiNombre");

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
