import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
//import { ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo,ConsultaRefrendoExpoRQT,ConsultaRefrendoExpoRPT}  from '../../models/RefrendoExpo';
import { ConsultaPagosServicioRQT, ConsultaPagosServicioRPT, ListaEstadoPagoCobranza} from '../../models/Pagos';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { entidad,Entidades } from 'app/models/entidad';
import { startWith, map } from 'rxjs/operators';
import {PagosCobranzaConsultaDetalleComponent} from './pagoscobranzaconsultadetalle.component';


@Component({
    selector: 'pagoscobranzaconsulta',
    templateUrl: 'pagoscobranzaconsulta.template.html',
    styleUrls: ['pagoscobranzaconsulta.component.css']
  })

  export class PagosCobranzaConsultaComponent implements OnInit{  
    public isError = false;
    public SiCargoData = true;
    //public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    //public UnidadNegSelect:string;
    fechaActual: string;
    minDate: Date;
    maxDate: Date;
    public EstadoSelect:string;
    public ListaEstado : Array<ListaEstadoPagoCobranza>;

    filteredEntidad: Observable<entidad[]>;
    public LEntidades : Entidades;
    public ListaEntidades : Array<entidad> = [];
    ControlEntidades = new FormControl();
    public EntidadesSelect:string = "";
    public COdigoEntidadesSelect:string = "";
    

    constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router){
    //constructor(private reportService: ReportService, public dialogRef: MatDialogRef<PagosCobranzaConsultaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
      this.reportService.ConsultaEstadoPagoCobranza().subscribe(data => this.ListaEstado = data.Data);
      //this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
      this.EntidadesSelect= "";
      this.COdigoEntidadesSelect= "";
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

    public objConsultaPagosServicioRQT : ConsultaPagosServicioRQT;
    public objConsultaPagosServicioRPT: Array<ConsultaPagosServicioRPT>;
    
    public ngOnInit():any {      

    if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);}

      this.SetGrillaVisibility(false);

      this.filteredEntidad = this.ControlEntidades.valueChanges.pipe(
        startWith(''),
        map(value => this._filterEntidades(value))
      );
  
      this.ListaEntidades = new Array
      this.reportService.getListaEntidades().subscribe(
        data => {
          this.LEntidades = data;
          if (this.LEntidades.Data != null)
          {                              
            //console.log(JSON.parse(JSON.stringify(this.LEntidades.Data)));
            let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
            for (var i = 0; i <= listaent.length-1; i++) {
              let last = listaent[i];            
              this.ListaEntidades.push(last);
            }
          //console.log(JSON.stringify(this.ListaEntidades));
          }
          else{
            this.onIsError();   
          }
        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        );
    
    }        

    popupDetallePagosCobranzaConsulta(paramIdLiquidacion: string){
      localStorage.setItem("paramAccion","Detalle");
      localStorage.setItem("paramIdLiquidacion",paramIdLiquidacion);
      const dialogRef = this.dialog.open(PagosCobranzaConsultaDetalleComponent,{
        disableClose: true,
        autoFocus: true,
        width: "800px",
        height: "70%"
      });
/*       dialogRef.afterClosed().subscribe(result => {
        this.RefrescarGrilla();
     
  }
  ); */

    } 

    public CargarGrilla(form: NgForm) {

       if (this.TieneData)
      {
        return;
      } 
      
     /*  this.SiCargoData = true;
      this.dtTrigger.next(this.objTemperaturaRPT);
      this.SetGrillaVisibility(true); */
    console.log(Number.parseInt(this.EstadoSelect));
    //console.log(this.ModalidadSelect);
    this.objConsultaPagosServicioRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Nope: form.value.txtbox_Nope,
      Kent: this.COdigoEntidadesSelect,
      Estado : this.EstadoSelect
    };
    console.log(this.objConsultaPagosServicioRQT);
       if(this.ValidarInput(this.objConsultaPagosServicioRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      } 
      console.log(this.objConsultaPagosServicioRQT);

///Aun Falta obtener el servicio ///
       let res = this.reportService.ConsultaPagosServicio(this.objConsultaPagosServicioRQT);
      console.log(this.objConsultaPagosServicioRPT)
      
      res.subscribe( 
        data => { 
          this.objConsultaPagosServicioRPT = data.Data;
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
              this.dtTrigger.next(this.objConsultaPagosServicioRPT);         
            });
            this.SetGrillaVisibility(true);
           
          }
          else
          {
            this.SiCargoData = true;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
               this.dtTrigger.next(this.objConsultaPagosServicioRPT);
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

    public ValidarInput(param : ConsultaPagosServicioRQT) : boolean
    {
      if(this.NullEmpty(param.Nope))
      {
        this.objConsultaPagosServicioRQT.Nope = "";
      }

      if(this.NullEmpty(this.EstadoSelect))
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
        console.log(this.EstadoSelect);
      }
       if (paramTipo== "Entidad"){
        this.COdigoEntidadesSelect=param.option.value
        this.EntidadesSelect = param.option.viewValue;
        this.ControlEntidades.setValue(param.option.viewValue);
        console.log(this.COdigoEntidadesSelect)
      } 
    }

    private _filterEntidades(value: string): entidad[] {
      const filterValue = value.toLowerCase();
      //console.log(this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0 ));
      return this.ListaEntidades.filter(ent => ent.Nombre.toLowerCase().indexOf(filterValue) === 0 );
    }

    onIsError(): void {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 4000);
    }
  
  
}
