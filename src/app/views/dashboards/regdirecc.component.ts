import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SolicitudInscrip } from '../../models/solicinsc';
import { RespSolicitud } from '../../models/resp_solicinsc';
import { FileItem } from '../../models/FileItem';
import { DataTableDirective } from 'angular-datatables';

import { Subject, fromEventPattern } from 'rxjs';

import { GrabarDireccRQT,GrabarDireccRPT } from '../../models/GrabarDirecc';
import { Base64RPT,Base64RQT } from '../../models/Base64';
import { ZipRPT,ZipRQT } from '../../models/ConvertirZip';


import { ReportService } from '../../services/report.service';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { isError } from 'util';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {MatCheckboxModule} from '@angular/material/checkbox';
import swal from 'sweetalert';

import 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-regdirecc',
  templateUrl: './regdirecc.component.html',
  styleUrls: ['./regdirecc.component.css']
})
export class RegdireccComponent implements OnInit {

  constructor(private reportService: ReportService, 
    private router: Router, 
    public dialogRef : MatDialogRef<RegdireccComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private location: Location,
    private fb: FormBuilder,
    private formBuilder: FormBuilder ) { }

    fileData: File = null;
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    SADA: boolean = false;
    IMO: boolean = false;
    CAVA: boolean = false;
    IQBF: boolean = false;
    Sobredimensionada : boolean = false;    
    public SiCargoData = true;
    public TieneData = false;
    public EsMayor5 = false;

    myControl = new FormControl();
    myControlE = new FormControl();
    mySelect = new FormControl();
    disableSelect = new FormControl();
    
    filteredOptions: Observable<string[]>;
    filteredEntidad: Observable<entidad[]>;
    filteredEmp: Observable<entidad[]>;
    fileitems = [];
    fileitemsZ = [];
    selectedOptions = [];
    
  usersForm: FormGroup;
  heroForm: FormGroup;
  isLoading = false;
  image: any;

  //myControl = new FormControl();
  //filteredOptions: Observable<string[]>;

  
  public isError = false;
  public EntidadSelect:string = "";
  public NEntidadSelect:string = "";

  public NaveSelect:string = "";
  public NNaveSelect:string = "";
  public ProductoSelect:string = "";
  public CarpetaFinal:string = "";
  

  public msjfinal:string = "";

  public filename1:string = "";
  public filename2:string = "";

  public filename3:string = "";
  public filename4:string = "";
  public filename5:string = "";
  public filename6:string = "";


  public fname1:string = "";
  public fname2:string = "";

  public fname3:string = "";
  public fname4:string = "";
  public fname5:string = "";
  public fname6:string = "";

  
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];

  
  public LProductos : Entidades;
  public ListaProductos : Array<entidad> = [];


  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];
  public TotalMB : number = 0.00;

  public fileitem : any ;
  public fileitemz : any;
  
  


  registerForm: FormGroup;
  submitted = false;
  cerrado = false;
  agarchiv = false;

  
  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
   };

   private respBase64: Base64RPT = {
    Archivo: ""    
   };

   
  private reqZip: ZipRQT = {
    Carpeta: ""    
   };

   private respZip: ZipRPT = {
    Archivo: ""    
   };
 

  private regDirecc: GrabarDireccRQT = {
   IDUser: 0,
   IDRol: 0,
   CodNave: "",
   FechaAproxLlegada: "",
   BlNumero: "",
   BlNumeroHijo: "",
   Observacion: "",
   CodAgencia: "",
   SADA: false,
   IMO: false,
   CAVA: false,
   IQBF: false,
   Sobredimencionada : false,
   CodProducto: "",
   Carpeta: ""
  };

  private respRegDirecc: GrabarDireccRPT = {
    Cod: 0,
    Msj: ""
  };

  dtTrigger:Subject<any> = new Subject();
  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
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
        excel : "Exportar a Excel"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };

  ngOnInit() {

    this.filteredEntidad = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filtere(value))
    );

    this.filteredEmp = this.myControlE.valueChanges.pipe(
      startWith(''),
      map(value => this._filteremp(value))
    );

    
  this.ListaEntidades = new Array
  this.ListaEmpresas = new Array
  this.ListaProductos = new Array

  //this.reportService.getListaProductos().subscribe(data => this.ListaProductos = data);

  this.reportService
  .getListaProductos()
  .subscribe(
    data => {
      
      this.LProductos = data;

      if (this.LProductos.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LProductos.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaProductos.push(last);
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
      
  this.reportService
  .getListaNaves()
  .subscribe(
    data => {
      
      this.LEntidades = data;

      if (this.LEntidades.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEntidades.push(last);
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

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();


  }

  change7($event) : void {
    this.readThis7($event.target);
  }

  change3($event) : void {
    this.readThis3($event.target);
  }

  change4($event) : void {
    this.readThis4($event.target);
  }

  change5($event) : void {
    this.readThis5($event.target);
  }

  change6($event) : void {
    this.readThis6($event.target);
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
      console.log("Aqui es con el boton cancelar");  

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
  readThis3(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      this.TotalMB = this.TotalMB + tamanioArch;
      
      let totalMBs = this.TotalMB;

      if (totalMBs > 5)
      {this.EsMayor5 = true}
      
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }

      
      let fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);
      
      let fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.filename3 = this.reqBase64.NombreArc;
      this.fname3 = file.name;
      
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
      

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
   
    { 
      console.log("Aqui es con el boton cancelar");  
  
      let filname3 = this.filename3;
      let fnam3 = this.fname3;
  
      if (filname3 != "")
      {
        
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam3;
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
         }).indexOf(this.filename3); 
  
         this.fileitems.splice(pos,1);  
         this.fileitemsZ.splice(pos,1);

         let leng = this.fileitems.length;
  
         console.log(pos.toString());
  
      }
      }


  }

  readThis4(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      this.TotalMB = this.TotalMB + tamanioArch;
      
      let totalMBs = this.TotalMB;

      if (totalMBs > 5)
      {this.EsMayor5 = true}
      
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }

      
      let fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);
      
      let fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.filename4 = this.reqBase64.NombreArc;
      this.fname4 = file.name;
      
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
      

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
   
    { 
      console.log("Aqui es con el boton cancelar");  
  
      let filname4 = this.filename4;
      let fnam4 = this.fname4;
  
      if (filname4 != "")
      {
        
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam4;
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
         }).indexOf(this.filename4); 
  
         this.fileitems.splice(pos,1);  
         this.fileitemsZ.splice(pos,1);

         let leng = this.fileitems.length;
  
         console.log(pos.toString());
  
      }
      }


  }

  readThis5(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      this.TotalMB = this.TotalMB + tamanioArch;
      
      let totalMBs = this.TotalMB;

      if (totalMBs > 5)
      {this.EsMayor5 = true}
      
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }

      
      let fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);
      
      let fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.filename5 = this.reqBase64.NombreArc;
      this.fname5 = file.name;
      
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
      

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
   
    { 
      console.log("Aqui es con el boton cancelar");  
  
      let filname5 = this.filename5;
      let fnam5 = this.fname5;
  
      if (filname5 != "")
      {
        
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam5;
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

  readThis6(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      this.TotalMB = this.TotalMB + tamanioArch;
      
      let totalMBs = this.TotalMB;

      if (totalMBs > 5)
      {this.EsMayor5 = true}
      
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }

      
      let fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);
      
      let fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.filename6 = this.reqBase64.NombreArc;
      this.fname6 = file.name;
      
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
      

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
   
    { 
      console.log("Aqui es con el boton cancelar");  
  
      let filname6 = this.filename6;
      let fnam6 = this.fname6;
  
      if (filname6 != "")
      {
        
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam6;
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


  readThis7(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());

      //this.fileitems = [];
    
      //let fileitem = new FileItem( file.name, file.size, this.image.toString());

      let tamanioArch : number = (file.size / 1024) / 1024;

      this.TotalMB = this.TotalMB + tamanioArch;

      let totalMBs = this.TotalMB;
      
      if (totalMBs > 5)
      {this.EsMayor5 = true}
            
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0)
      { var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;}

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,","");
      this.reqBase64.Base64 = newstr;
      
      this.filename2 = this.reqBase64.NombreArc;

      let index : number = 0;

      if (this.fileitemsZ.length >= 1)
      {index =  this.fileitemsZ.length;}
      else
      {  index = 0;    }

      let fileitem = new Base64RQT("", this.reqBase64.Base64 ,  this.reqBase64.NombreArc,  this.reqBase64.TipoArc);

      let fileitemz = new FileItem( file.name, file.size, this.reqBase64.Base64, index);

      this.fname2 = file.name;
      
      this.fileitems.push(fileitem);
      
      
      this.fileitemsZ.push(fileitemz);

      //this.CargarGrilla();

    }

    if (file != null)
    {myReader.readAsDataURL(file);}
    else
    { 
    console.log("Aqui es con el boton cancelar");  

    let filname2 = this.filename2;
    let fnam2 = this.fname2;    

    if (filname2 != "")
    {

      var fitemz = this.fileitemsZ.filter(function (f) {
        return f.name == fnam2;
      });
      
      if (fitemz.length == 1)
      {
        let fitemf = fitemz[0];

        this.TotalMB = this.TotalMB - ((fitemf.size/1024)/1024);

        let totalmbb = this.TotalMB;
        
        if ( this.TotalMB < 5)
        {this.EsMayor5 = false}
      }

      var pos = this.fileitems.map(function(e) { 
        return e.NombreArc; 
       }).indexOf(this.filename2); 

       this.fileitems.splice(pos,1);
       this.fileitemsZ.splice(pos,1);
       

       let leng = this.fileitems.length;

       console.log(pos.toString());

    }
    }

  }

  public toggleSelection(item, list) {
    item.selected = !item.selected;
  }

  private _filtere(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0);

  }


  private _filteremp(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresas.filter(emp => emp.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onListControlChanged(list:any)
  {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

    //this.selectedOptions = list.selectedOptions.selected.indexOf();

//this.fileitemsZ

  }


  AgregarArchivo(nombarc: string)
  {

    this.cerrado = true;

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


  EliminarSelect()
  {
    
    this.cerrado = true;  
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

  public CargarGrilla() {

    if (this.TieneData)
    {
      return;
    }

          this.SiCargoData = true;
          this.dtTrigger.next(this.fileitems);
          this.SetGrillaVisibility(true);
          // this.TieneData = true;
      
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


  public RegistrarDireccion(form: NgForm)
  {
    

    if (this.cerrado == true)
    { return;  }

    if (this.EsMayor5 == true)
    {return; }


    if (this.NEntidadSelect == "" || this.EntidadSelect == "" || this.myControlE.value.toString() == "")   
    {swal({text :"Debe seleccionar la Agencia de Carga"});
    return;}

    
    if (this.NNaveSelect == "" || this.NaveSelect == "" || this.myControl.value.toString() == "")   
    {swal({text :"Debe seleccionar la Nave"});
    return;}

    this.regDirecc.CodNave = this.NaveSelect;
    this.regDirecc.CodAgencia = this.EntidadSelect;

    this.regDirecc.IDUser =  Number.parseInt(localStorage.getItem("Usuario"));
    this.regDirecc.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    
    this.regDirecc.FechaAproxLlegada = form.value.txtbox_fechall.toLocaleDateString('zh-Hans-CN');
    this.regDirecc.BlNumero = form.value.txtbox_BL;
    this.regDirecc.BlNumeroHijo = form.value.txtbox_HBL;
    this.regDirecc.Observacion = form.value.txtarea_Obs;

    if (this.regDirecc.Observacion == null)
    { this.regDirecc.Observacion = "";}
    
    this.regDirecc.SADA = this.SADA;
    this.regDirecc.IMO = this.IMO;
    
    this.regDirecc.CAVA = this.CAVA;
     
    this.regDirecc.IQBF = this.IQBF;
    this.regDirecc.Sobredimencionada = this.Sobredimensionada;
    this.regDirecc.CodProducto = this.ProductoSelect;
    this.regDirecc.Carpeta = "Carpeta";
    
    this.registrarDireccionamiento();
     
  //  } 
        
  }

  
  public ChangingValueP(param : any)
  {
    this.ProductoSelect = param.target.value;
  }

  
  public Checked(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.CAVA = chekeado;

    if (chekeado == false)
    {
         this.mySelect.setValue("");
         this.mySelect.disable();
    }
    else
    {this.mySelect.enable();}

    if (chekeado == true)
    {
      swal({
        title: "Alerta Contrans",
        text:  "Debe seleccionar a que grupo pertenece su mercaderia.",
                icon: "warning"
              });

    }

  }

  
  public CheckedSADA(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.SADA = chekeado;


    if (chekeado == true)
    {
      swal({
        title: "Alerta Contrans",
        text:   "Confirmar a: \n DireccionamientosContrans@contrans.com.pe \n canal seleccionado en DAM 2 días antes del \n arribo de la nave",      
        icon: "warning"
      });
    }

  }

  public CheckedIMO(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.IMO = chekeado;

    if (chekeado == true)
    {
    swal({
      title: "Alerta Contrans",
      text:   "Deberá adjuntarnos Hoja Resumen de , \n" +
              "Seguridad a fin de proceder con el  \n" +
              "traslado del contenedor" , 
      icon: "warning"
    });
    
    }


  }

  public CheckedSobre(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.Sobredimensionada = chekeado;

    
    if (chekeado == true)
    {
      swal({
        title: "Alerta Contrans",
        text:   "De tratarse de carga sobredimensionada, \n" +
                "agradeceremos enviar mayor información \n" +
                "como packing list, fotos de la carga, etc. \n" +
                "que nos permitan programar los recursos \n" +
                "necesarios para la operación.",      
        icon: "warning"
      });
    }
  }

  
  public CheckedIQBF(param : any)
  {
    let chekeado = param.currentTarget.checked;

    this.IQBF = chekeado;

    if (chekeado == true)
    {
      swal({
        title: "Alerta Contrans",
        text:  "En el caso de que su importación este referida a carga IQBF, sirvase adjuntar: \n \n " +
                "a. Registro de Bienes Fiscalizados del Cliente Importador(Autorizado por Sunat) \n" +
                "b. Autorización de ingreso al país - Formulario Q-201. \n" +
                "c. Hoja de Resumen de Seguridad(en español). \n" +
                "d. Hojas MSDS(en español)",
                icon: "warning"
              });

    }
  }



  
  public ChangingValue(param : any)
    {
      var codenti = param.option.value.toString().split(",");
      var codentif = codenti[0].toString();
      
      //this.EntidadSelect = param.option.value;
      this.NaveSelect = codentif;      
      this.NNaveSelect = param.option.viewValue;
      let enti = this.NaveSelect;

      this.myControl.setValue(this.NNaveSelect);
    }

    public ChangingValueE(param : any)
    {
      var codenti = param.option.value.toString().split(",");
      var codentif = codenti[0].toString();
      
      //this.EntidadSelect = param.option.value;
      this.EntidadSelect = codentif;      
      this.NEntidadSelect = param.option.viewValue;
      let enti = this.EntidadSelect;

      this.myControlE.setValue(this.NEntidadSelect);
    }
  
  
    Grabar(){
      this.cerrado = false;
    }
  
  onClose(){

    this.regDirecc.CodNave = null;
    this.regDirecc.CodAgencia = null;

    this.regDirecc.IDUser =  null;
    this.regDirecc.IDRol = null;
    
    this.regDirecc.FechaAproxLlegada = null;
    this.regDirecc.BlNumero = null;
    this.regDirecc.BlNumeroHijo = null;
    this.regDirecc.Observacion = null;
    
    this.regDirecc.SADA = null;
    this.regDirecc.IMO = null;
    
    this.regDirecc.CAVA = null;
     
    this.regDirecc.IQBF = null;
    this.regDirecc.Sobredimencionada = null;
    this.regDirecc.CodProducto = null;
    this.regDirecc.Carpeta = null;
    this.cerrado = true;
    this.dialogRef.close();
  }

  public RegistrarDirecc(form: NgForm)
  {

    if (this.cerrado == true)
    { return;  }

    interface MyObj {
      Entidad: string;
      Nombre: string;
    }
  
    let obj: MyObj = JSON.parse(JSON.stringify(this.usersForm.get('userInput').value));

    if (this.NEntidadSelect == "" || this.EntidadSelect == "" || this.myControl.value.toString() == "")   
    {swal({text :"Debe seleccionar la empresa"});
    return;}
    
   

      this.registrarDireccionamiento();
     
    //} 
        
  }

  registrarBase64(carpeta:string):void
  {

    for (var i = 0; i <= this.fileitems.length - 1; i++) 
    {
      
    let reqBas64 = this.fileitems[i];
    reqBas64.Carpeta = carpeta;
      
    this.reportService
     //.loginuser(this.user.Usuario, this.user.Password)
     //.RegistrarBase64(this.reqBase64)
     .RegistrarBase64(reqBas64)
     .subscribe(
     data => {      
       this.respBase64 = data;
       if (this.respBase64 != null)
       {
                         
           //if (this.respSolic.Msj == "Ok")
           if (data != null)
           {
             
            console.log("Archivo guardado correctamente");
         
             //this.dialogRef.close();
             //return 1;
           }
           else
           { 
            this.msjfinal = data.toString(); 
            swal({text : this.msjfinal.toString()});  
           }
        
       } 
       else{
         localStorage.removeItem('StockTotal');       
         this.onIsError();   
       }                       
     },  
     error => {
       this.onIsError();           
       console.log("Error");}
     );
    
  //  if (i == this.fileitems.length - 1)
   // { this.onClose();     }

     }
     this.ConvertirZip(carpeta);
      //this.onClose();     
    }

    
ConvertirZip(carpeta:string):void
  {      
    this.reqZip.Carpeta = carpeta;
      
    this.reportService
     
     .ConvertirZip(this.reqZip)
     .subscribe(
     data => {      
       this.respZip = data;
       if (this.respZip != null)
       {
                         
           //if (this.respSolic.Msj == "Ok")
           if (data != null)
           {
             
            console.log("Carpeta Zipeada correctamente");
         
             //this.dialogRef.close();
             //return 1;
           }
           else
           { 
            this.msjfinal = data.toString(); 
            swal({text : this.msjfinal.toString()});  
           }
        
       } 
       else{
         localStorage.removeItem('StockTotal');       
         this.onIsError();   
       }                       
     },  
     error => {
       this.onIsError();           
       console.log("Error");}
     );
    
  //  if (i == this.fileitems.length - 1)
   // { this.onClose();     }

     
      this.onClose();     
    }

  registrarDireccionamiento():void{
    
   this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .RegDireccionamiento(this.regDirecc)
    .subscribe(
    data => {      
      this.respRegDirecc = data[0];
      if (this.respRegDirecc != null)
      {
                        
          //if (this.respSolic.Msj == "Ok")
          if (data[0].Cod > 0)
          {
            
            this.msjfinal = "Direccionamiento Registrado Correctamente con código: " + data[0].Cod.toString() ;
            this.CarpetaFinal =  data[0].Msj.toString()
            swal({text : this.msjfinal , icon:"success"});

           this.reqBase64.Carpeta = this.CarpetaFinal;
           this.registrarBase64(this.CarpetaFinal);
          
            //this.dialogRef.close();
            //return 1;
          }
          else
          { 
           this.msjfinal = data[0].Msj.toString(); 
           swal({text : this.msjfinal.toString()});  
          }
       
      } 
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }                       
    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );
   
    }

  solo_letras(val)
  {
    var k = val.keyCode;
    var res = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 );
    return res
  }

  solo_numerostelf(val)
  {
    var k = val.keyCode;
    var res = (k == 45 || k == 8 || k == 32 || (k >= 48 && k <= 57));
    return res
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


}
