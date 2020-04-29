import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsultarSolicitudRPT,ConsultarSolicitudRQT,EstSolServicio,EstadoSolServicio, SolicitudServicio,ImprimirSolicitudRPT,ImprimirSolicitudRQT } 
from '../../models/SolicitudServicio';
import { CitasRPT, CitasRQT, Citas } from '../../models/Cita';

import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { AnularsolservComponent  } from 'app/views/dashboards/anularsolserv.component';
import { GenerarcitaComponent  } from 'app/views/dashboards/generarcita.component';
import {NuevoSolServComponent} from './nuevosolserv.component';
import { DatePipe } from '@angular/common';
import {SwAlert} from 'app/models/swalert';
import Swal from 'sweetalert2';


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
  public ListaSolServ : Array<SolicitudServicio>;
  //public ListaTiposCarga : Array<TipoCarga> = [];
  //public TipoCargaE : TiposCarga;
  public isError = false;
  public FilePathDJ : string = "";
  public NombreArchivoDJ : string = "";
    
  public FilePathExpo : string = "";
  public NombreArchivoExpo : string = "";

  public FilePathImpo : string = "";
  public NombreArchivoImpo : string = "";

  public loading : boolean;

  
  myFechaDesde = new FormControl();
  myFechaHasta = new FormControl();

  public Hoy: Date;
  public FechaDesde: Date;

  
  public ListaEstSol : Array<EstSolServicio> = [];
  public EstadoSolServ : EstadoSolServicio;

  notificaciones = [];
  

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

   
  public objImprimirSolRqt : ImprimirSolicitudRQT = {
    IDUser: 0,
    IDRol: 0,
    HojaServCodigo: "" 
   };

   
  public objImprimirSolRpt : ImprimirSolicitudRPT = {
   Cod : -1,
   Msj: "" 
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

   this.loading = false;

   this.FilePathDJ = "C://Documentos//declaracion_jurada_reconocimiento_fisico.pdf";
   this.NombreArchivoDJ = "declaracion_jurada_reconocimiento_fisico";

   this.FilePathImpo = "C://Documentos//Manual_de_usuario_de_Programacion_de_servicios_de_importacion.pdf";
   this.NombreArchivoImpo = "Manual_de_usuario_de_Programacion_de_servicios_de_importacion";

   this.FilePathExpo = "C://Documentos//Manual_de_usuario_de_Programacion_de_servicios_de_exportacion.pdf";
   this.NombreArchivoExpo = "Manual_de_usuario_de_Programacion_de_servicios_de_exportacion";

    //let date = new Date("Sun Mar 15 2020");

    //let fechaact = new Date();

/*   let hoy = new Date();
   let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 7;
   let suma = hoy.getTime() - semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
   let fechaDesde = new Date(suma);


    var datePipe = new DatePipe("en-US");
    let value = datePipe.transform(fechaDesde.toString(), 'dd-MM-yyyy');
    let fechaHasta = datePipe.transform(hoy.toString(), 'dd-MM-yyyy');
    
    this.myFechaDesde.setValue(value.toString());
    this.myFechaHasta.setValue(fechaHasta.toString());

    this.myFechaDesde.setValue(fechaDesde);
    this.myFechaHasta.setValue(hoy);*/



   
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
      {
          extend: 'excel',
          exportOptions: {
              columns: ':visible'
          }
      }     
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

  popupAnularSolServ(NroSolServ:string)
  {
  localStorage.setItem("NroSolServ",NroSolServ);

  const dialogRef = this.dialog.open(AnularsolservComponent,{
    disableClose: true,
    autoFocus: true,
    width: "500px",
    height : "500px",
    position: {
      top: '10%'
    }
  });

  
  dialogRef.afterClosed().subscribe(  result => { 

    let AnuloSolServ =  localStorage.getItem("AnuloSolServ").toString();

      if (AnuloSolServ == "Si")
      {this.RefrescarGrilla();}    
  }

  );

 
}

 CalculateDate(date1, date2){
  //our custom function with two parameters, each for a selected date
  let diffc;
  let days;
   
    diffc = date1.getTime() - date2.getTime();
    //getTime() function used to convert a date into milliseconds. This is needed in order to perform calculations.
   
    days = Math.round(Math.abs(diffc/(1000*60*60*24)));
    //this is the actual equation that calculates the number of days.
   
  return days;
  }

  public ImprimirSolServ(CodigoServicio : string)
  {

    this.objImprimirSolRqt = {  
    IDUser:  Number(localStorage.getItem("Usuario").toString()), 
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    HojaServCodigo : CodigoServicio
    };

    this.notificaciones = [];

    this.reportService.ImprimirSolicitudServicio(this.objImprimirSolRqt)
    .subscribe(
      data => {
        
        this.objImprimirSolRpt = data;
  
        if (data.Cod == 0)
        {               
          
          const linkSource = 'data:application/pdf;base64,' + data.Msj.toString();
          const downloadLink = document.createElement("a");
          const fileName = "SolicitudServicio" + CodigoServicio + ".pdf";
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
          

       /*   let modal = new SwAlert( 
            "",
            `<div class="form-control" style="overflow-y: scroll; height:700px; text-align: justify;">` + data + "</div>",
             700
            );
  
            this.notificaciones.push(modal);       
            
          
            Swal.queue(this.notificaciones);
  */
            
          }
         
  
        else{
         // this.loading = false;
          swal({
            text: "Error al Imprimir Solicitud de Servicio",
            icon: "error",
          });
  

        }

      }
    );

  }

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

  RefrescarGrilla()
  {
    

    let res = this.reportService.getSolicitudServicio(this.objConsultarSolRqt);
    
    this.loading = true;

    res.subscribe( 
      data => { 
        this.objConsultarSolRpt = data;
        if (data.Msj == "Ok")
        {
          this.SiCargoData = true;

          this.ListaSolServ =  this.objConsultarSolRpt.data;

          
          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.ListaSolServ);
            this.SetGrillaVisibility(true);
          });

        }
        else
        {
          this.SiCargoData = true;
          
          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.ListaSolServ);
             this.SetGrillaVisibility(true);
          });

          swal("No existen datos");
        
        }
      }, 
      error => {

        this.loading = false;
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
        console.log("Error : ", error); 
      }
    );

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
    //FechaDesde: this.myFechaDesde.value,
    FechaHasta: form.value.txtbox_Hasta ,
    //FechaHasta:  this.myFechaHasta.value,    
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

    this.loading = true;

    //this.ListaSolServ = new Array;
        
    res.subscribe( 
      data => { 
        this.objConsultarSolRpt = data;
        if (data.Msj == "Ok")
        {
          this.SiCargoData = true;

          this.ListaSolServ =  this.objConsultarSolRpt.data;

          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.ListaSolServ);
            this.SetGrillaVisibility(true);
          });

        }
        else
        {
          this.ListaSolServ = [];
          
          this.SiCargoData = true;

          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.ListaSolServ);
             this.SetGrillaVisibility(true);
          });

          swal("No existen datos");
        
        }
      }, 
      error => {
        this.loading = false;
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
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

   /* if (this.NullEmpty(param.FechaDesde) || this.NullEmpty(param.FechaHasta))
    {
      return true;
    }*/

    //console.log(this.objCitasRqt.Desde);

    if(this.NullEmpty(param.FechaDesde))
    {
      this.objConsultarSolRqt.FechaDesde = "";
    }
    
    if(this.NullEmpty(param.FechaHasta))
    {
      this.objConsultarSolRqt.FechaHasta = "";
    }

    if ((this.objConsultarSolRqt.FechaDesde != "" && this.objConsultarSolRqt.FechaHasta == "") ||  (this.objConsultarSolRqt.FechaHasta != "" && this.objConsultarSolRqt.FechaDesde == ""))
    {
      return true;
    }

    if (this.objConsultarSolRqt.FechaDesde != "")
    {this.objConsultarSolRqt.FechaDesde = this.objConsultarSolRqt.FechaDesde.toLocaleDateString();}

    
    if (this.objConsultarSolRqt.FechaHasta != "")
    {this.objConsultarSolRqt.FechaHasta = this.objConsultarSolRqt.FechaHasta.toLocaleDateString();}

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
        if (data.CodMsj == 1 )//Cambiar 1 para limitar por hora | 0 para quitar el limite de hora
        {
          localStorage.setItem("paramDiasRepeticion",data.DiasRepeticion);
          localStorage.setItem("paramDiaMas",data.DiaMas);
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
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
        console.log("Error : ", error); 
      }
    );


 

  }  
  
}
