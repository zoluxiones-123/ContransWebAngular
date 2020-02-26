import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';


@Component({
    selector: 'consultafactura',
    templateUrl: 'consultafactura.template.html'
  })

  export class ConsultaFacturaComponent implements AfterViewInit, OnDestroy, OnInit {  

    
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: DataTables.Api;

    public SiCargoData = true;
    public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    public UnidadNegSelect:string;

    minDate: Date;
    maxDate: Date;
    
    constructor(private reportService: ReportService, private router: Router) { 
      this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);

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
      dom: 'Bfrtip',
      buttons: [
        'colvis',
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

    public objFacturaRQT : FacturasRQT;

    public objFacturaRPT: Array<FacturasRPT>;
    

    ngAfterViewInit(): void {
      //this.dtTrigger.next();
      this.dtTrigger.next();
      console.log(this.dtElement);
    }

    public ngOnInit():any {      
      
    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
      this.SetClienteInput();
      this.setearFechasLimite();
    }        

    public CargarGrilla(form: NgForm) {

      if (this.TieneData)
      {
        return;
      }

      this.objFacturaRQT = {
        IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        UnidadNeg : this.UnidadNegSelect,
        Desde : form.value.txtbox_Desde,
        Hasta : form.value.txtbox_Hasta,
        Documento : form.value.txtbox_Registro,
        Cliente : form.value.txtbox_Cliente
      };

      if(this.ValidarInput(this.objFacturaRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      }


      let res = this.reportService.getFacturas(this.objFacturaRQT);
      
      
      res.subscribe( 
        data => { 
          this.objFacturaRPT = data.Data;
          if (data.Data.length >= 1)
          {
            this.SiCargoData = true;

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
              dtInstance.destroy();
      
              this.dtTrigger.next(this.objFacturaRPT);
              this.SetGrillaVisibility(true);
            });

           // this.dtTrigger.next(this.objFacturaRPT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;
          }
          else
          {
            this.SiCargoData = true;

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
            dtInstance.destroy();
       
               this.dtTrigger.next(this.objFacturaRPT);
               this.SetGrillaVisibility(true);
            });
  
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

    public ValidarInput(param : FacturasRQT) : boolean
    {
      if (this.NullEmpty(this.UnidadNegSelect) ||this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta))
      {
        return true;
      }

      this.objFacturaRQT.Desde = this.objFacturaRQT.Desde.toLocaleDateString();
      this.objFacturaRQT.Hasta = this.objFacturaRQT.Hasta.toLocaleDateString();

      if(this.NullEmpty(param.Documento))
      {
        this.objFacturaRQT.Documento = " ";
      }

      if(this.NullEmpty(param.Cliente))
      {
        this.objFacturaRQT.Cliente = " ";
      }

      return false;
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

    public ChangingValue(param : any)
    {
      this.UnidadNegSelect = param.target.value;
    }

    public SetClienteInput()
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
    }

   public RedirrecionarPDF(paramUri:string, paramNombre:string){

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
  }


  
}
