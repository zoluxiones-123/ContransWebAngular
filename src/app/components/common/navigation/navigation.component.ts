import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { stringify } from 'querystring';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
import { ReportService } from '../../../services/report.service';
import { MenuPaginaRPS } from 'app/models/PaginasMenu';


declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html',
  styleUrls : ['./navigation.component.css']

})

export class NavigationComponent {

  public usuarionombre : string;
  public rolactual : string;
  public entinombre : string;
  public listarol : any;
  public NombreIniciales : string;
  public prueba : boolean;
  public MenuRST : any;
  public IDUserObj : string;
  public rolcodigo : string;


  constructor(private router: Router, private reportService: ReportService) {
  }

  ngOnInit() {
    this.usuarionombre = localStorage.getItem("NombreUsuario");
    this.listarol = JSON.parse(localStorage.getItem("ListaRol"));
    this.rolactual =  this.ObtenerRolActual(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.entinombre = localStorage.getItem("EntiNombre");
    this.NombreIniciales = localStorage.getItem("NombreIniciales");
    this.IDUserObj = localStorage.getItem("Usuario").toString();
    this.rolcodigo =  localStorage.getItem("RolEmpUsuaCodigoDefault").toString();
    this.MenuRST = JSON.parse(localStorage.getItem("Menu"));
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
    if (jQuery("body").hasClass('fixed-sidebar')) 
    {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  SetStarter()
  {
    localStorage.setItem("EsStarter","0");
  }

  CambioRol(item: any)
  {
    swal({
      title: "Cambio de Rol",
      text: "¿Desea cambiar de "+ this.rolactual  +" a " + item.RolDesc +"?",
      icon: "warning",
      buttons: ["No","Si"]
    })
    .then(willDelete => {
      if (willDelete) {
        localStorage.setItem("RolEmpUsuaCodigoDefault", item.RolCodigo);
        location.reload();
        swal({text :"Se ha cambiado de rol correctamente", icon:"success"});
      }
    });
    this.ActualizarMenu(item.RolCodigo);
    this.ActualizarGrafico(item.RolCodigo);
  }

  ActualizarMenu(RolCodigo: any) {
    this.reportService.getMenu(localStorage.getItem("Usuario"), RolCodigo).toPromise().then(data=>{
      localStorage.setItem("Menu",JSON.stringify(data));
    });
  }

  ActualizarGrafico(RolCodigo: any) {
    this.reportService.getGraficos(localStorage.getItem("Usuario"), RolCodigo).toPromise().then(data=>{
      localStorage.setItem("Grafico",JSON.stringify(data));
    });
  }
}
