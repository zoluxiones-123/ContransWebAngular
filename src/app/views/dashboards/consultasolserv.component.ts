import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsultarSolicitudRPT,ConsultarSolicitudRQT,EstSolServicio,EstadoSolServicio, SolicitudServicio } 
from '../../models/SolicitudServicio';
import { CitasRPT, CitasRQT, Citas } from '../../models/Cita';

import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { ActualizarcitaComponent  } from 'app/views/dashboards/actualizarcita.component';
import { GenerarcitaComponent  } from 'app/views/dashboards/generarcita.component';
import {NuevoSolServComponent} from './nuevosolserv.component';

import { MatDialog, MatDialogConfig} from '@angular/material';
import "rxjs/add/operator/toPromise";


@Component({
  selector: 'app-consultasolserv',
  templateUrl: './consultasolserv.component.html',
  styleUrls: ['./consultasolserv.component.css']
})
export class ConsultasolservComponent implements AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  public SiCargoData = true;
  public ListaSolServ : Array<SolicitudServicio> = [];
  //public ListaTiposCarga : Array<TipoCarga> = [];
  //public TipoCargaE : TiposCarga;
  public isError = false;
  public FilePathDJ : string = "";
  public NombreArchivoDJ : string = "";
    
  public FilePathExpo : string = "";
  public NombreArchivoExpo : string = "";

  public FilePathImpo : string = "";
  public NombreArchivoImpo : string = "";

  
  public ListaEstSol : Array<EstSolServicio> = [];
  public EstadoSolServ : EstadoSolServicio;
  

  public ListaCitas : Array<CitasRPT> = [];
  public CitaE : Citas;
  public objConsultarSolRqt : ConsultarSolicitudRQT = {
 
    IDUser: 0,
    IDRol: 0,
    HojaServCodigo: "" ,
    FechaDesde: "" ,
    FechaHasta: "" ,
    Volante: "" ,
    BlNbr: "",
    BkgNbr: "",
    Estado: ""

   };

  public TieneData = false;
  public EstadoSelect:string;
  public TipoCargaSelect:string;

  
  public objConsultarSolRpt : ConsultarSolicitudRPT = {
 
    CodMsj: -1,
    Msj: "",
    data: []

   };

  

  minDate: Date;
  maxDate: Date;
  

  constructor(private reportService: ReportService, private dialog : MatDialog, private router: Router) { }

  ngOnInit() {

    
   // this.ListaAlmacenes = new Array;

   this.FilePathDJ = "C://Documentos//declaracion_jurada_reconocimiento_fisico.pdf";
   this.NombreArchivoDJ = "declaracion_jurada_reconocimiento_fisico";

   this.FilePathImpo = "C://Documentos//Manual_de_usuario_de_Programacion_de_servicios_de_importacion.pdf";
   this.NombreArchivoImpo = "Manual_de_usuario_de_Programacion_de_servicios_de_importacion";

   this.FilePathExpo = "C://Documentos//Manual_de_usuario_de_Programacion_de_servicios_de_exportacion.pdf";
   this.NombreArchivoExpo = "Manual_de_usuario_de_Programacion_de_servicios_de_exportacion";
   
   
   this.SetGrillaVisibility(false);

    this.reportService
    .getEstSolicitudServ()
    .subscribe(
    data => {
      
      this.EstadoSolServ = data;

      if (this.EstadoSolServ.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.EstadoSolServ.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEstSol.push(last);      
        }
      
      }
      else{  
        this.onIsError();   
      }
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

  }

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  
  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
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

  
  public NullEmpty (param:any) : boolean
  {
    return !(typeof param!='undefined' && param)
  }

  public SetGrillaVisibility(param:boolean)
  {
    if (param) {
      document.getElementById('grillaserv').style.visibility = "visible";
    }
    else {
      document.getElementById('grillaserv').style.visibility = "hidden";
    }
  }

  public SiTieneData(param :boolean)
  {
    this.TieneData = false;
  }

  public GenerarSolServ()
  {}

  public DescargarArchivo(paramUri:string, paramNombre:string){

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

  



  public CargarGrilla(form: NgForm) {

    if (this.TieneData)
    {
      return;
    }

    this.objConsultarSolRqt = {  

    IDUser:  Number(localStorage.getItem("Usuario").toString()), 
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    HojaServCodigo : form.value.txtbox_Cita,
    FechaDesde: form.value.txtbox_Desde ,
    FechaHasta: form.value.txtbox_Hasta ,
    Volante: form.value.txtbox_Volante ,
    BlNbr: form.value.txtbox_BL,
    BkgNbr: form.value.txtbox_Booking,
    Estado: this.EstadoSelect


    };
    
    if(this.ValidarInput(this.objConsultarSolRqt))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }


    let res = this.reportService.getSolicitudServicio(this.objConsultarSolRqt);
        
    res.subscribe( 
      data => { 
        this.objConsultarSolRpt = data;
        if (data.Msj == "Ok")
        {
          this.SiCargoData = true;

          this.ListaSolServ =  this.objConsultarSolRpt.data;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.ListaSolServ);
            this.SetGrillaVisibility(true);
          });

        }
        else
        {
          this.SiCargoData = true;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.ListaSolServ);
             this.SetGrillaVisibility(true);
          });

          swal("No existen datos");
        
        }
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );

  }
  

  public ValidarInput(param : ConsultarSolicitudRQT) : boolean
  {
    /*this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta)*/

    if (this.EstadoSelect == undefined )
    {
      return true;
    }

    if (this.NullEmpty(param.FechaDesde) || this.NullEmpty(param.FechaHasta))
    {
      return true;
    }

    this.objConsultarSolRqt.FechaDesde = this.objConsultarSolRqt.FechaDesde.toLocaleDateString();
    this.objConsultarSolRqt.FechaHasta = this.objConsultarSolRqt.FechaHasta.toLocaleDateString();

    //console.log(this.objCitasRqt.Desde);

    if(this.NullEmpty(param.FechaDesde))
    {
      this.objConsultarSolRqt.FechaDesde = "";
    }
    
    if(this.NullEmpty(param.FechaHasta))
    {
      this.objConsultarSolRqt.FechaHasta = "";
    }


    if(this.NullEmpty(param.HojaServCodigo))
    {
      this.objConsultarSolRqt.HojaServCodigo = "";
    }

    if(this.NullEmpty(param.Volante))
    {
      this.objConsultarSolRqt.Volante = "";
    }

    if(this.NullEmpty(param.BlNbr))
    {
      this.objConsultarSolRqt.BlNbr = "";
    }

    if(this.NullEmpty(param.BkgNbr))
    {
      this.objConsultarSolRqt.BkgNbr = "";
    }

    return false;
  }

  
  public ChangingValueUN(param : any)
  {
    this.EstadoSelect = param.target.value;
  }

  popupNuevoServicio(){
    let res = this.reportService.getValidarHorayFecha();
    res.subscribe( 
      data => { 
        if (data.CodMsj == 1 )
        {
          //localStorage.setItem("paramAccion","Nuevo");
          const dialogRef = this.dialog.open(NuevoSolServComponent,{
            disableClose: true,
            autoFocus: true,
            width: "600px",
            height: "100%"
          });
        /*       dialogRef.afterClosed().subscribe(result => {
            this.RefrescarGrilla();
        }
        ); */
        }
        else
        {
          swal(data.MSj);
        }
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );


 

  }  
  
}
