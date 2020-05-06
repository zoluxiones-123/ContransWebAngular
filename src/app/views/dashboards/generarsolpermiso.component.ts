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
RegistrarSolPermisoRPT,RegistrarSolPermisoRQT,Archivo,DAM,ConsultaLevanteMasivoRPT,ConsultaLevanteMasivoRQT, DAMMasivo } from '../../models/Permiso';


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
//import {  WorkBook, read, utils, write, readFile } from 'xlsx';

import { UniNegocio,UnidadNegocio}  from '../../models/Factura';


@Component({
  selector: 'app-generarsolpermiso',
  templateUrl: './generarsolpermiso.component.html',
  styleUrls: ['./generarsolpermiso.component.css']
})


export class GenerarsolpermisoComponent implements OnInit {

  public MuestraGrilla : boolean = false;
  public MuestraGrillaMas : boolean = false;
  
  public objListBLV : Array<BL> = [];

  /*Listado que devuelve el servicio consulta*/
  public objListDocs : Array<BL> = [];
  public objListCont : Array<ContenedorL> = [];
  /******************************** */

 /*Listado que devuelve el servicio consulta*/
 public objListDocsM : Array<BL> = [];
 public objListContM : Array<ContenedorL> = [];
/********************************** */

  public objConsLevRQT : ConsultaLevanteRQT;
  public objConsLevRPT : ConsultaLevanteRPT;

  
  public objConsLevMasRQT : ConsultaLevanteMasivoRQT;
  public objConsLevMasRPT : ConsultaLevanteMasivoRPT;

  public objDetConsLev : DetConsLevante;

  public objListContenedores : Array<Contenedor> = [];
  public objListDocumentos : Array<Documento> = [];
  public objListArchivos : Array<Archivo> = [];
  public objListArchivosMasivo : Array<Archivo> = [];

  public objLDAM : any;
  

  
  public objListContenedoresM : Array<Contenedor> = [];
  public objListDocumentosM : Array<Documento> = [];

  
  public objRegSolPerRQT : RegistrarSolPermisoRQT;
  public objRegSolPerRPT : RegistrarSolPermisoRPT;
  

  
  public BL:string = "";
  myEmpresa = new FormControl();
  myEmpresaMas = new FormControl();
  myAduana = new FormControl();
  myRegimen = new FormControl();
  myGrilla = new FormControl();
  
  public EmpresaSelect : string = "";
  public EmpresaMasSelect : string = "";
  public AduanaSelect : string = "";
  public RegimenSelect : string = "";
  public DAMAnio : string = "";
  public DAMNro : string = "";

  public FecNumeracion : string = "";
  public FecLevante : string = "";
  public NroDeclaracion : string = "";
  public Comitente : string = "";
  public AgAduanas : string = "";
  public PtoLlegada : string = "";
  public CantBultos : string = "";
  public PesoBruto : string = "";
  public FOB : string = "";
  public FOBMasivo : string = "";
  
  public loading : boolean =  false;  
  public loadingmas : boolean =  false;
  public loadingG : boolean =  false;

  //public FOBMasivo : number = 0.0;

  image: any;
  fileitem : any;
  fileitemz : any;
  fileitemExcel : any;
  
  fileitems = [];
  fileitemsZ = [];
  selectedOptions = [];

  
  imagem: any;
  fileitemm : any;
  fileitemzm : any;
  listaDam : any;
  
  fileitemsm = [];
  fileitemsZm = [];
  selectedOptionsm = [];

  
  public filenameexcel:string = "";
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

  
  public filename1m:string = "";
  public filename2m:string = "";

  public filename3m:string = "";
  public filename4m:string = "";
  public filename5m:string = "";
  public filename6m:string = "";


  public fname1m:string = "";
  public fname2m:string = "";

  public TotalMBm : number = 0.00;
  public EsMayor5m = false;

  public CodAleatorioF : string = "" ;
  public FacturarAF: string = "" ;
  public FOBF: number = 0;
  public ArchivosF : any;

  
  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
   };

   private respBase64: Base64RPT = {
    Archivo: ""    
   };




  
  
  // swal(this.EmpresaSelect);         
  public NEmpresaSelect : string = "";
  public NEmpresaMasSelect : string = "";
  
  public isError : boolean;
  
  public ListaAduana : Array<UnidadNegocio>;
  public ListaRegimen : Array<UnidadNegocio>;

  
  public objListDAM : Array<DAM> = [];

  
  public objListDAMMasivo : Array<DAMMasivo> = [];

  
  filteredEmpresa: Observable<entidad[]>;
  filteredEmpresaMas: Observable<entidad[]>;
  
  
  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];
  public ListaEmpresasMas : Array<entidad> = [];

  dtTriggerDAM:Subject<any> = new Subject();
  dtOptionsDAM : any = {
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
 
  
  dtTriggerDAMM:Subject<any> = new Subject();
  dtOptionsDAMM : any = {
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
 

  
  

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<GenerarsolpermisoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
      this.reportService.getaduana().subscribe(
        data =>
         {this.ListaAduana = data.Data
         
          if (this.ListaAduana.length > 0)
      
          { //let uni = this.ListaUniNegocio[0].Descripcion;
            let codadu = this.ListaAduana[0].Codigo;
            
            this.myAduana.setValue(codadu.toString());

            this.AduanaSelect = codadu;
            
            //this.EstadoSelect = coduni;
            }
    
         }
         );

         this.reportService.getregimen().subscribe(
          data =>
           {this.ListaRegimen = data.Data
           
            if (this.ListaRegimen.length > 0)
        
            { //let uni = this.ListaUniNegocio[0].Descripcion;
              let codreg = this.ListaRegimen[0].Codigo;
              
              this.myRegimen.setValue(codreg.toString());
              //this.EstadoSelect = coduni;
            
              this.RegimenSelect = codreg;

            
            }
      
           }
           );

     }

     GrabarSolicitud()
     {

     
      
     if (this.objConsLevRPT != null && this.objConsLevRPT.CodAleatorio != "")
      {
      if (this.FOB == "")
      { swal("Debe ingresar el FOB para grabar la solicitud");
        return; }

        
      if (this.EmpresaSelect == "")
      { swal("Debe seleccionar la Empresa a facturar");
        return; }
        

      if (this.objListArchivos.length == 0)
        { swal("Debe seleccionar por lo menos 1 archivo");
          return; }
      }
      
      /********Validacion de Consulta Levante Masivo********* */
      if ( this.objConsLevMasRPT != null && this.objConsLevMasRPT.CodAleatorio != "")
      {
      if (this.FOBMasivo == "")
      { swal("Debe ingresar el FOB para grabar la solicitud");
        return; }

        
      if (this.EmpresaMasSelect == "")
      { swal("Debe seleccionar la Empresa a facturar");
        return; }
        

      if (this.objListArchivosMasivo.length == 0)
        { swal("Debe seleccionar por lo menos 1 archivo de evidencia");
          return; }
      }

      
     if (this.objConsLevRPT != null && this.objConsLevRPT.CodAleatorio != "")
     {
      this.CodAleatorioF = this.objConsLevRPT.CodAleatorio,
      this.FacturarAF =  this.EmpresaSelect,
      this.FOBF =  Number.parseFloat(this.FOB),
      this.ArchivosF = this.objListArchivos
     }

     if (this.objConsLevMasRPT != null && this.objConsLevMasRPT.CodAleatorio != "")
     {
      this.CodAleatorioF = this.objConsLevMasRPT.CodAleatorio,
      this.FacturarAF =  this.EmpresaMasSelect,
      this.FOBF =  Number.parseFloat(this.FOBMasivo),
      this.ArchivosF = this.objListArchivosMasivo
     }

     
     var element = <HTMLButtonElement> document.getElementById("btnGen");
     element.disabled = true;

      this.objRegSolPerRQT = {
          IDUser: Number.parseInt(localStorage.getItem("Usuario")),
          IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),

          CodAleatorio: this.CodAleatorioF,
          FacturarA:  this.FacturarAF,
          FOB: this.FOBF,
          Archivos : this.ArchivosF
          
         /* CodAleatorio: this.objConsLevRPT.CodAleatorio,
          FacturarA:  this.EmpresaSelect,
          FOB: Number.parseFloat(this.FOB),
          Archivos : this.objListArchivos*/
        }

        let res = this.reportService.RegistrarSolicitudPermiso(this.objRegSolPerRQT);

        //  console.log(this.objAutEntregaPrecRQT)

        this.loadingG = true;
        
        res.subscribe( 
         data => {
           this.objRegSolPerRPT = data;
     
           if (this.objRegSolPerRPT.Cod > 0)
           {                
            this.loadingG = false; 
            
            swal("Se registro correctamente la Solicitud de Permiso Nro: " + data.Cod.toString());  
            this.dialogRef.close();                                       
           }
           else{
            
            this.loadingG = false; 

             swal(this.objRegSolPerRPT.Msj);
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

    
    //this.grillaDAM.visibility = "hidden";
    
    //document.getElementById('DAMMasivo').style.visibility = "hidden";
  
    
    //this.SetGrillaVisibility(false);
    
    //var element = <HTMLElement> document.getElementById("grillaDAM");
    //element.style.visibility = "hidden";
    

    this.filteredEmpresa = this.myEmpresa.valueChanges.pipe(
      startWith(''),
      map(value => this._filterempf(value))
    );

    
    this.filteredEmpresaMas = this.myEmpresaMas.valueChanges.pipe(
      startWith(''),
      map(value => this._filteremp(value))
    );
  
    
    this.ListaEmpresas = new Array;    
    this.ListaEmpresasMas = new Array;
  
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

          this.ListaEmpresasMas = this.ListaEmpresas;
        
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

      this.muestra_oculta("DCL");
      this.muestra_oculta("CONTENEDORES");
      this.muestra_oculta("Docs");
   
  
  }

  public cerrarPopup() {
    this.dialogRef.close();
    return false;
  }

  public ConsultarLev()
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
 



    
     


  }

  public ConsultarLevMas()
  {

    if (this.EmpresaMasSelect == "")
    {
      swal("Debe seleccionar la Empresa");
      return;
    }

    if (this.objListDAM == null || this.objListDAM.length == 0)
    {
      swal("Debe ingresar minimo 1 fila DAM");
      return;
    }

    this.objConsLevMasRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),     
      FacturarA:   this.EmpresaMasSelect ,
      Data : this.objListDAM
    }

    this.loadingmas = true;

    let resmas = this.reportService.getLevanteMasivo(this.objConsLevMasRQT);

    //  console.log(this.objAutEntregaPrecRQT)
    
    resmas.subscribe( 
     data => {
       this.objConsLevMasRPT = data;
 
       if (this.objConsLevMasRPT.CodAleatorio != "")
       {                              
         this.loadingmas = false;

         this.objListDocsM = [];
         this.objListContM = [];

         this.MuestraGrilla = true;

         this.objListDAMMasivo = this.objConsLevMasRPT.DAM;

        for (var i = 0; i <= data.Documentos.length-1; i++) {
          
          let doc =  data.Documentos[i];
          
          let docl = new BL();
          docl.BL = doc.NroDocumentoTransporte;

          this.objListDocsM.push(docl);
        }

        for (var i = 0; i <= data.Contenedores.length-1; i++) {
          
          let cont =  data.Contenedores[i];
          
          let contl = new ContenedorL();
          contl.NroContenedor = cont.NroContenedor;

          this.objListContM.push(contl);
        }
        
        this.dtTriggerDAMM.next(this.objListDAMMasivo);   
       
       
        this.SetGrillaVisibilityM(true);

       /* this.NroDeclaracion = this.objConsLevRPT.NroDeclaracion;
        this.FecNumeracion = this.objConsLevRPT.FechaDeclaracion;
        this.FecLevante =  this.objConsLevRPT.FechaLevante;

        this.Comitente = this.objConsLevRPT.RazonSocialImportador;
        this.AgAduanas = this.objConsLevRPT.RazonSocialAgenteAduana;
        this.PtoLlegada = this.objConsLevRPT.RazonSocialPuntoLlegada;

        this.CantBultos = this.objConsLevRPT.CantidadBultos.toFixed(2);

        this.PesoBruto =  this.objConsLevRPT.PesoBruto.toFixed(2);*/

        var element = <HTMLButtonElement> document.getElementById("btnGen");
        element.disabled = false;


       }
       else{
                 
        this.loadingmas = false;
         swal(data.Mensaje);
         this.onIsError();   
       }
     },  
     error => {
      this.loadingmas = false;
       swal({
         text: "Error al cargar los datos",
         icon: "error",
          }); 
       this.onIsError();           
       console.log("Error");}
     );
 



    
     


  }
  public ChangingValueF(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.EmpresaSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NEmpresaSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

    this.myEmpresa.setValue(this.NEmpresaSelect);
  }

  
  public ChangingValueMas(param : any)
  {
    var codentidad = param.option.value.toString().split(",");
    var codentidadf = codentidad[0].toString();
    
    //this.EntidadSelect = param.option.value;
    this.EmpresaMasSelect = codentidadf;
   // swal(this.EmpresaSelect);         
    this.NEmpresaMasSelect = param.option.viewValue;
    //let enti = this.EmpresaSelect;

    this.myEmpresaMas.setValue(this.NEmpresaMasSelect);
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

  
  public ChangingValue(param : any, paramTipo: string)
  {
    if (paramTipo== "Aduana"){
      this.AduanaSelect = param.target.value;
    }
    if (paramTipo== "Regimen"){
      this.RegimenSelect = param.target.value;
    }
  }


  private _filterempf(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresas.filter(empresa => empresa.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  
  private _filteremp(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresasMas.filter(entidad => entidad.Nombre.toLowerCase().indexOf(filterValue) === 0);
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
    bln.BL = num.trim();

    this.objListBLV.push(bln);


  }

  public DescargarFormatoExcel(){

    this.reportService.getFormatoExcel().subscribe(
      data => {
        
        const linkSource = 'data:application/xlsx;base64,' + data;
        const downloadLink = document.createElement("a");
        const fileName = "FormatoExcel.xlsx";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      
      }, (error)=> console.log("Salio error en la descarga: ", error));
  }


  EliminarBL(num: string)
  {
   
    
  var pos = this.objListBLV.map(function(e) { 
    return e.BL; 
   }).indexOf(num); 


   this.objListBLV.splice(pos,1);  

  }

  changeListenerExcel($event) : void {
    this.readThisExcelF($event.target);
  }
  
  changeListener($event) : void {
    this.readThis($event.target);
  }

  
  changeListenerM($event) : void {
    this.readThisM($event.target);
  }  

  readThisExcel(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {

      this.image = myReader.result;
      console.log(this.image.toString());

    
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      
    /*  this.fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }*/
      
      this.fileitemExcel = new FileItem( file.name, file.size, this.reqBase64.Base64, 0);

      this.filenameexcel = file.name; 
      //this.reqBase64.NombreArc;
      //this.fname1 = file.name;
      
     
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

  readThisExcelF(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myreader:FileReader = new FileReader();
  
   // let reader = new FileReader();
    let workbookkk;
    let XL_row_object;
    let json_object;
    myreader.readAsBinaryString(file); 

  

    //myreader.onload = function(){
  /*   myreader.onloadend = (e) =>{
        //  alert(reader.result);
        let data = myreader.result;
         workbookkk=read(data,{type: 'binary'});
         console.log(workbookkk);
 

         workbookkk.SheetNames.forEach(function(sheetName) {
          // Here is your object
         XL_row_object = utils.sheet_to_json(workbookkk.Sheets[sheetName]);         
            
         json_object = JSON.stringify(XL_row_object);

          // this.objListDAM = new Array;
         
         //  this.objListDAM = [];

        // this.objLDAM = XL_row_object;

         


        //  console.log(json_object);
        //  console.log(XL_row_object);
        //    resolve(XL_row_object);
        });

        
       // this.listaDam = XL_row_object;
        //swal(this.listaDam.toString());  

        
        this.objListDAM = [];
        
        for (var i = 0; i <= XL_row_object.length-1; i++) {
          let last = XL_row_object[i];
          
          let dam = new DAM();
          dam.Anio = last.Año.toString();
          dam.BL  = last.BL.toString();
          dam.CodigoAduana = last.Aduana.toString();
          dam.DAM = last.DAM.toString();
          dam.Regimen = last.Regimen.toString();

          this.objListDAM.push(dam);
          
        
        }

        }; */
  

  }


  
  
 public SetGrillaVisibility(param:boolean)
 {
   if (param) {
     document.getElementById('grillaDAM').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillaDAM').style.visibility = "hidden";
   }
 }

 
 public SetGrillaVisibilityM(param:boolean)
 {
   if (param) {
     document.getElementById('grillaDAMMasivo').style.visibility = "visible";
    

   }
   else {    
     document.getElementById('grillaDAMMasivo').style.visibility = "hidden";
   }
 }
 
 readThisM(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.imagem = myReader.result;
    console.log(this.imagem.toString());

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

    var oldstr = this.imagem.toString();
    var newstr = oldstr.toString().replace("data:text/plain;base64,","");
    this.reqBase64.Base64 = newstr;

    
    this.fileitemm = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);

    let index : number = 0;

    if (this.fileitemsZm.length >= 1)
    {index =  this.fileitemsZm.length;}
    else
    {  index = 0;    }
    
    this.fileitemzm = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

    this.filename1m = file.name; 
    //this.reqBase64.NombreArc;
    this.fname1m = file.name;
    
    //this.fileitems.push(fileitem);
    //this.fileitemsZ.push(fileitemz);
    

    //this.CargarGrilla();

  }

  if (file != null)
  {myReader.readAsDataURL(file);}
  else
 
  { 
   
    this.fileitemzm = null;
    this.fileitemm = null;

    let filname1 = this.filename1m;
    let fnam1 = this.fname1m;

    if (filname1 != "")
    {
      
      var fitemz = this.fileitemsZm.filter(function (f) {
        return f.name == fnam1;
      });
      
      if (fitemz.length == 1)
      {
        let fitemf = fitemz[0];

        this.TotalMBm = this.TotalMBm - ((fitemf.size/1024)/1024);

        let totalmbb = this.TotalMBm;
        
        if ( this.TotalMBm < 5)
        {this.EsMayor5m = false}
      }

      //var pos = mapeo.indexOf(this.filename1); 


      var pos = this.fileitemsm.map(function(e) { 
        return e.NombreArc; 
       }).indexOf(this.filename1m); 

       this.fileitemsm.splice(pos,1);  
       this.fileitemsZm.splice(pos,1);

       let leng = this.fileitemsm.length;

       console.log(pos.toString());

    }
    }


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

AgregarArchivoMasivo(nombarc: string)
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
        for (var i = 0; i <= this.fileitemsZm.length - 1; i++) 
        {
          if  (this.fileitemsZm[i].name == nombarc)
           {
        {swal({text :"El archivo ya se encuentra en el listado"});
        return;}
           }      
      }

    this.TotalMBm = 0;

    if (this.fileitemm != null)
    {
      this.fileitemsm.push(this.fileitemm);      
      
      let archivo = new Archivo();

      var oldstr1 = this.fileitemm.Base64.toString();
      var newstr1 = oldstr1.toString().replace("data:image/png;base64,","");

      var oldstr2 = newstr1;
      var newstr2 = oldstr2.toString().replace("data:image/jpeg;base64,","");

      var oldstr3 = newstr2;
      var newstr3 = oldstr3.toString().replace("data:application/pdf;base64,","");

      archivo.Archivo = newstr3;
      archivo.NombreArchivo = nombarc;

      this.objListArchivosMasivo.push(archivo);

    }

    if (this.fileitemzm != null)
    {
      this.fileitemsZm.push(this.fileitemzm);        
    }

    for (var i = 0; i <= this.fileitemsZm.length - 1; i++) 
    {
    this.TotalMBm = this.TotalMBm + ((this.fileitemsZm[i].size/1024)/1024);
    }

    if ( this.TotalMBm > 5)
    {this.EsMayor5m = true}
  }
  else
  {swal({text :"El archivo debe ser del tipo pdf, jpg, png"});
  return;}
 }
}

}


AgregarArchivoExcel(nombarc: string)
{

  
 // if (this.filenameexcel == "" || this.filenameexcel == null || this.filenameexcel == undefined)
 if (this.objListDAM.length == 0) 
  {
    swal("Seleccione el archivo Excel");
    return false;
  }


  /*let dam1 = new DAM();
    dam1.BL = "TMS20030688";
    dam1.CodigoAduana = "118";
    dam1.Regimen = "10";
    dam1.Anio = "2020";
    dam1.DAM = "107211";
    
    this.objListDAM.push(dam1);

    let dam2 = new DAM();
    dam2.BL = "TMS20030688";
    dam2.CodigoAduana = "118";
    dam2.Regimen = "10";
    dam2.Anio = "2020";
    dam2.DAM = "107377";
    
    this.objListDAM.push(dam2);

    let dam3 = new DAM();
    dam3.BL = "TMS20030688";
    dam3.CodigoAduana = "118";
    dam3.Regimen = "10";
    dam3.Anio = "2020";
    dam3.DAM = "107451";
    
    this.objListDAM.push(dam3);*/

//  this.MuestraGrilla = true;

  this.dtTriggerDAM.next(this.objListDAM);    

  this.SetGrillaVisibility(true);

  this.SetGrillaVisibilityM(false);

   


/*  if (nombarc != "")
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
      archivo.Archivo = this.fileitem.Base64;
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
}*/

}


onListControlChanged(list:any)
{
  this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

  //this.selectedOptions = list.selectedOptions.selected.indexOf();

//this.fileitemsZ

}


onListControlChangedM(list:any)
{
  this.selectedOptionsm = list.selectedOptions.selected.map(item => item.value);

  //this.selectedOptions = list.selectedOptions.selected.indexOf();

//this.fileitemsZ

}

/* convertExcelToJson(file)
{
 let reader = new FileReader();
 let workbookkk;
 let XL_row_object;
 let json_object;
 reader.readAsBinaryString(file);
 return new Promise((resolve, reject) => {
   reader.onload = function(){
    

     //  alert(reader.result);
     let data = reader.result;
      workbookkk=read(data,{type: 'binary'});
      console.log(workbookkk);
      workbookkk.SheetNames.forEach(function(sheetName) {
       // Here is your object
        XL_row_object = utils.sheet_to_json(workbookkk.Sheets[sheetName]);
        json_object = JSON.stringify(XL_row_object);
     //  console.log(json_object);
     //  console.log(XL_row_object);
         resolve(XL_row_object);
     });
     };
 });
 } */


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


  EliminarSelectM()
  {
    
   // this.cerrado = true;  
    this.TotalMBm = 0;  

    //this.selectedOptions.sort()

    
    //var selectedOptionsF:Array<number> = this.selectedOptions.sort((n1,n2) => n1 - n2);

    //for (var i = 0; i <= this.selectedOptions.length - 1; i++) 
    //for (var i = this.selectedOptions.length - 1; i >= 0; i--) 
    //for (var i = 0; i <= selectedOptionsF.length - 1; i++)  
    
   for (var i = 0; i <= this.selectedOptionsm.length - 1; i++)    
    {
      
      var pos = this.fileitemsZm.map(function(e) { 
        return e.name; 
       }).indexOf(this.selectedOptionsm[i].toString()); 

       this.fileitemsm.splice(pos,1);  
       this.fileitemsZm.splice(pos,1);

       this.objListArchivosMasivo.splice(pos,1);
      
      //let pos = this.selectedOptions[i];
      
     // this.fileitems.splice(pos,1);  
     // this.fileitemsZ.splice(pos,1);
    }

        
    for (var i = 0; i <= this.fileitemsZm.length - 1; i++) 
    {
      let pos = this.selectedOptionsm[i];

      this.fileitemsZm[i].index = i;

    }

    if (this.fileitemsZm.length  == 0)
    {   this.TotalMBm = 0;}
    
    for (var i = 0; i <= this.fileitemsZm.length - 1; i++) 
    {
    this.TotalMBm = this.TotalMBm + ((this.fileitemsZm[i].size/1024)/1024);
    
    if ( this.TotalMBm < 5)
    {this.EsMayor5m = false}
    }
      
      
  }


}
