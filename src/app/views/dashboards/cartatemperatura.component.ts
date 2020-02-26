import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { TemperaturaRQT,TemperaturaRPT} from '../../models/Temperatura';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material';
import {ConsultaDetalleTemperaturaComponent} from '../dashboards/consuldetalletemperatura.component'


@Component({
    selector: 'cartatemperatura',
    templateUrl: 'cartatemperatura.template.html'
  })

  export class CartaTemperaturaComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    
    //constructor(private reportService: ReportService, private router: Router) { 
      //this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);

    // }
    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
    }
    
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: DataTables.Api;   
  
    ngAfterViewInit(): void {
      this.dtTrigger.next();
      console.log("elemento"+ this.dtElement);
    }

    setearFechasLimite(){
      let date = new Date();
      this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
      this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    }
    
    dtTrigger:Subject<any> = new Subject();
    dtOptions : any = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      autoFill: true, 
      dom: 'Bfrtip',
      processing: true,
      fixedColumns:   true,
      buttons: [
        'colvis',
        'excel',
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
          colvis : "Columnas",
          excel : "Exportar a Excel"
        },
        aria :
        {
          sortAscending :"Activar para ordenar la columna de manera ascendente",
          sortDescending: "Activar para ordenar la columna de manera descendente"
        }
      }
    };

    public objTemperaturaRQT : TemperaturaRQT;

    public objTemperaturaRPT: Array<TemperaturaRPT>;
    
    public ngOnInit():any {      

    ////Fecha Actual
/*     let fechita = new Date();
    let dia = fechita.getDate().toString();
    let mes = (fechita.getMonth() + 1).toString();
    let anio = fechita.getFullYear().toString();
    this.fechaActual = dia + "-" + mes + "-" + anio; */
    
    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
      //this.SetClienteInput();
      //this.setearFechasLimite();

      /* this.objTemperaturaRPT = [
        {

           Embarcador: "Exportadora Y Comercializadora Greenvic S.A.C. ",
          Nave: "MSC MARS",
          Booking: "LIMA00377500",
          Contenedor: "FSCU5756108",
          SP: "0",
          RH: "X",
          Vent: "X",
          O2: "X",
          CO2: "X", 
          
        },{
          Embarcador: "Exportadora Y Comercializadora Greenvic S.A.C. ",
          Nave: "MSC MARS",
          Booking: "LIMA00373800",
          Contenedor: "FSCU5756200",
          SP: "0",
          RH: "X",
          Vent: "X",
          O2: "X",
          CO2: "X", 
          
        }] */


        console.log(this.objTemperaturaRPT)
    }        

      popupDetalleTemperatuda(){
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(ConsultaDetalleTemperaturaComponent, dialogConfig); 
      return false;
    }  

    public CargarGrilla(form: NgForm) {

       if (this.TieneData)
      {
        return;
      } 
      
     /*  this.SiCargoData = true;
      this.dtTrigger.next(this.objTemperaturaRPT);
      this.SetGrillaVisibility(true); */

/*      this.objTemperaturaRQT = {
         IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        Desde : form.value.txtbox_Desde,
        Hasta : form.value.txtbox_Hasta,
        Contenedor : form.value.txtbox_Contenedor 
        IDUSer: 10,
        IDRol: 1,
        IdCliente: "007477"
      };*/

/*       if(this.ValidarInput(this.objTemperaturaRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } */

///Aun Falta obtener el servicio ///
       let res = this.reportService.getTemperatura(this.objTemperaturaRQT);
      
      
      res.subscribe( 
        data => { 
          this.objTemperaturaRPT = data;
          console.log(data);
          if (data.length >= 1)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objTemperaturaRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            swal("No existen datos");
          }
          //this.dtTrigger.unsubscribe();
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

    public SetColumnasVisibility(param:boolean)
    {
      console.log("entrando")
      if (param) {
        document.getElementById('boton').style.visibility = "visible";
        console.log("HIDDEN")
      }
      else {
        document.getElementById('boton').style.visibility = "hidden";
        console.log("VISIBLE")
      }
    }

    public SiTieneData(param :boolean)
    {
      this.TieneData = false;
    }

    public ChangingValue(param : any)
    {
      //this.UnidadNegSelect = param.target.value;
    }

/*     public SetClienteInput()
    {
      let enticodigo = localStorage.getItem("EntiCodigo");
      let entiNombre = localStorage.getItem("EntiNombre");

      if (enticodigo != "002915")
      {
        document.getElementById("txtbox_Cliente").textContent = entiNombre;
        document.getElementById("txtbox_Cliente").innerText = entiNombre;
        document.getElementById("txtbox_Cliente").setAttribute("placeholder",entiNombre)
        document.getElementById("txtbox_Cliente").setAttribute("disabled","true");
      }
    } */

   /* public RedirrecionarPDF(paramUri:string, paramNombre:string){

    this.reportService.getArchivoByte(paramUri,paramNombre,"pdf").subscribe(
      data => {
        
        const linkSource = 'data:application/pdf;base64,' + data;
        const downloadLink = document.createElement("a");
        const fileName = paramNombre + ".pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

      }, (error)=> console.log("Salio error en la descarga: ", error));
  }

  public RedirrecionarXML(paramUri:string, paramNombre:string){

    this.reportService.getArchivoByte(paramUri,paramNombre,"xml").subscribe(
      data => {
        const linkSource = 'data:text/xml;base64,' + data;
        const downloadLink = document.createElement("a");
        const fileName = paramNombre + ".xml";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }, (error)=> console.log("Salio error en la descarga: ", error));
  } */


  
}