
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RepDiasLibresRPT } from '../../models/rep_diaslibresRPT'
import { RepDiasLibresRQT } from '../../models/rep_diaslibresRQT'

import { AuthService } from 'app/services/auth.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';

import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { ReportService } from '../../services/report.service';



@Component({
  selector: 'app-consultacontdl',
  templateUrl: './consultacontdl.component.html'
  
})
export class ConsultacontdlComponent implements OnDestroy, OnInit {

  
  public SiCargoData = true;
  public TieneData = false;
  public UnidadNegSelect:string;
  
  minDate: Date;
  maxDate: Date;


  constructor(private authservice: AuthService, private router: Router) { }

  
  public objrepdlRQT : RepDiasLibresRQT;

  public objrepdlRPT: RepDiasLibresRPT;

  setearFechasLimite(){
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
  }
  
  dtTrigger:Subject<any> = new Subject();
  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
      'excel'
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      buttons : {
        excel : "Exportar a Excel"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };



    public ngOnInit():any {      
      
    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
      this.setearFechasLimite();
    }
    

    public Redirrecionar(param:string){
      window.open("http://" + param,"_blank");
    }

  public CargarGrilla(form: NgForm) {

    if (this.TieneData)
    {
      return;
    }

    this.objrepdlRQT = {
      IDUser : Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Registro:  form.value.txtbox_Registro,
      Bl: form.value.txtbox_BL,
      Contenedor: form.value.txtbox_CTN,
      Fecha: ''
    };

    if(this.ValidarInput(this.objrepdlRQT))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }


    let res = this.authservice.getDiasLibres(this.objrepdlRQT);
    
    res.subscribe( 
      data => { 
        this.objrepdlRPT = data.Data;
        if (data.Data.length >= 1)
        {
          this.SiCargoData = true;
          this.dtTrigger.next(this.objrepdlRPT);
          this.SetGrillaVisibility(true);
          // this.TieneData = true;
        }
        else
        {
          swal("No existen datos");
        }
        this.dtTrigger.unsubscribe();
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );

  }

  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
  }

  public NullEmpty (param:any) : boolean
  {
    return !(typeof param!='undefined' && param)
  }

  public SetGrillaVisibility(param:boolean)
  {
    if (param) {
      document.getElementById('grilla').style.visibility = "visible";
    }
    else {
      document.getElementById('grilla').style.visibility = "hidden";
    }
  }

  public SiTieneData(param :boolean)
  {
    this.TieneData = false;
  }


  public ValidarInput(param : RepDiasLibresRQT) : boolean
  {
    if (this.NullEmpty(param.Registro) && this.NullEmpty(param.Bl) && this.NullEmpty(param.Contenedor))
    {
      return true;
    }

    //this.objFacturaRQT.Desde = this.objFacturaRQT.Desde.toLocaleDateString();
    //this.objFacturaRQT.Hasta = this.objFacturaRQT.Hasta.toLocaleDateString();

    if(this.NullEmpty(param.Registro))
    {
      this.objrepdlRQT.Registro = "";
    }

    if(this.NullEmpty(param.Bl))
    {
      this.objrepdlRQT.Bl = " ";
    }

    if(this.NullEmpty(param.Contenedor))
    {
      this.objrepdlRQT.Contenedor = " ";
    }

    return false;
  }

}
