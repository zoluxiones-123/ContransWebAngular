import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
//import { CartaTemperaturaRQT,AnularCerrarCartaTemperaturaRQT,AnularCerrarCartaTemperaturaRPT,CartaTemperaturaRPT,ListaEstado} from '../../models/Temperatura';
import { ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo,ConsultaRefrendoExpoRQT,ConsultaRefrendoExpoRPT}  from '../../models/RefrendoExpo';
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
//import {CartaTemperaturaDetalleComponent} from './cartatemperaturadetalle.component';
import {RefrendoExpoNuevoComponent} from './refrendoexponuevo.component';
import {RefrendoExpoEditarComponent} from './refrendoexpoeditar.component';
import {RefrendoExpoAnularComponent} from './refrendoexpoanular.component';


@Component({
    selector: 'refrendoexpo',
    templateUrl: 'refrendoexpo.template.html',
    styleUrls: ['refrendoexpo.component.css']
  })

  export class RefrendoExpoComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public Seleccion_Opcion: string;
    public EstadoSelect:string;
    public ModalidadSelect:string;
    public ListaEstado : Array<ListaEstadoRefrendoExpo>;
    public ListaModalidad : Array<ListaModalidadRefrendoExpo>;

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
      this.Seleccion_Opcion="B"
      this.reportService.ConsultaEstadoRefrendoExpo().subscribe(data => this.ListaEstado = data.data);
      this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
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

/*     public objCartaTemperaturaRQT : CartaTemperaturaRQT;
    public objAnularCerrarCartaTemperaturaRQT : AnularCerrarCartaTemperaturaRQT;
    public objCartaTemperaturaRPT: Array<CartaTemperaturaRPT>;
    public objAnularCerrarCartaTemperaturaRPT: AnularCerrarCartaTemperaturaRPT; */

    public objConsultaRefrendoExpoRQT : ConsultaRefrendoExpoRQT;
    public objConsultaRefrendoExpoRPT: Array<ConsultaRefrendoExpoRPT>;
    
    public ngOnInit():any {      

    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);
    
    }        
    popupNuevaRefrendoExpo(){
      localStorage.setItem("paramAccion","Nuevo");
      const dialogRef = this.dialog.open(RefrendoExpoNuevoComponent,{
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
    popupEditarRefrendoExpo(paramCodigo: string,paramEstado: string ){

      if (paramEstado =="Pendiente"){
        localStorage.setItem("paramAccion","Editar");
      }else{
        localStorage.setItem("paramAccion","Ver");
      }
      

      localStorage.setItem("paramCodigo",paramCodigo);
      const dialogRef = this.dialog.open(RefrendoExpoEditarComponent,{
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
    popupAnularRefrendoExpo(paramCodigo: string){
      localStorage.setItem("paramAccion","Anular");
      localStorage.setItem("paramCodigoAnular",paramCodigo);
      const dialogRef = this.dialog.open(RefrendoExpoAnularComponent,{
        disableClose: true,
        autoFocus: true,
        width: "600px",
        height: "60%"
      });
/*       dialogRef.afterClosed().subscribe(result => {
        this.RefrescarGrilla();
     
  }
  ); */

    }  
/*     popupAnularCartaTemperatura(Id:string, Usuario:string, NroBooking: string){
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
    } */

/*     popupCerrarCartaTemperatura(Id:string, Usuario:string, NroBooking: string){
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
    } */

/*     public AnularCerrarRegistro(VId:string, VUsuario:string, VTipo: string){
      
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
 

    } */

/*     public popupVistaPreviaPDF(paramIdCT:string, paramNombre:string){

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
    } */

/*     public popupDetalleCartaTemperatura(paramIdCT:string,paramNBooking:string){
      localStorage.setItem("paramIdCT",paramIdCT);
      localStorage.setItem("paramNBooking",paramNBooking);
      localStorage.setItem("paramAccion","Editar");
      const dialogRef = this.dialog.open(CartaTemperaturaDetalleComponent,{
        disableClose: true,
        autoFocus: true,
        width: "600px",
        height: "100%"
      });

      dialogRef.afterClosed().subscribe(result => {
          this.RefrescarGrilla();
       
    });
    } */
    
    public CargarGrilla(form: NgForm) {

       if (this.TieneData)
      {
        return;
      } 
      
     /*  this.SiCargoData = true;
      this.dtTrigger.next(this.objTemperaturaRPT);
      this.SetGrillaVisibility(true); */
    console.log(Number.parseInt(this.EstadoSelect));
    console.log(this.ModalidadSelect);
    this.objConsultaRefrendoExpoRQT = {
        IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        TipoConsulta:  this.Seleccion_Opcion,
        Booking: form.value.txtbox_NroDocumento,
        Modalidad: this.ModalidadSelect,
        Estado : Number.parseInt(this.EstadoSelect)
    };
      
       if(this.ValidarInput(this.objConsultaRefrendoExpoRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 

///Aun Falta obtener el servicio ///
       let res = this.reportService.ConsultaRefrendoExpo(this.objConsultaRefrendoExpoRQT);
      console.log(this.objConsultaRefrendoExpoRQT)
      
      res.subscribe( 
        data => { 
          this.objConsultaRefrendoExpoRPT = data.Data;
          console.log(data.Data);
          if (data.CodMsj == 0)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objConsultaRefrendoExpoRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objConsultaRefrendoExpoRPT);
            });
            this.SetGrillaVisibility(false);
            swal({
              text: data.Msj,
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
      let res = this.reportService.ConsultaRefrendoExpo(this.objConsultaRefrendoExpoRQT);
      console.log(this.objConsultaRefrendoExpoRQT)
      
      res.subscribe( 
        data => { 
          this.objConsultaRefrendoExpoRPT = data.Data;
          console.log(data.Data);
          if (data.CodMsj == 0)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objConsultaRefrendoExpoRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objConsultaRefrendoExpoRPT);
            });
            this.SetGrillaVisibility(false);
            swal({
              text: data.Msj,
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

    public ValidarInput(param : ConsultaRefrendoExpoRQT) : boolean
    {
      if(this.NullEmpty(param.Booking))
      {
        this.objConsultaRefrendoExpoRQT.Booking = "";
      }
      if(this.NullEmpty(param.Modalidad))
      {
        return true;
      }
      if(this.NullEmpty(param.Estado))
      {
        return true;
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

    public ChangingValue(param : any, paramTipo: string)
    {
      if (paramTipo== "Estado"){
        this.EstadoSelect = param.target.value;
      }
      if (paramTipo== "Modalidad"){
        this.ModalidadSelect = param.target.value;
      }
    }
  
}
