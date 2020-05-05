import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from "rxjs/internal/Observable";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Despachador,Despachadores,AgenciaAduana, AgenciaAduanera,ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo, GenerarRefrendoExpoRQT, GenerarRefrendoExpoRPT, GenerarDetalleRefrendoExpoRQT,GenerarArchivoRefrendoExpoRQT } from '../../models/RefrendoExpo';
import { BL,Contenedor,ConsultaLevanteRPT,ConsultaLevanteRQT, DetConsLevante, ContenedorL,DocumentoBL,Documento,
RegistrarSolPermisoRPT,RegistrarSolPermisoRQT,Archivo, ConsultaSolPerEstRPT,ConsultaSolPerEstRQT,LiquidacionPer,
SolPerArchivoRPT,SolPerArchivoRQT,ObservacionPer, RegistrarObsPagoRPT, RegistrarObsPagoRQT, PermisoListarRPT,
PermisoListarRQT,Permiso,PermisoImprimirRQT, PermisoImprimirRPT}
from '../../models/Permiso';

import { MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';
import { esLocale } from 'ngx-bootstrap';
import { Base64RPT, Base64RQT } from '../../models/Base64';
import { ZipRPT, ZipRQT } from '../../models/ConvertirZip';
import { FileItem } from '../../models/FileItem';
import { isError } from 'util';
import { entidad,Entidades } from 'app/models/entidad';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {SwAlertC} from 'app/models/swalert';
import { DatePipe } from '@angular/common';

import { UniNegocio,UnidadNegocio}  from '../../models/Factura';

@Component({
  selector: 'app-montopagarsolpermiso',
  templateUrl: './montopagarsolpermiso.component.html',
  styleUrls: ['./montopagarsolpermiso.component.css']
})
export class MontopagarsolpermisoComponent implements OnInit {

  public objListBLV : Array<BL> = [];

  /*Listado que devuelve el servicio consulta*/
  public objListDocs : Array<BL> = [];
  public objListCont : Array<ContenedorL> = [];
  /******************************** */

  public objConsLevRQT : ConsultaLevanteRQT;
  public objConsLevRPT : ConsultaLevanteRPT;
  
  public objDetConsLev : DetConsLevante;

  public objConsSolPerRQT : ConsultaSolPerEstRQT;
  public objConsSolPerRPT : ConsultaSolPerEstRPT;
  
  public objPerListRQT : PermisoListarRQT;
  public objPerListRPT : PermisoListarRPT;
  
  public objListLiqui : Array<LiquidacionPer> = [];
  public objListObser : Array<ObservacionPer> = [];
  
  public objListPermisos : Array<Permiso> = [];

  public objListContenedores : Array<Contenedor> = [];
  public objListDocumentos : Array<Documento> = [];
  public objListArchivos : Array<Archivo> = [];

  
  public objRegObsPagRQT : RegistrarObsPagoRQT;
  public objRegObsPagRPT : RegistrarObsPagoRPT;

  public objImprimirSolRqt : SolPerArchivoRQT;
  public objImprimirSolRpt : SolPerArchivoRPT;


  public objImprimirPerRqt : PermisoImprimirRQT;
  public objImprimirPerRpt : PermisoImprimirRQT;
  
  

  
  public BL:string = "";
  myEmpresa = new FormControl();
  myAduana = new FormControl();
  myRegimen = new FormControl();
  
  public ObservacionPago : string = "";
  public Observacion : string = "";
  public Monto : string = "";
  public NroLiquidacion : string = "";
  public DAMNro : string = "";
  public SolPermiso : number = 0;

  public FecNumeracion : string = "";
  public FecLevante : string = "";
  public NroDeclaracion : string = "";
  public Comitente : string = "";
  public AgAduanas : string = "";
  public PtoLlegada : string = "";
  public CantBultos : string = "";
  public PesoBruto : string = "";
  public FOB : string = "";
  public loading : boolean =  false;
  public loadingG : boolean =  false;
  public MuestraObser : boolean =  false;
  public MuestraLiq : boolean =  true;
  public MuestraLiqui : boolean =  true;
  
  public EstadoPermiso : string = "";
  public TituloLiq : string = "";
  public BotonDesc : string = "";
  public RutaImg : string = "";

  public TituloGeneral : string = "";
  

  public MuestraAdj : boolean = true;
  public MuestraPer : boolean = false;

  image: any;
  fileitem : any;
  fileitemz : any;

  fileitems = [];
  fileitemsZ = [];
  selectedOptions = [];

  
  public filename1:string = "";
  public filename2:string = "";

  public filename3:string = "";
  public filename4:string = "";
  public filename5:string = "";
  public filename6:string = "";


  public fname1:string = "";
  public fname2:string = "";

  public TotalMB : number = 0.00;
  public EsMayor5 = false;
  
  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
   };

   private respBase64: Base64RPT = {
    Archivo: ""    
   };

   
  dtTrigger:Subject<any> = new Subject();
  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };

  dtTriggerPer:Subject<any> = new Subject();
  dtOptionsPer : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
 
 

  dtTriggerO:Subject<any> = new Subject();
  dtOptionsO: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    retrieve : true,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
     
    ],
    language: {
      lengthMenu: "Mostrar_MENU_registros" ,
      search : "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate : {
        first:    "Primero",
        last:     "Último",
        next:     "Siguiente",
        previous: "Anterior"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };
 



  
  
  // swal(this.EmpresaSelect);         
  public NEmpresaSelect : string = "";
  public isError : boolean;
  
  public ListaAduana : Array<UnidadNegocio>;
  public ListaRegimen : Array<UnidadNegocio>;

  
  filteredEmpresa: Observable<entidad[]>;
  
  
  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];
  

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<MontopagarsolpermisoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
     


     }

     GrabarPago()
     {

      if (this.ObservacionPago == "")
      { swal("Debe de ingresar la Observación de Pago");
        return; }

      if (this.objListArchivos.length == 0)
        { swal("Debe seleccionar por lo menos 1 archivo");
          return; }

      this.objRegObsPagRQT = {
          IDUser: Number.parseInt(localStorage.getItem("Usuario")),
          IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
          SolicitudPermiso :   this.SolPermiso,
          Observacion : this.ObservacionPago,          
          Data : this.objListArchivos
        }

        let res = this.reportService.RegistrarObsPago(this.objRegObsPagRQT);

        
        this.loadingG = true; 
        
        res.subscribe( 
         data => {
           this.objRegObsPagRPT = data;
     
           if (this.objRegObsPagRPT.Cod == 0)
           {                
            this.loadingG = false; 
            
            swal(data.Msj.toString());  
            this.dialogRef.close();                                       
           }
           else{
            
           this.loadingG = false; 

             swal(this.objRegObsPagRPT.Msj);
             this.dialogRef.close();            
             this.onIsError();   
           }
         },  
         error => {
          this.loadingG = false; 
           swal({
             text: "Error al grabar los datos",
             icon: "error",
              }); 
           this.onIsError();           
           console.log("Error");}
         );


     }

  ngOnInit() {

   //this.SetGrillaVisibility(false);
  // this.SetGrillaVisibilityO(false);
  
    
    this.ListaEmpresas = new Array
  
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

      //this.muestra_oculta("DPL");
      this.muestra_oculta("AdjPago");
     // this.muestra_oculta("Pago");

      this.objConsSolPerRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),

        
        SolicitudPermiso : Number.parseInt(localStorage.getItem("SolPerEst")),
               
      }

      this.SolPermiso =  Number.parseInt(localStorage.getItem("SolPerEst"));
      this.EstadoPermiso = localStorage.getItem("EstadoPermiso").toString();
               
    if (this.EstadoPermiso == "Habilitado" || this.EstadoPermiso == "Cerrado") /*Estado Habilitado o Cerrado*/
    {
      this.objPerListRQT = {
        IDUser: Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),                
        CodigoSolicitud : this.SolPermiso               
      }

      let resp = this.reportService.getPermisosListar(this.objPerListRQT);
      this.BotonDesc = "Aceptar";

      this.RutaImg =  "assets/images/Habilitado.jpeg" 

      this.TituloGeneral = "Permisos de la Solicitud Nro: " + this.SolPermiso.toString();

      resp.subscribe( 
       data => {
         this.objPerListRPT = data;
   
         if (data.Data.length > 0 )
         {                              
          // this.loading = false;
  
         this.objListPermisos = data.Data;
  
           if (this.objListPermisos.length > 0)
           {         
            this.TituloLiq = "Lista de Permisos";  
            this.MuestraAdj = false;
            this.MuestraLiq = false;  
            this.MuestraLiqui = false;                      
            this.dtTriggerPer.next(this.objListPermisos);  
            this.SetGrillaVisibilityPer(true);
           }
  
           
         
         
         // this.SetGrillaVisibility(true);
  
        
         }
         else{
                   
        //  this.loading = false;
           swal("No existen permisos");
           this.onIsError();   
         }
       },  
       error => {
         swal({
           text: "Error al cargar los datos",
           icon: "error",
            }); 
         this.onIsError();           
         console.log("Error");}
       );
   


    }
    else
    {
       
    let res = this.reportService.getSolicitudPermisoxEstado(this.objConsSolPerRQT);

    this.BotonDesc = "Cancelar";

    switch (this.EstadoPermiso) {
      case "Observado":
          this.RutaImg =  "assets/images/Observado.jpeg" 
          this.TituloGeneral = "Observaciones de la Solicitud Nro: " + this.SolPermiso.toString();
      break;
      case "Liquidado":
        this.RutaImg =  "assets/images/Liquidado.jpeg" 
        this.TituloGeneral = "Liquidaciones de la Solicitud Nro: " + this.SolPermiso.toString();
        break;
      default:
          this.RutaImg =  "assets/images/MontoAdjPago.png" ;
          this.TituloGeneral = "Consulta de Monto a Pagar y Pago Adjunto de la Solicitud Nro: " + this.SolPermiso.toString();
    }


    res.subscribe( 
     data => {
       this.objConsSolPerRPT = data;
 
       if (this.objConsSolPerRPT.Mensaje == "OK")
       {                              
        // this.loading = false;

         this.TituloLiq = "Datos de Liquidacion a Pagar";  

         this.objListLiqui = data.DataLiquidacion;
         
         this.objListObser = data.DataObservaciones;

         if (this.objListObser.length > 0)
         {           
          this.MuestraObser = true;
          this.dtTriggerO.next(this.objListObser);  
          this.SetGrillaVisibilityO(true);
         }

         
        this.dtTrigger.next(this.objListLiqui);   

        
        if (this.objListLiqui.length <= 0)
        {     
          this.MuestraLiqui = false;
          this.SetGrillaVisibility(false);
        }
        else
       {       
        this.SetGrillaVisibility(true);
       }
      
       }
       else{
                 
      //  this.loading = false;
         swal(data.Mensaje);
         this.onIsError();   
       }
     },  
     error => {
       swal({
         text: "Error al cargar los datos",
         icon: "error",
          }); 
       this.onIsError();           
       console.log("Error");}
     );
    
   }

  }

  public cerrarPopup() {
    this.dialogRef.close();
    return false;
  }

  public ImprimirSolPer(codigo : number, codigoHelp : number)
  {

    this.objImprimirSolRqt = {  
    IDUser:  Number(localStorage.getItem("Usuario").toString()), 
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    Codigo : codigo,
    CodHelp: codigoHelp
    };


    this.reportService.ImprimirSolicitudPermiso(this.objImprimirSolRqt)
    .subscribe(
      data => {
        
        this.objImprimirSolRpt = data;
  
        if (data.Cod == 0)
        {               
          
          const linkSource = 'data:application/pdf;base64,' + data.Data[0].Archivo.toString();
          const downloadLink = document.createElement("a");
          const fileName =  data.Data[0].NombreArchivo.toString();
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
          
          }
         
  
        else{
         // this.loading = false;
         swal(data.Msj.toString());
       /*   swal({
            text: "Error al Imprimir Solicitud de Permiso",
            icon: "error",
          });*/
  

        }

      }
    );

  }

  public ImprimirPermiso(permiso: string)
  {

    this.objImprimirPerRqt = {  
    IDUser:  Number(localStorage.getItem("Usuario").toString()), 
    IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
    Permiso : permiso
    };


    this.reportService.ImprimirPermiso(this.objImprimirPerRqt)
    .subscribe(
      data => {
        
        this.objImprimirPerRqt = data;
  
        if (data.Cod == 0)
        {               
          
          const linkSource = 'data:application/pdf;base64,' + data.Data[0].Archivo.toString();
          const downloadLink = document.createElement("a");
          const fileName =  data.Data[0].NombreArchivo.toString();
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
          
          }
         
  
        else{
         // this.loading = false;
         swal(data.Msj.toString());
       /*   swal({
            text: "Error al Imprimir Solicitud de Permiso",
            icon: "error",
          });*/
  

        }

      }
    );

  }



  
 public SetGrillaVisibility(param:boolean)
 {
   if (param) {
     document.getElementById('grillaBLiq').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillaBLiq').style.visibility = "hidden";
   }
 }

 
  
 public SetGrillaVisibilityO(param:boolean)
 {
   if (param) {
     document.getElementById('grillaobs').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillaobs').style.visibility = "hidden";
   }
 }

 
 public SetGrillaVisibilityPer(param:boolean)
 {
   if (param) {
     document.getElementById('grillaPer').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillaPer').style.visibility = "hidden";
   }
 }

 /* public ConsultarLev()
  {

    if (this.objListBLV.length == 0)
    {
      swal("Debe ingresar minimo 1 documento BL");
      return;
    }

    this.objConsLevRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      CodigoOperador: "31",
      CodigoAduana:  this.AduanaSelect,
      Anio: this.DAMAnio,
      Regimen:  this.RegimenSelect,
      DAM: this.DAMNro,
      FacturarA:  this.EmpresaSelect,
      Data : this.objListBLV
    }

    this.loading = true;

    let res = this.reportService.getLevante(this.objConsLevRQT);

    //  console.log(this.objAutEntregaPrecRQT)
    
    res.subscribe( 
     data => {
       this.objConsLevRPT = data;
 
       if (this.objConsLevRPT.CodMsj == 0)
       {                              
         this.loading = false;

        for (var i = 0; i <= data.Data.Documentos.length-1; i++) {
          
          let doc =  data.Data.Documentos[i];
          
          let docl = new BL();
          docl.BL = doc.NroDocumentoTransporte;

          this.objListDocs.push(docl);
        }

        for (var i = 0; i <= data.Data.Contenedores.length-1; i++) {
          
          let cont =  data.Data.Contenedores[i];
          
          let contl = new ContenedorL();
          contl.NroContenedor = cont.NroContenedor;

          this.objListCont.push(contl);
        }

        this.NroDeclaracion = this.objConsLevRPT.NroDeclaracion;
        this.FecNumeracion = this.objConsLevRPT.FechaDeclaracion;
        this.FecLevante =  this.objConsLevRPT.FechaLevante;

        this.Comitente = this.objConsLevRPT.RazonSocialImportador;
        this.AgAduanas = this.objConsLevRPT.RazonSocialAgenteAduana;
        this.PtoLlegada = this.objConsLevRPT.RazonSocialPuntoLlegada;

        this.CantBultos = this.objConsLevRPT.CantidadBultos.toFixed(2);

        this.PesoBruto =  this.objConsLevRPT.PesoBruto.toFixed(2);

        var element = <HTMLButtonElement> document.getElementById("btnGen");
        element.disabled = false;


       }
       else{
                 
        this.loading = false;
         swal(data.Mensaje);
         this.onIsError();   
       }
     },  
     error => {
       swal({
         text: "Error al cargar los datos",
         icon: "error",
          }); 
       this.onIsError();           
       console.log("Error");}
     );
 



    
     


  }*/

  
  public ChangingValueF(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    //this.EmpresaSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NEmpresaSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

    this.myEmpresa.setValue(this.NEmpresaSelect);
  }

  public muestra_oculta(param: string) {
    if (document.getElementById) { //se obtiene el id
      var el = document.getElementById(param); //se define la variable "el" igual a nuestro div
      el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
    }
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  
 




  AgregarBL(num: string)
  {
    for (var i = 0; i <= this.objListBLV.length-1; i++) {
     if (num == this.objListBLV[i].BL)
    {
      swal("El BL ya se encuentra ingresado en la lista");
      return ;
    }

    }


    let bln = new BL();
    bln.BL = num;

    this.objListBLV.push(bln);


  }

  EliminarBL(num: string)
  {
   
    
  var pos = this.objListBLV.map(function(e) { 
    return e.BL; 
   }).indexOf(num); 


   this.objListBLV.splice(pos,1);  

  }

  
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      //this.TotalMB = this.TotalMB + tamanioArch;
      
      //let totalMBs = this.TotalMB;

      //if (totalMBs > 5)
      //{this.EsMayor5 = true}
      
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      
      this.fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }
      
      this.fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.filename1 = file.name; 
      //this.reqBase64.NombreArc;
      this.fname1 = file.name;
      
      //this.fileitems.push(fileitem);
      //this.fileitemsZ.push(fileitemz);
      

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
   
    { 
     
      this.fileitemz = null;
      this.fileitem = null;
  
      let filname1 = this.filename1;
      let fnam1 = this.fname1;
  
      if (filname1 != "")
      {
        
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam1;
        });
        
        if (fitemz.length == 1)
        {
          let fitemf = fitemz[0];

          this.TotalMB = this.TotalMB - ((fitemf.size/1024)/1024);

          let totalmbb = this.TotalMB;
          
          if ( this.TotalMB < 5)
          {this.EsMayor5 = false}
        }

        //var pos = mapeo.indexOf(this.filename1); 
  

        var pos = this.fileitems.map(function(e) { 
          return e.NombreArc; 
         }).indexOf(this.filename1); 
  
         this.fileitems.splice(pos,1);  
         this.fileitemsZ.splice(pos,1);

         let leng = this.fileitems.length;
  
         console.log(pos.toString());
  
      }
      }


  }

  AgregarArchivo(nombarc: string)
  {

  //  this.cerrado = true;

    //this.agarchiv = true;

    if (nombarc != "")
    {
      var res = nombarc.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        
        if ((tipoarchivo.toLowerCase() == "jpg") ||  (tipoarchivo.toLowerCase() == "jpeg") ||  (tipoarchivo.toLowerCase() == "pdf") ||  (tipoarchivo.toLowerCase() == "png"))
        { 
          for (var i = 0; i <= this.fileitemsZ.length - 1; i++) 
          {
            if  (this.fileitemsZ[i].name == nombarc)
             {
          {swal({text :"El archivo ya se encuentra en el listado"});
          return;}
             }      
        }

      this.TotalMB = 0;

      if (this.fileitem != null)
      {
        this.fileitems.push(this.fileitem);      
        
        let archivo = new Archivo();

        var oldstr1 = this.fileitem.Base64.toString();
        var newstr1 = oldstr1.toString().replace("data:image/png;base64,","");

        var oldstr2 = newstr1;
        var newstr2 = oldstr2.toString().replace("data:image/jpeg;base64,","");

        var oldstr3 = newstr2;
        var newstr3 = oldstr3.toString().replace("data:application/pdf;base64,","");

        archivo.Archivo = newstr3;
        //this.fileitem.Base64;
        archivo.NombreArchivo = nombarc;

        this.objListArchivos.push(archivo);

      }

      if (this.fileitemz != null)
      {
        this.fileitemsZ.push(this.fileitemz);        
      }

      for (var i = 0; i <= this.fileitemsZ.length - 1; i++) 
      {
      this.TotalMB = this.TotalMB + ((this.fileitemsZ[i].size/1024)/1024);
      }

      if ( this.TotalMB > 5)
      {this.EsMayor5 = true}
    }
    else
    {swal({text :"El archivo debe ser del tipo pdf, jpg, png"});
    return;}
   }
  }

}


onListControlChanged(list:any)
{
  this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

  //this.selectedOptions = list.selectedOptions.selected.indexOf();

//this.fileitemsZ

}


EliminarSelect()
  {
    
   // this.cerrado = true;  
    this.TotalMB = 0;  

    //this.selectedOptions.sort()

    
    //var selectedOptionsF:Array<number> = this.selectedOptions.sort((n1,n2) => n1 - n2);

    //for (var i = 0; i <= this.selectedOptions.length - 1; i++) 
    //for (var i = this.selectedOptions.length - 1; i >= 0; i--) 
    //for (var i = 0; i <= selectedOptionsF.length - 1; i++)  
    
   for (var i = 0; i <= this.selectedOptions.length - 1; i++)    
    {
      
      var pos = this.fileitemsZ.map(function(e) { 
        return e.name; 
       }).indexOf(this.selectedOptions[i].toString()); 

       this.fileitems.splice(pos,1);  
       this.fileitemsZ.splice(pos,1);

       this.objListArchivos.splice(pos,1);
      
      //let pos = this.selectedOptions[i];
      
     // this.fileitems.splice(pos,1);  
     // this.fileitemsZ.splice(pos,1);
    }

        
    for (var i = 0; i <= this.fileitemsZ.length - 1; i++) 
    {
      let pos = this.selectedOptions[i];

      this.fileitemsZ[i].index = i;

    }

    if (this.fileitemsZ.length  == 0)
    {   this.TotalMB = 0;}
    
    for (var i = 0; i <= this.fileitemsZ.length - 1; i++) 
    {
    this.TotalMB = this.TotalMB + ((this.fileitemsZ[i].size/1024)/1024);
    
    if ( this.TotalMB < 5)
    {this.EsMayor5 = false}
    }
      
      
  }



}
