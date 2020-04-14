import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { CartaTemperaturaRQT,AnularCerrarCartaTemperaturaRQT,AnularCerrarCartaTemperaturaRPT,CartaTemperaturaRPT,ListaEstado} from '../../models/Temperatura';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CartaTemperaturaDetalleComponent} from '../dashboards/cartatemperaturadetalle.component';
import {CartaTemperaturaNuevoComponent} from '../dashboards/cartatemperaturanuevo.component';
import {CartaTemperaturaAvisoComponent} from '../dashboards/cartatemperaturaaviso.component'

@Component({
    selector: 'cartatemperatura',
    templateUrl: 'cartatemperatura.template.html',
    styleUrls: ['cartatemperatura.component.css']
  })

  export class CartaTemperaturaComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public EstadoSelect:string;
    public ListaEstado : Array<ListaEstado>;

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
      this.reportService.getestadolist().subscribe(data => this.ListaEstado = data.Data);
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

    public objCartaTemperaturaRQT : CartaTemperaturaRQT;
    public objAnularCerrarCartaTemperaturaRQT : AnularCerrarCartaTemperaturaRQT;
    public objCartaTemperaturaRPT: Array<CartaTemperaturaRPT>;
    public objAnularCerrarCartaTemperaturaRPT: AnularCerrarCartaTemperaturaRPT;
    
    public ngOnInit():any {      

    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
      console.log(this.objCartaTemperaturaRPT)
    }        

    popupNuevaCartaTemperatura(){
      localStorage.setItem("paramAccion","Nuevo");
      const dialogRef = this.dialog.open(CartaTemperaturaNuevoComponent,{
        disableClose: true,
        autoFocus: true,
        width: "600px",
        height: "100%"
      });
/*       dialogRef.afterClosed().subscribe(result => {
        this.RefrescarGrilla();
        
  }); */

    }  

    popupAnularCartaTemperatura(Id:string, Usuario:string, NroBooking: string){
      localStorage.setItem("MsgCabecera","Seguró que desea anular la carta temperatura para el booking: " + NroBooking);
      const dialogRef = this.dialog.open(CartaTemperaturaAvisoComponent,{
        disableClose: true,
        autoFocus: true,
        width: "300px",
        position: {
          top: '10%'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.AnularCerrarRegistro(Id,Usuario,"Anular")
          this.RefrescarGrilla();
        }
      
    });
    }

    popupCerrarCartaTemperatura(Id:string, Usuario:string, NroBooking: string){
      localStorage.setItem("MsgCabecera","Seguró que desea cerrar carta de temperatura para el booking: " + NroBooking);
      const dialogRef = this.dialog.open(CartaTemperaturaAvisoComponent,{
        disableClose: true,
        autoFocus: true,
        width: "300px",
        position: {
          top: '10%'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.AnularCerrarRegistro(Id,Usuario,"Cerrar")
        this.RefrescarGrilla();
      }
      
    });
    }

    public AnularCerrarRegistro(VId:string, VUsuario:string, VTipo: string){
      
      this.objAnularCerrarCartaTemperaturaRQT = {
        Id: VId,
        Usuario : VUsuario
      };

      if (VTipo=="Anular"){
        let res = this.reportService.AnularCartaTemperatura(this.objAnularCerrarCartaTemperaturaRQT);
        console.log(this.objAnularCerrarCartaTemperaturaRQT)
        res.subscribe( 
          data => { 
            this.objAnularCerrarCartaTemperaturaRPT = data;
            console.log("entre");
            console.log(data);
          }, 
          error => {
            swal({
              text: "Error al cargar los datos",
              icon: "error",
            });
            console.log("Error : ", error); 
          }
        ); 
      }else if (VTipo=="Cerrar"){
        let res = this.reportService.CerrarCartaTemperatura(this.objAnularCerrarCartaTemperaturaRQT);
        console.log(this.objAnularCerrarCartaTemperaturaRQT)
        res.subscribe( 
          data => { 
            this.objAnularCerrarCartaTemperaturaRPT = data;
            console.log("entre");
            console.log(data);
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

    public popupVistaPreviaPDF(paramIdCT:string, paramNombre:string){

      console.log(Number.parseInt(localStorage.getItem("Usuario")) + '-' +
      paramIdCT+ '-' +Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")))

      this.reportService.ImprimirPDF(Number.parseInt(localStorage.getItem("Usuario")),
      paramIdCT,Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"))).subscribe(
        data => {
          
          const linkSource = 'data:application/pdf;base64,' + data;
          const downloadLink = document.createElement("a");
          const fileName = paramNombre + ".pdf";
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
  
        }, (error)=> console.log("Salio error en la descarga: ", error));
    }

    public popupDetalleCartaTemperatura(paramIdCT:string,paramNBooking:string,paramEstado:string){
      localStorage.setItem("paramIdCT",paramIdCT);
      localStorage.setItem("paramNBooking",paramNBooking);
      localStorage.setItem("paramAccion","Editar");
      localStorage.setItem("paramEstadoCarta",paramEstado);

      const dialogRef = this.dialog.open(CartaTemperaturaDetalleComponent,{
        disableClose: true,
        autoFocus: true,
        width: "600px",
        height: "100%"
      });

      dialogRef.afterClosed().subscribe(result => {
          this.RefrescarGrilla();
       
    });
    }
    
    public CargarGrilla(form: NgForm) {

       if (this.TieneData)
      {
        return;
      } 
      
     /*  this.SiCargoData = true;
      this.dtTrigger.next(this.objTemperaturaRPT);
      this.SetGrillaVisibility(true); */
      console.log(form.value.listEstado);
    this.objCartaTemperaturaRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        EntiCodi:"",
        Kvje:"",
        NBooking: form.value.txtbox_Contenedor,
        Emba:"",
        Esta: this.EstadoSelect,
        Desde : form.value.txtbox_Desde,
        Hasta : form.value.txtbox_Hasta
    };
      
       if(this.ValidarInput(this.objCartaTemperaturaRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 

///Aun Falta obtener el servicio ///
       let res = this.reportService.getCartaTemperatura(this.objCartaTemperaturaRQT);
      console.log(this.objCartaTemperaturaRQT)
      
      res.subscribe( 
        data => { 
          this.objCartaTemperaturaRPT = data.Data;
          console.log(data.Data);
          if (data.Data.length >= 1)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objCartaTemperaturaRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objCartaTemperaturaRPT);
               
            });
            this.SetGrillaVisibility(false);
            swal({
              text: "No existen datos",
              icon: "warning",
            });
          }
          //this.dtTrigger.unsubscribe();
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
    
    public RefrescarGrilla(){
      let res = this.reportService.getCartaTemperatura(this.objCartaTemperaturaRQT);
      console.log(this.objCartaTemperaturaRQT)
      
      res.subscribe( 
        data => { 
          this.objCartaTemperaturaRPT = data.Data;
          console.log(data.Data);
          if (data.Data.length >= 1)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objCartaTemperaturaRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objCartaTemperaturaRPT);
               
            });
            this.SetGrillaVisibility(false);
            swal({
              text: "No existen datos",
              icon: "warning",
            });
          }
          //this.dtTrigger.unsubscribe();
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

    public ngOnDestroy():any {
      this.SetGrillaVisibility(false);
      this.dtTrigger.unsubscribe();
    }

    public ValidarInput(param : CartaTemperaturaRQT) : boolean
    {
      var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
/*       if (this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta))
      {
        return true;
      } */
      if(this.NullEmpty(param.Desde))
      {
        this.objCartaTemperaturaRQT.Desde = "";
      }else{
        this.objCartaTemperaturaRQT.Desde = this.objCartaTemperaturaRQT.Desde.toLocaleDateString("es-ES",options);
      }
      if(this.NullEmpty(param.Hasta))
      {
        this.objCartaTemperaturaRQT.Hasta = "";
      }else{
        this.objCartaTemperaturaRQT.Hasta = this.objCartaTemperaturaRQT.Hasta.toLocaleDateString("es-ES",options);
      }
      //console.log(this.objCartaTemperaturaRQT.Desde);
      if(this.NullEmpty(param.Esta)||this.objCartaTemperaturaRQT.Esta == "T")
      {
          this.objCartaTemperaturaRQT.Esta = "";
      }
      if(this.NullEmpty(param.NBooking))
      {
        this.objCartaTemperaturaRQT.NBooking = "";
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
      this.EstadoSelect = param.target.value;
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
