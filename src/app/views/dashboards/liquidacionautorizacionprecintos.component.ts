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
import { UniNegocio,UnidadNegocio}  from '../../models/Factura';
import { AutEntregaPrec,AutEntregaPrecRPT,AutEntregaPrecRQT, ValidaEdiPrecRPT, ValidaEdiPrecRQT, ActualizaPrecRPT,
ActualizaPrecRQT}  from '../../models/Liquidacion';
import { ActualizaprecintoComponent  } from 'app/views/dashboards/actualizaprecinto.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import {CartaTemperaturaDetalleComponent} from './cartatemperaturadetalle.component';
import {RefrendoExpoNuevoComponent} from './refrendoexponuevo.component';

@Component({
    selector: 'liquidacionautorizacionprecintos',
    templateUrl: 'liquidacionautorizacionprecintos.template.html',
    styleUrls: ['liquidacionautorizacionprecintos.component.css']
  })

  export class LiquidacionAutorizacionPrecintosComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    public loading : boolean;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public UniNegocioSelect:string;
    public ModalidadSelect:string;
    public ListaUniNegocio : Array<UnidadNegocio>;
    public ListaModalidad : Array<ListaModalidadRefrendoExpo>;
    myUnidad = new FormControl();    
   

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
      this.reportService.getunidadnegocio().subscribe(
        
        
      //  data => this.ListaUniNegocio = data.Data);

        data => {
      
          //this.objProcPagRPT = data;
          this.ListaUniNegocio = data.Data;
    
          if (this.ListaUniNegocio.length > 0)
      
          { //let uni = this.ListaUniNegocio[0].Descripcion;
            let coduni = this.ListaUniNegocio[0].Codigo;
            
            this.myUnidad.setValue(coduni.toString());
            this.UniNegocioSelect = coduni;
            //this.EstadoSelect = coduni;
            }
    
         // this.router.navigate(['home']);    
    
        },  
        error => {
          swal({
            text: "Error al cargar Unidades de Negocio",
            icon: "error",
          });
      //    this.onIsError();           
          console.log("Error");}
        );

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
      buttons: [
        'colvis',
        {
            extend: 'excel',
            exportOptions: {
                columns: ':visible'
            }
        }     
      ],    
      processing: true,
      fixedColumns:   true,
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

    
    public objAutEntregaPrecRQT : AutEntregaPrecRQT;
    public objListaAutEntregaPrec: Array<AutEntregaPrec>;   
    public objListaAutEntregaPrecF: Array<AutEntregaPrec>;   
    public objAutEntregaPrecRPT : AutEntregaPrecRPT;
    

    public objValidaEdiPrecRQT : ValidaEdiPrecRQT; 
    public objValidaEdiPrecRPT : ValidaEdiPrecRPT;
    
    
    public objActualizaPrecRQT : ActualizaPrecRQT; 
    public objActualizaPrecRPT : ActualizaPrecRPT;

    public ngOnInit():any {   
      
    this.loading = false;

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
    console.log(Number.parseInt(this.UniNegocioSelect));
    //console.log(this.ModalidadSelect);

  /*  this.objConsultaRefrendoExpoRQT = {
        IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        TipoConsulta: "",
        Booking: form.value.txtbox_NroDocumento,
        Modalidad: this.ModalidadSelect,
        Estado : Number.parseInt(this.UniNegocioSelect)
    };*/

    this.objAutEntregaPrecRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      UnidadNegocio : this.UniNegocioSelect,
      Documento : form.value.txtbox_NroDocumento,
      Persona : form.value.txtbox_Persona
      };
      
       if(this.ValidarInput(this.objAutEntregaPrecRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 

      this.loading = true;

      this.dtOptions.columnDefs = [
        {
            "targets": [ 0 ],
            "visible": false
          }
      ];

///Aun Falta obtener el servicio ///
       //let res = this.reportService.ConsultaRefrendoExpo(this.objConsultaRefrendoExpoRQT);
       let res = this.reportService.getAutorizacionPersonal(this.objAutEntregaPrecRQT);

      console.log(this.objAutEntregaPrecRQT)
      
      res.subscribe( 
        data => { 
          //this.objConsultaRefrendoExpoRPT = data.data;
          this.objAutEntregaPrecRPT = data;


          console.log(data);
          if (data.Msj == "OK")
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.objListaAutEntregaPrec = data.data;

           // this.objListaAutEntregaPrecF = this.objListaAutEntregaPrec.sort((a, b) => (a.LiquCodigo >= b.LiquCodigo) ? 1 : -1)
            //this.objListaAutEntregaPrecF = this.objListaAutEntregaPrec.sort();
            this.loading = false;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objListaAutEntregaPrec); 
              this.SetGrillaVisibility(true);        
            });
         
           
          }
          else
          {
            this.SiCargoData = true;
            this.loading = false;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objListaAutEntregaPrec);
               this.SetGrillaVisibility(true);
            });
            swal("No existen datos");
          }
          //this.dtTrigger.unsubscribe();
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

    ActualizarPrecinto(Codigo:number, RegiCod: string, Nombres : string, dni: string,Empresa:string)
    {

      this.objValidaEdiPrecRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        CodLiqu : Codigo,
        NombreCompleto : Nombres,
        DNI : dni ,
        EmpresaPertenece : Empresa        
        };

        let res = this.reportService.ValidaEdiPrec(this.objValidaEdiPrecRQT);

       // console.log(this.objAutEntregaPrecRQT)
        
        res.subscribe( 
          data => { 
            //this.objConsultaRefrendoExpoRPT = data.data;
            this.objValidaEdiPrecRPT = data;
  
            console.log(data);
            if (data[0].Cod == 1)
            {
              //this.SiCargoData = true;
              //this.dtTrigger.next(this.objTemperaturaRQT);
              //this.SetGrillaVisibility(true);
              // this.TieneData = true;

              swal(data[0].Msj);
  
             
             
            }
            else
            {
              localStorage.setItem("CodLiqui", Codigo.toString());
              localStorage.setItem("RegiCod", RegiCod.toString());
              localStorage.setItem("NombreCompleto", Nombres);
              localStorage.setItem("DNICarnet", dni);
              localStorage.setItem("EmpresaPert", Empresa);
              
                                        
              const dialogRef = this.dialog.open(ActualizaprecintoComponent,{
                disableClose: true,
                autoFocus: true,
                width: "500px",
                height : "500px",
                position: {
                  top: '10%'
                  }
              });
              
            dialogRef.afterClosed().subscribe(  result => { 
              
            let grabo =  localStorage.getItem("GraboPrec");

            if (grabo == "Si")               
            {this.RefrescarGrilla();}
            }
            );

         
            }
            //this.dtTrigger.unsubscribe();
          }, 
          error => {
            swal("Error al cargar los datos"); 
            console.log("Error : ", error); 
          }
        );  
  




    }        
    
    public RefrescarGrilla(){
     
      this.loading = true;

      let res = this.reportService.getAutorizacionPersonal(this.objAutEntregaPrecRQT);

      console.log(this.objAutEntregaPrecRQT)
      
      res.subscribe( 
        data => { 
          //this.objConsultaRefrendoExpoRPT = data.data;
          this.objAutEntregaPrecRPT = data;

          console.log(data);
          if (data.Msj == "OK")
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.objListaAutEntregaPrec = data.data;

            this.loading = false;

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objListaAutEntregaPrec);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.loading = false;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objListaAutEntregaPrec);
               this.SetGrillaVisibility(true);
            });
            swal("No existen datos");
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

    public ValidarInput(param : AutEntregaPrecRQT) : boolean
    {

      if(this.NullEmpty(param.UnidadNegocio))
      {
        swal("Debe seleccionar una Unidad de Negocio");
        return true;      
      }
      if(this.NullEmpty(param.Documento))
      {
        this.objAutEntregaPrecRQT.Documento = "";
      }
      if(this.NullEmpty(param.Persona))
      {
        this.objAutEntregaPrecRQT.Persona = "";
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
      if (paramTipo== "UniNegocio"){
        this.UniNegocioSelect = param.target.value;
      }
      if (paramTipo== "Modalidad"){
        this.ModalidadSelect = param.target.value;
      }
    }
  
}
