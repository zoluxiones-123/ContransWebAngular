import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio, TipoCarga, TiposCarga, Almacenes, Almacen, AlmacenRQT } from '../../models/Factura';
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


import { MatDialog, MatDialogConfig, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import {CartaTemperaturaAvisoComponent} from '../dashboards/cartatemperaturaaviso.component'
import "rxjs/add/operator/toPromise";

@Component({
  selector: 'app-consultacitas',
  templateUrl: './consultacitas.component.html',
  styleUrls: ['./consultacitas.component.css']
})


export class ConsultacitasComponent implements AfterViewInit, OnDestroy, OnInit {  

    
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  public SiCargoData = true;
  public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
  public ListaTiposCarga : Array<TipoCarga> = [];
  public TipoCargaE : TiposCarga;
  public isError = false;
  public ListaAlmacenes : Array<Almacen> = [];
  public AlmacenE : Almacenes;
  public objAlmacenRqt : AlmacenRQT = {
    EmpaCodigo : ""
  };

  public loading = false;

  public ListaCitas : Array<CitasRPT>;
  public CitaE : Citas;
  public objCitasRqt : CitasRQT = {
    Token: "",
    IDRol: 0,
    TCarga: "",
    Almacen: "",
    NroCita: "",
    Documento: "",
    Registro: "",
    Permiso: "",
    Desde: "",
    Hasta: ""
   };

  public TieneData = false;
  public UnidadNegSelect:string;
  public TipoCargaSelect:string;
  

  minDate: Date;
  maxDate: Date;
  
  constructor(private reportService: ReportService, private dialog : MatDialog, private router: Router) { 
    this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);


    this.ListaTiposCarga = new Array;

    this.reportService
    .getTipoCarga()
    .subscribe(
    data => {
      
      this.TipoCargaE = data;

      if (this.TipoCargaE.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.TipoCargaE.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaTiposCarga.push(last);      
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

  setearFechasLimite(){
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
  }

  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
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
    //this.SetClienteInput();
    this.setearFechasLimite();

    this.objCitasRqt.Token = this.reportService.getToken();
    this.objCitasRqt.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));

  }  

  popupGenerarCita(NroCita:string, TipoOpe:string)
  {
   const dialogRef = this.dialog.open(GenerarcitaComponent,{
    disableClose: true,
    autoFocus: true,
    width: "500px",
    height : "500px",
    position: {
      top: '10%'
    }
  });

  /*  const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "500px";
    dialogConfig.width = "1500px";
    this.dialog.open(GenerarcitaComponent, dialogConfig);   
    return false;  
*/

 

  }
  
  
  //popupAnularCartaTemperatura(Id:string, Usuario:string, NroBooking: string)  {
    //localStorage.setItem("MsgCabecera","Seguró que desea anular la carta temperatura para el booking: " + NroBooking);
    popupAnularCita(NroCita:string, TipoOpe:string)
    {
    localStorage.setItem("NroCita",NroCita);
    localStorage.setItem("OperacionCita",TipoOpe); 

    const dialogRef = this.dialog.open(ActualizarcitaComponent,{
      disableClose: true,
      autoFocus: true,
      width: "500px",
      height : "500px",
      position: {
        top: '10%'
      }
    });

    
    dialogRef.afterClosed().subscribe(  result => {         
    this.RefrescarGrilla();}
    );

   /* dialogRef.afterClosed().subscribe(result => {
      if (result){    
        this.RefrescarGrilla();
      }
    
  });*/
  }

  popupActualizarCita(NroCita:string, TipoOpe:string)
  {
  localStorage.setItem("NroCita",NroCita);
  localStorage.setItem("OperacionCita",TipoOpe); 

  const dialogRef = this.dialog.open(ActualizarcitaComponent,{
    disableClose: true,
    autoFocus: true,
    width: "500px",
    height : "500px",
    position: {
      top: '10%'
    }
  });

  
 /* dialogRef.afterClosed().subscribe(  result => {         
  this.RefrescarGrilla();}
  );*/

 /* dialogRef.afterClosed().subscribe(result => {
    if (result){    
      this.RefrescarGrilla();
    }
  
});*/
}


popupImprimirCita(NroCita:string, Documento : string, Registro:string, Permiso: string, TipoOpe:string)

{
localStorage.setItem("NroCita",NroCita);
localStorage.setItem("Documento",Documento);
localStorage.setItem("Registro",Registro);
localStorage.setItem("Permiso",Permiso);
localStorage.setItem("OperacionCita",TipoOpe); 

const dialogRef = this.dialog.open(ActualizarcitaComponent,{
  disableClose: true,
  autoFocus: true,
  width: "500px",
  height : "500px",
  position: {
    top: '10%'
  }
});
}
  
/*  popupActualizarCita(NroCita:string, TipoOpe:string){

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "500px";
    dialogConfig.width = "500px";
    localStorage.setItem("NroCita",NroCita);
    localStorage.setItem("OperacionCita",TipoOpe); 
    this.dialog.open(ActualizarcitaComponent, dialogConfig);   
    return false;  
  


  } */
  
 /* popupAnularCita(){
   
    
          const dialogRef = this.dialog.open(ActualizarcitaComponent,{
            disableClose: true,
            autoFocus: true,
            width: "500px",
            height : "100%",
            position: {
              top: '10%'
            }
          });
    
          dialogRef.afterClosed().subscribe(result => {
   
          this.RefrescarGrilla()
        });

        }*/

  GenerarCita()
  {
   
    /*const dialogRef = this.dialog.open(GenerarcitaComponent,{
      disableClose: true,
      autoFocus: true,
      width: "1000px",
      height : "500px"     
    });*/

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "100%";
    dialogConfig.width = "2000px";
    this.dialog.open(GenerarcitaComponent, dialogConfig); 
    return false;

  }

  public RefrescarGrilla(){
    
    let res = this.reportService.getCitas(this.objCitasRqt);
        
    res.subscribe( 
      data => { 
        this.ListaCitas = data.Data;
        if (data.Data.length >= 1)
        {
          this.SiCargoData = true;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.ListaCitas);
            this.SetGrillaVisibility(true);
          });

        }
        else
        {
          this.SiCargoData = true;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.ListaCitas);
             this.SetGrillaVisibility(true);
          });

          swal("No existen datos");
        
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

  public CargarGrilla(form: NgForm) {

    if (this.TieneData)
    {
      return;
    }

    this.objCitasRqt = {
    Token : this.reportService.getToken(),
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    TCarga: this.TipoCargaSelect,
    Almacen:  this.UnidadNegSelect,
    NroCita: form.value.txtbox_Cita,
    Documento:  form.value.txtbox_Documento,
    Registro: form.value.txtbox_Registro,
    Permiso: form.value.txtbox_Permiso,
    Desde : form.value.txtbox_Desde,
    Hasta : form.value.txtbox_Hasta

    };
    
  localStorage.setItem("TCarga", this.objCitasRqt.TCarga);
  localStorage.setItem("TAlmacen",this.objCitasRqt.Almacen);

    if(this.ValidarInput(this.objCitasRqt))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }

    this.loading = true;


    let res = this.reportService.getCitas(this.objCitasRqt);
        
    res.subscribe( 
      data => { 
        this.ListaCitas = data.Data;
        if (data.Data.length >= 1)
        {
          this.SiCargoData = true;
          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.ListaCitas);
            this.SetGrillaVisibility(true);
          });

        }
        else
        {
          this.SiCargoData = true;
          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.ListaCitas);
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
  
  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
  }

  public ValidarInput(param : CitasRQT) : boolean
  {
    /*this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta)*/

    if (this.NullEmpty(this.UnidadNegSelect) || this.NullEmpty(this.TipoCargaSelect))
    {
      return true;
    }


    console.log(this.objCitasRqt.Desde);

    if(this.NullEmpty(param.Desde))
    {
      this.objCitasRqt.Desde = "";
    }
    
    if(this.NullEmpty(param.Hasta))
    {
      this.objCitasRqt.Hasta = "";
    }

    if(this.NullEmpty(param.Documento))
    {
      this.objCitasRqt.Documento = "";
    }

    if(this.NullEmpty(param.NroCita))
    {
      this.objCitasRqt.NroCita = "";
    }

    if(this.NullEmpty(param.Registro))
    {
      this.objCitasRqt.Registro = "";
    }

    if(this.NullEmpty(param.Permiso))
    {
      this.objCitasRqt.Permiso = "";
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
    this.TipoCargaSelect = param.target.value;
    this.objAlmacenRqt.EmpaCodigo = this.TipoCargaSelect;
    
    this.ListaAlmacenes = new Array;

    this.reportService
    .getunidadnegocioxtipo(this.objAlmacenRqt)
    .subscribe(
    data => {
      
      this.AlmacenE = data;

      if (this.AlmacenE.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.AlmacenE.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaAlmacenes.push(last);      
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

  
  public ChangingValueUN(param : any)
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

