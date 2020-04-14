import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
//import { CartaTemperaturaRQT,AnularCerrarCartaTemperaturaRQT,AnularCerrarCartaTemperaturaRPT,CartaTemperaturaRPT,ListaEstado} from '../../models/Temperatura';
import { ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo,ConsultaRefrendoExpoRQT,ConsultaRefrendoExpoRPT}  from '../../models/RefrendoExpo';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { Observable } from "rxjs/internal/Observable";
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import {CartaTemperaturaDetalleComponent} from './cartatemperaturadetalle.component';
import {RefrendoExpoNuevoComponent} from './refrendoexponuevo.component';
import { entidad,Entidades, Transp, Transportista } from 'app/models/entidad';
import { startWith, map } from 'rxjs/operators';
import { LiquidacionCliente, LiquidacionBRQT,LiquidacionBRPT,LiquidacionCont, ValidaFacturarARPT, ValidaFacturarARQT,
  ValidarTerceroRPT, ValidarTerceroRQT, ClienteTrans, ClienteTransConsRPT, ClienteTransConsRQT, RegClienteTransRPT, RegClienteTransRQT }  from '../../models/Liquidacion';
  

@Component({
    selector: 'liquidaciontransportistacliente',
    templateUrl: 'liquidaciontransportistacliente.template.html',
    styleUrls: ['liquidaciontransportistacliente.component.css']
  })

  export class LiquidacionTransportistaClienteComponent implements  AfterViewInit, OnDestroy, OnInit{  

    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public EstadoSelect:string;
    public ModalidadSelect:string;
    public ListaEstado : Array<ListaEstadoRefrendoExpo>;
    public ListaModalidad : Array<ListaModalidadRefrendoExpo>;
    myCliente = new FormControl();
    myTrans = new FormControl();

    public loading : boolean = false;
    
    public ClienteSelect : string = "";
    public NClienteSelect : string = "";
    
    
    public TransSelect : string = "";
    public NTransSelect : string = "";
    
    public ListaEmpresasF : Array<entidad> = [];
    public LEmpresasF : Entidades;

    public ListaTransp : Array<Transportista> = [];
    public LTransp : Transp;

    public objCTConsRQT :  ClienteTransConsRQT;
    public objCTConsRPT :  ClienteTransConsRPT;
    
    
    public objRegCliTraRQT :  RegClienteTransRQT;
    public objRegCliTraRPT :  RegClienteTransRPT;

    public Documento : string = "";
    

    public isError = false;

    
    public objClienteTransL : Array<ClienteTrans>;

    
  filteredEmpresa: Observable<entidad[]>;
  filteredEmp: Observable<Transportista[]>;

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
   //   this.reportService.ConsultaEstadoRefrendoExpo().subscribe(data => this.ListaEstado = data.data);
    //  this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
    }
    
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: DataTables.Api;   


  
    ngAfterViewInit(): void {
      this.dtTriggerTrans.next();
    //  console.log("elemento"+ this.dtElement);
    }

    setearFechasLimite(){
      let date = new Date();
      this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
      this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    }
    
    dtTriggerTrans:Subject<any> = new Subject();
    dtOptionsTrans : any = {
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

      
    this.myCliente.setValue("");
    this.myTrans.setValue("");

      
    
  this.filteredEmpresa = this.myCliente.valueChanges.pipe(
    startWith(''),
    map(value => this._filterempf(value))
  );

  
  this.filteredEmp = this.myTrans.valueChanges.pipe(
    startWith(''),
    map(value => this._filteremp(value))
  );

      
  this.ListaEmpresasF = new Array;
  this.ListaTransp = new Array;

  this.reportService
  .getListaEntidades()
  .subscribe(
    data => {
      
      this.LEmpresasF = data;

      if (this.LEmpresasF.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEmpresasF.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEmpresasF.push(last);
          //this.options.push(last.Nombre);
        }

       // this.ListaEmpresas = this.ListaEmpresasF;


      
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


  this.reportService
  .getListaTransportistas()
  .subscribe(
    data => {
      
      this.LTransp = data;

      if (this.LTransp.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LTransp.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaTransp.push(last);
          //this.options.push(last.Nombre);
        }

       // this.ListaEmpresas = this.ListaEmpresasF;


      
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
    AgregarCliTrans(){

      if (this.myCliente.value.toString() == "" || this.myTrans.value.toString() == "" || this.Documento == "")
      {      
       swal("Debe de ingresar todos los campos necesarios");
      }      

    this.objRegCliTraRQT = {
      IDUser : Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      EntiCodigoCliente: this.ClienteSelect,
      IdTransportistaNavis: this.TransSelect ,
      Documento: this.Documento
     };

     let res = this.reportService.InsertarClienteTransportista(this.objRegCliTraRQT);      
     // console.log(this.objConsultaRefrendoExpoRQT)

     //this.objClienteTransL = new Array;
      
      res.subscribe( 
        data => { 
          this.objRegCliTraRPT = data;
         // console.log(data.data);
          if (data[0].Cod == 0)
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            swal("Se registro correctamente la relación Cliente - Transportista");
            this.RefrescarGrilla();
           
          }
          else
          {
           
            swal("No se puede registrar la relación Cliente - Transportista");
          }
          //this.dtTrigger.unsubscribe();
        }, 
        error => {
          swal("Error al cargar los datos"); 
          console.log("Error : ", error); 
        }
      );  





    /*  localStorage.setItem("paramAccion","Nuevo");
      const dialogRef = this.dialog.open(RefrendoExpoNuevoComponent,{
        disableClose: true,
        autoFocus: true,
        width: "600px",
        height: "100%"
      });*/
/*       dialogRef.afterClosed().subscribe(result => {
        this.RefrescarGrilla();
     
  }
  ); */

    }  

    
  private _filterempf(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresasF.filter(empresa => empresa.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  
  private _filteremp(value: string): Transportista[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaTransp.filter(emp => emp.Descripcion.toLowerCase().indexOf(filterValue) === 0);
  }

  
  public ChangingValueF(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.ClienteSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NClienteSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

//    swal("Cliente " + this.ClienteSelect  );

    this.myCliente.setValue(this.NClienteSelect);
  }

  
  public ChangingValueE(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.TransSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NTransSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

   
   // swal("Trans " + this.TransSelect  );
    this.myTrans.setValue(this.NTransSelect);
  }

  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
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

    this.loading = true;

    
    if (this.myCliente.value.toString() == "")
    {this.ClienteSelect = ""}

    if (this.myTrans.value.toString() == "")
    {this.TransSelect = ""}
    

    

    this.objCTConsRQT = {
        IDUser : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        EntiCodigoCliente: this.ClienteSelect,
        IdTransportistaNavis: this.TransSelect ,
        Documento: form.value.txtbox_NroDocumento
    };

    
      
       if(this.ValidarInput(this.objCTConsRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 

///Aun Falta obtener el servicio ///
      //let res = this.reportService.ConsultaRefrendoExpo(this.objConsultaRefrendoExpoRQT);
      let res = this.reportService.getClienteTransportista(this.objCTConsRQT);      
     // console.log(this.objConsultaRefrendoExpoRQT)

     //this.objClienteTransL = new Array;
      
      res.subscribe( 
        data => { 
          this.objCTConsRPT = data;
          console.log(data.data);
          if ((data.CodMsj == 0) && (data.Data.length >= 1))
          {
            //this.SiCargoData = true;
            //this.dtTrigger.next(this.objTemperaturaRQT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;

            this.objClienteTransL = data.Data;
            this.loading = false;
          //  swal(this.objClienteTransL.length.toString());
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTriggerTrans.next(this.objClienteTransL);   
              this.SetGrillaVisibility(true);
                  
            });
          
           
          }
          else
          {
            this.loading = false;
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTriggerTrans.next(this.objClienteTransL);
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
    
    public RefrescarGrilla(){
      let res = this.reportService.getClienteTransportista(this.objCTConsRQT);      
      // console.log(this.objConsultaRefrendoExpoRQT)
 
      //this.objClienteTransL = new Array;
       
       res.subscribe( 
         data => { 
           this.objCTConsRPT = data;
           console.log(data.data);
           if ((data.CodMsj == 0) && (data.Data.length >= 1))
           {
             //this.SiCargoData = true;
             //this.dtTrigger.next(this.objTemperaturaRQT);
             //this.SetGrillaVisibility(true);
             // this.TieneData = true;
 
             this.objClienteTransL = data.Data;
             this.loading = false;
           //  swal(this.objClienteTransL.length.toString());
             this.SiCargoData = true;
             this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
               dtInstance.destroy();
               this.dtTriggerTrans.next(this.objClienteTransL);   
               this.SetGrillaVisibility(true);
                   
             });
           
            
           }
           else
           {
             this.loading = false;
             this.SiCargoData = true;
             this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
               dtInstance.destroy();
               this.dtTriggerTrans.next(this.objClienteTransL);
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
      this.dtTriggerTrans.unsubscribe();
    }

    public ValidarInput(param : ClienteTransConsRQT) : boolean
    {
      if(this.NullEmpty(param.EntiCodigoCliente))
      {
        this.objCTConsRQT.EntiCodigoCliente = "";
      }

      if(this.NullEmpty(param.IdTransportistaNavis))
      {
        this.objCTConsRQT.IdTransportistaNavis = "";
      }

      if(this.NullEmpty(param.Documento))
      {
        this.objCTConsRQT.Documento = "";
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
        document.getElementById('grillatrans').style.visibility = "visible";
      }
      else { 
        document.getElementById('grillatrans').style.visibility = "hidden";
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
      this.myTrans.setValue("");
      this.Documento = "";

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
