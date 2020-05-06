import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
//import { CartaTemperaturaRQT,AnularCerrarCartaTemperaturaRQT,AnularCerrarCartaTemperaturaRPT,CartaTemperaturaRPT,ListaEstado} from '../../models/Temperatura';
import { ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo,ConsultaRefrendoExpoRQT,ConsultaRefrendoExpoRPT}  from '../../models/RefrendoExpo';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { UniNegocio,UnidadNegocio}  from '../../models/Factura';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import {CartaTemperaturaDetalleComponent} from './cartatemperaturadetalle.component';
import {RefrendoExpoNuevoComponent} from './refrendoexponuevo.component';
import { Observable } from "rxjs/internal/Observable";
import { entidad,Entidades } from 'app/models/entidad';
import { startWith, map } from 'rxjs/operators';
import {SwAlert} from 'app/models/swalert';
import Swal from 'sweetalert2';

import { ConsultaPendientesRPT, ConsultaPendientesRQT, PendientePago, PagoProcesar, PagosProcesarRPT, PagosProcesarRQT}  from '../../models/Pagos';

@Component({
    selector: 'pagoscobranza',
    templateUrl: 'pagoscobranza.template.html',
    styleUrls: ['pagoscobranza.component.css']
  })

  export class PagosCobranzaComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public EstadoSelect:string;
    public ModalidadSelect:string;
    public ListaUniNegocio : Array<UnidadNegocio>;
    public ListaEstado : Array<ListaEstadoRefrendoExpo>;
    public ListaModalidad : Array<ListaModalidadRefrendoExpo>;
    myCliente = new FormControl();    
    myUnidad = new FormControl();    
    
    public ListaEmpresas : Array<entidad> = [];
    public LEmpresas : Entidades;
    public ClienteSelect : string;
    public NClienteSelect : string;
    public Documento : string = "";

    public objConsPenRQT : ConsultaPendientesRQT;
    public objConsPenRPT : ConsultaPendientesRPT;    
    public objPendCancL : Array<PendientePago>;
    public ProcPago : boolean = false;

    
    public objProcPagRQT : PagosProcesarRQT;
    public objProcPagRPT : PagosProcesarRPT;
    
    public objProcPag : Array<PagoProcesar>;
    public Total : number = 0;
    public Moneda: string = "";
    public MonedaCod: string = "";
    public Tope: string = "";

    public MuestraProc : boolean = false;
    public loading : boolean = false;

    
    notificaciones = [];
    
    
    
    
    public isError = false;

    
  filteredEmp: Observable<entidad[]>;

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){

      this.reportService.getunidadnegocio().subscribe(
       // data => this.ListaUniNegocio = data.Data);

        data => {
      
          //this.objProcPagRPT = data;
          this.ListaUniNegocio = data.Data;
    
          if (this.ListaUniNegocio.length > 0)
      
          { //let uni = this.ListaUniNegocio[0].Descripcion;
            let coduni = this.ListaUniNegocio[0].Codigo;
            
            this.myUnidad.setValue(coduni.toString());
            //this.EstadoSelect = coduni;
            }
    
         // this.router.navigate(['home']);    
    
        },  
        error => {
          swal({
            text: "Error al cargar Unidades de Negocio",
            icon: "error",
          });
          this.onIsError();           
          console.log("Error");}
        );
    
    


     /* if (this.ListaUniNegocio.length > 0)
      
      { let uni = this.ListaUniNegocio[0].Descripcion;
        let coduni = this.ListaUniNegocio[0].Codigo;
        
        this.myUnidad.setValue(uni.toString());
        this.EstadoSelect = coduni;
        }*/

    //  this.reportService.ConsultaEstadoRefrendoExpo().subscribe(data => this.ListaEstado = data.data);
    //  this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
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
    
    public ngOnInit():any {      

    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);

   

      

      
    
  this.filteredEmp = this.myCliente.valueChanges.pipe(
    startWith(''),
    map(value => this._filteremp(value))
  );

  this.ListaEmpresas = new Array;

  this.reportService
  .getListaEntidades()
  .subscribe(
    data => {
      
      this.LEmpresas = data;

      if (this.LEmpresas.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEmpresas.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEmpresas.push(last);
          //this.options.push(last.Nombre);
        }

      
      }
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }

     // this.router.navigate(['home']);    

    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

    
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

    
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  ProcesarPago()
  {

    let cant = 0;

    for (var i = 0; i <=  this.objPendCancL.length-1; i++) {
     
      if (this.objPendCancL[i].TMon == "DOL")
      {
        this.objPendCancL[i].Currency = "$/"
      }
      else
      {
        this.objPendCancL[i].Currency = "S/."
      }

      if (this.objPendCancL[i].Selec == true)
      {
        cant = cant + 1;
      }
           //this.options.push(last.Nombre);
    }

    if (cant == 0)
     { swal("Debe seleccionar al menos una fila para procesar pago");
    return;}
   /* else
     {swal("Se empieza el proceso de pago");}*/

    this.objProcPag = new Array;

    this.Total = 0;
   
    for (var i = 0; i <=  this.objPendCancL.length-1; i++) {
     
      if (this.objPendCancL[i].Selec == true)
      {
    
        this.Total = this.Total + Number.parseFloat(this.objPendCancL[i].Total.toFixed(2));

        this.Moneda = this.objPendCancL[i].TMon;
        this.MonedaCod = this.objPendCancL[i].MCod;
        this.Tope =  this.objPendCancL[i].GrupoServicio;

        let procpag = new PagoProcesar();
        procpag.NumDoc = this.objPendCancL[i].Documento;
        procpag.ImporteDoc = Number.parseFloat(this.objPendCancL[i].Total.toFixed(2));
        procpag.KDoc = this.objPendCancL[i].Liquidacion;
        procpag.Orig = this.objPendCancL[i].CodUnidadNegocio;
        procpag.TGrupo = this.objPendCancL[i].GrupoServicio;
        procpag.TDoc = this.objPendCancL[i].TDoc;
        procpag.TMOV = "";

        this.objProcPag.push(procpag);

      }
           //this.options.push(last.Nombre);
    }

    this.objProcPagRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      TMon: this.Moneda,
      MCod: this.MonedaCod,
      Itot: Number.parseFloat(this.Total.toFixed(2)),
      Tope: this.Tope,
      Data: this.objProcPag
  };

  this.notificaciones = [];

  /*swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'question'
   }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })*/

    Swal({
      title: '¿Esta seguro que desea generar la operación?',
     /* text: "You won't be able to revert this!",*/
      type : 'question',
      showCancelButton : true,
      confirmButtonText: "Aceptar",
      cancelButtonText : "Cancelar",
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
      /* Si acepto procesar el pago, se llama al servicio de procesar pago*/
  this.loading = true;
  this.reportService
  .ProcesarPagosOnLine(this.objProcPagRQT)
  .subscribe(
    data => {
      
      this.objProcPagRPT = data;

      if (data.Cod == 0)
      {                              
        let modal = new SwAlert( 
          "",
          `<div class="form-control" style="overflow-y: scroll; height:700px; text-align: justify;">` + data.Msj + "</div>",
           700
          );

          this.notificaciones.push(modal);       
          
          this.loading = false;
          
          Swal.queue(this.notificaciones);

          this.RefrescarGrilla();
          
        }
       

      else{
        this.loading = false;
        swal({
          text: "Error al Procesar Pago",
          icon: "error",
        });

     //   localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }

     // this.router.navigate(['home']);    

    },  
    error => {
      swal({
        text: "Error del servicio Procesar Pago",
        icon: "error",
      });
      this.onIsError();           
      console.log("Error");}
    );





      }
    })

 
    
    


  }

  

  public CheckedSADA(param : any)
  {
    let chekeado = param.currentTarget.checked;

   /* if (chekeado == true)
    {
      swal({
        title: "Alerta Contrans",
        text:   "Confirmar a: \n DireccionamientosContrans@contrans.com.pe \n canal seleccionado en DAM 2 días antes del \n arribo de la nave",      
        icon: "warning"
      });
    }*/

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

    this.objConsPenRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      EntiCodigoCliente: this.ClienteSelect,
      Documento: form.value.txtbox_NroDocumento
      
  };

      
       if(this.ValidarInput(this.objConsPenRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 

      this.loading = true;

///Aun Falta obtener el servicio ///
       let res = this.reportService.getPendientesCancelar(this.objConsPenRQT);
   //  console.log(this.objConsultaRefrendoExpoRQT)
      
      res.subscribe( 
        data => { 
          this.objConsPenRPT = data;
          //console.log(data.data);
          if (data.Msj == "OK")
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            
            this.objPendCancL = data.Data;

            this.MuestraProc = true;
            this.loading = false

            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(this.objPendCancL);    
              this.SetGrillaVisibility(true);     
            });
      
           
          }
          else
          {
            this.loading = false;

            this.objPendCancL = data.Data;
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objPendCancL);
               this.SetGrillaVisibility(false);
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

    
  public ChangingValueC(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.ClienteSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NClienteSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

  //  swal("Cliente " + this.ClienteSelect  );

    this.myCliente.setValue(this.NClienteSelect);
  }

    
  private _filteremp(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresas.filter(emp => emp.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }
    
    public RefrescarGrilla(){
     
      let res = this.reportService.getPendientesCancelar(this.objConsPenRQT);
      //  console.log(this.objConsultaRefrendoExpoRQT)
         
         res.subscribe( 
           data => { 
             this.objConsPenRPT = data;
             //console.log(data.data);
             if (data.Msj == "OK")
             {
               //this.SiCargoData = true;
               //this.dtTrigger.next(this.objTemperaturaRQT);
               //this.SetGrillaVisibility(true);
               // this.TieneData = true;
   
               
               this.objPendCancL = data.Data;
   
               this.MuestraProc = true;
               this.loading = false
   
               this.SiCargoData = true;
               this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                 dtInstance.destroy();
                 this.dtTrigger.next(this.objPendCancL);    
                 this.SetGrillaVisibility(true);     
               });
         
              
             }
             else
             {
               this.loading = false;
   
               this.objPendCancL = data.Data;
               this.SiCargoData = true;
               this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                 dtInstance.destroy();
                  this.dtTrigger.next(this.objPendCancL);
                  this.SetGrillaVisibility(false);
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

    public ngOnDestroy():any {
      this.SetGrillaVisibility(false);
      this.dtTrigger.unsubscribe();
    }

    public ValidarInput(param : ConsultaPendientesRQT) : boolean
    {
      if(this.NullEmpty(param.EntiCodigoCliente))
      {
        this.objConsPenRQT.EntiCodigoCliente = "";
      }

      if(this.NullEmpty(param.Documento))
      {
        this.objConsPenRQT.Documento = "";
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

    public Limpiar()
    {
      this.myCliente.setValue("");
      this.myUnidad.setValue("");
      this.Documento = "";
      this.ClienteSelect = "";
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