import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { DireccRQT, DireccRPT } from '../../models/Direcc';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { RegdireccComponent } from 'app/views/dashboards/regdirecc.component';
import { RepDireccionamientoRPT } from '../../models/rep_direccionamientoRPT'
import { RepDireccionamientoRQT } from '../../models/rep_direccionamientoRQT'
import { AuthService } from 'app/services/auth.service';
import 'rxjs/add/operator/map';
import {BrowserModule} from '@angular/platform-browser';


@Component({
    selector: 'consultadireccionamiento',
    templateUrl: 'consultadireccionamiento.template.html',
    styleUrls : ['./consultadireccionamiento.component.css']
  })

  export class consultadireccionamientocomponent implements AfterViewInit, OnDestroy, OnInit {  

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
	  //dtOptions: DataTables.Settings = {};
	  dtInstance: DataTables.Api;
  
    public SiCargoData = true;
    public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    public UnidadNegSelect:string;

    minDate: Date;
    maxDate: Date;


    
  public objrepdirecRPT: RepDireccionamientoRPT;

    
    constructor(private reportService: ReportService, private authService: AuthService, private router: Router, private dialog : MatDialog,
      private dialogc : MatDialog) { 
     
     //   this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);

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

    public objDireccRQT : RepDireccionamientoRQT;
    public objDireccRPT: Array<DireccRPT>;

    ngAfterViewInit(): void {
      //this.dtTrigger.next();
      this.dtTrigger.next();
      console.log(this.dtElement);
    }    
    
    public ngOnInit():any {      
      
    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
     /// this.SetClienteInput();
      this.setearFechasLimite();
    }

    public CargarGrilla(form: NgForm) {

      if (this.TieneData)
      {
        return;
      }

      this.objDireccRQT = {
        IDUser : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        FechaDesde : form.value.txtbox_Desde,
        FechaHasta : form.value.txtbox_Hasta,
        Nave : form.value.txtbox_Registro,
        BlNbr : form.value.txtbox_Cliente,        
        Revisado: true


      };

      if(this.ValidarInput(this.objDireccRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      }

      //let res = this.reportService.getDirecc(this.objDireccRQT);
      let res = this.authService.getDireccionamiento(this.objDireccRQT);
    
      res.subscribe( 
        data => { 
          this.objDireccRPT = data.Data;
          if (data.Data.length >= 1)
          {
          
            this.SiCargoData = true;


                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
                  dtInstance.destroy();
          
                  this.dtTrigger.next(this.objDireccRPT);
                  this.SetGrillaVisibility(true);
                });

            

           
          }
          else
          {
            this.SiCargoData = true;

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
       
               this.dtTrigger.next(this.objDireccRPT);
               this.SetGrillaVisibility(true);
            });

            swal("No existen datos");
          }
         // this.dtTrigger.unsubscribe();
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

    
  NuevoDireccionamiento(){
/*     const bodyRect = document.body.getBoundingClientRect();
    const elemRect = this.dialogRef._containerInstance['_elementRef'].nativeElement.getBoundingClientRect();
    const right = bodyRect.right - elemRect.right;
    const top = elemRect.top - bodyRect.top;
    const dialogRef = this.dialog.open(SecondDialog, {
      width: '150px',
      position: { right: right + 'px', top: top + 'px' },
      hasBackdrop: false, */

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "40%";
    dialogConfig.height = "100%";
    dialogConfig.width = "700px";
/*     dialogConfig.position={
                              'top': '0'
                          }; */
    this.dialog.open(RegdireccComponent, dialogConfig);      
  }


    public ValidarInput(param : RepDireccionamientoRQT) : boolean {

     // this.objDireccRQT.FechaDesde = this.objDireccRQT.FechaDesde.toLocaleDateString();
     // this.objDireccRQT.FechaHasta = this.objDireccRQT.FechaHasta.toLocaleDateString();

     if(this.NullEmpty(param.FechaDesde)) {
      this.objDireccRQT.FechaDesde = "";
    }
    
    if(this.NullEmpty(param.FechaHasta)) {
      this.objDireccRQT.FechaHasta = "";
    }

      if(this.NullEmpty(param.Nave)) {
        this.objDireccRQT.Nave = "";
      }

      if(this.NullEmpty(param.BlNbr)) {
        this.objDireccRQT.BlNbr = "";
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

   public RedirrecionarZip(paramUri:string, paramNombre:string){

    this.reportService.getArchivoByte(paramUri + ".zip",paramNombre,"zip").subscribe(
      data => {
        
        const linkSource = 'data:application/zip;base64,' + data;
        const downloadLink = document.createElement("a");
        const fileName = paramNombre + ".zip";

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

  solo_fecha(val)
  {
    var k = val.keyCode;
    //var res = (k == 45 || k == 8 || k == 32 || (k >= 48 && k <= 57));
    return false;
  }


  
}
