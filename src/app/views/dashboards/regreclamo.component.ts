
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith} from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location, DecimalPipe } from '@angular/common';
import { isError } from 'util';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';
import { ReportService } from '../../services/report.service';
import {  Usuario, UsuarioRequest, UsuarioResponse, ActualizarClaveRequest, ActualizarClaveResponse, RolResponse } 
from '../../services/usuario/Usuario';
import swal from 'sweetalert';

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
  
  public isError = false;
  myControl = new FormControl();
  myControlE = new FormControl();
  mySelect = new FormControl();

  
  public LEmpresas : Entidades;
  public ListaEmpresas : Array<entidad> = [];

  usuarioRequest : UsuarioRequest;

  ngOnInit() {

    this.filteredEmp = this.myControlE.valueChanges.pipe(
      startWith(''),
      map(value => this._filteremp(value))
    );

    
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
      
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      });
  }



}
