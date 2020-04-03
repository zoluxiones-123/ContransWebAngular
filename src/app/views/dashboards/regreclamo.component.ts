
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith} from 'rxjs/operators';
import { ListaUnidadNegocio } from '../../models/Factura';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { isError } from 'util';
import { FileItem } from '../../models/FileItem';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';
import { ReportService } from '../../services/report.service';
import {  Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse } 
from '../../services/usuario/Usuario';
import swal from 'sweetalert';
import { Base64RPT,Base64RQT } from '../../models/Base64';
import { ZipRPT,ZipRQT } from '../../models/ConvertirZip';

@Component({
  selector: 'app-regreclamo',
  templateUrl: './regreclamo.component.html',
  styleUrls: ['./regreclamo.component.css']
})
export class RegreclamoComponent implements OnInit {

  constructor(private reportService: ReportService, private usuario: Usuario) {

    
    this.usuarioRequest = { 
      IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
      Cargo : "",
      Telefono : "",
      Celular : "",
      Email : "",
      RolEmpUsuaCodigoDefault : 0
    }
    this.CargarDatosUsuario(this.usuarioRequest);

   }

  filteredEmp: Observable<entidad[]>;
  
  public EntidadSelect:string = "";
  public NEntidadSelect:string = "";
  public UnidadNegSelect: string = "";
  public TotalMB : number = 0.00;
  public EsMayor5 = false;

  
  public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
  
  public isError = false;
  myControl = new FormControl();
  myControlE = new FormControl();
  myNombres = new FormControl();
  myApellidos = new FormControl();
  myNroDocumento = new FormControl();
  myCelular = new FormControl();
  myEmail = new FormControl();
  myTelefono = new FormControl();
  
  mySelect = new FormControl();
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

  
  
  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
   };

   private respBase64: Base64RPT = {
    Archivo: ""    
   };

  
  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];

  usuarioRequest : UsuarioRequest;

  ngOnInit() {

  this.filteredEmp = this.myControlE.valueChanges.pipe(
      startWith(''),
      map(value => this._filteremp(value))
    );

    
  this.reportService.getunidadnegociolist().
  subscribe(data => this.ListaUnidadNegocio = data);

    
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


  }

  
  
  private _filteremp(value: string): entidad[] {
    const filterValue = value.toLowerCase();
     
    return this.ListaEmpresas.filter(emp => emp.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  onListControlChanged(list:any)
  {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

    //this.selectedOptions = list.selectedOptions.selected.indexOf();

//this.fileitemsZ

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

  

  public CargarDatosUsuario(param: UsuarioRequest) {
    this.usuario.obtUsuario(param).subscribe( 
      data => { 
        var resp : UsuarioResponse;
        resp = data;

        this.EntidadSelect = resp.EntiCodigo;
        this.NEntidadSelect = resp.EntiNombre;

        
        this.myControlE.setValue(this.NEntidadSelect);
        this.myNombres.setValue(resp.UsuaNombres);
        this.myApellidos.setValue(resp.UsuarioApellido);
        this.myNroDocumento.setValue(resp.UsuaNumDoc);
        this.myCelular.setValue(resp.UsuaCelular);
        this.myEmail.setValue(resp.UsuaEmail);
        this.myTelefono.setValue(resp.UsuaTelf);
      
      }, 
      error => {
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
        console.log("Error : ", error); 
      });
  }

  
  public ChangingValueUN(param : any)
  {
    this.UnidadNegSelect = param.target.value;
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
