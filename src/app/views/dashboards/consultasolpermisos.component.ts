
import {GenerarsolpermisoComponent} from './generarsolpermiso.component';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { UniNegocio,UnidadNegocio}  from '../../models/Factura';
import { LiquidacionBRQT,LiquidacionBRPT,LiquidacionCont}  from '../../models/Liquidacion';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BL,Contenedor,ConsultaLevanteRPT,ConsultaLevanteRQT, DetConsLevante, ContenedorL,DocumentoBL,Documento,
ConsultaSolPermisoRPT,ConsultaSolPermisoRQT,SolicitudPermiso } from '../../models/Permiso';
import {MontopagarsolpermisoComponent} from './montopagarsolpermiso.component';


@Component({
  selector: 'app-consultasolpermisos',
  templateUrl: './consultasolpermisos.component.html',
  styleUrls: ['./consultasolpermisos.component.css']
})
export class ConsultasolpermisosComponent implements OnInit {
  

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;


  public loading: boolean = false;
  myUnidad = new FormControl();   
  public ListaUniNegocio : Array<UnidadNegocio>;
  public Estados : Array<string>;

  public EstSolPerSelect : string = "-1";

  public Documento : string = "";
  public DAMAnio : string = "";
  public DAMNro : string = "";

  
  minDate: Date;
  maxDate: Date;
  

  
  public objConsultaSolPerRQT : ConsultaSolPermisoRQT;

  public objConsultaSolPerRPT: ConsultaSolPermisoRPT;
  
  public objLSolPer : Array<SolicitudPermiso>;

  constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router) { 
   /* this.reportService.getEstadosSolPermiso().subscribe(
    data => {

      this.ListaUniNegocio = data.Data;
         

} 
);*/
    
  }


  
  dtTrigger:Subject<any> = new Subject();
  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    dom: 'Bfrtip',  
    buttons: [
      'colvis',
      {
          extend: 'excel',
          exportOptions: {
              //columns: ':visible'
              columns: ':visible:not(:eq(0))'
          }
      }     
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
  ngOnInit() {
  
    this.SetGrillaVisibility(false);
    this.loading = false;
    this.setearFechasLimite();

    this.Estados = new Array;
    
    this.Estados.push("Pendiente");
    this.Estados.push("Cancelado");
    this.Estados.push("En Proceso");
  

    this.reportService.getEstadosSolPermiso().subscribe(
      data => {
  
        this.ListaUniNegocio = data.Data;
           
  
  } 
  );
  
  }


  setearFechasLimite(){
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
  }

  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
  }

  public popupAccion(estado:string, codigosolper:number)
  { 

    let noaccion : boolean = false;
      
    for (var i = 0; i <= this.Estados.length-1; i++) {
      let last = this.Estados[i];            
      if (estado == last)
      {
        noaccion = true;
      }
    }



    if (noaccion == false)
    // "Cancelado", "En Proceso")) 
    {
    localStorage.setItem("SolPerEst", codigosolper.toString());
    localStorage.setItem("EstadoPermiso", estado);

    const dialogRef = this.dialog.open(MontopagarsolpermisoComponent,{
      disableClose: true,
      autoFocus: true,
      width: "700px",
      height: "100%"
    });
    
  }
  else
  {
    swal("No existe acción a realizar en estado " + estado);
  }
  }


  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

  GenerarSolicitud()
  {
    const dialogRef = this.dialog.open(GenerarsolpermisoComponent,{
      disableClose: true,
      autoFocus: true,
      width: "900px",
      height: "100%"
    });
    
  }

  
  public CargarGrilla(form: NgForm) {

    this.objConsultaSolPerRQT = {
      IDUser : Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Codigo : 0,
      Estado : Number.parseInt(this.EstSolPerSelect),
      Bl :  form.value.txtbox_NroDocumento,
      Anio : form.value.txtbox_Anio,
      Dam : form.value.txtbox_Numero,
      Desde : form.value.txtbox_Desde,
      Hasta : form.value.txtbox_Hasta

    //  Anio : this.DAMAnio,

     
     // Dam : this.DAMNro

    };

    if(this.ValidarInput(this.objConsultaSolPerRQT))
    {        
      swal({
            text: "Error en los campos de ingreso, por favor verificar",
            icon: "warning",
          });
      return;
    }

    this.loading = true;

  

    let res = this.reportService.getSolicitudPermiso(this.objConsultaSolPerRQT);
        
    res.subscribe( 
      data => { 
        this.objLSolPer = data;
        if (data.length >= 1)
        {
          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

            dtInstance.destroy();
    
            this.dtTrigger.next(this.objLSolPer);
            this.SetGrillaVisibility(true);
          });

         // this.dtTrigger.next(this.objFacturaRPT);
          //this.SetGrillaVisibility(true);
          // this.TieneData = true;
        }
        else
        {
          //this.SiCargoData = true;

          this.loading = false;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.objLSolPer);
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

  public ValidarInput(param : ConsultaSolPermisoRQT) : boolean
  {
  /*  if (this.NullEmpty(param.Estado))
    {
      if (param.Estado = NaN)
      return true;
    }*/

    if (param.Estado == -1 )
    {
      return true;
    }
    
    if(this.NullEmpty(param.Desde))
    {
      this.objConsultaSolPerRQT.Desde = "";
    }
    
    if(this.NullEmpty(param.Hasta))
    {
      this.objConsultaSolPerRQT.Hasta = "";
    }
    
   // this.objConsultaSolPerRQT.Desde = this.objConsultaSolPerRQT.Desde.toLocaleDateString();
   // this.objConsultaSolPerRQT.Hasta = this.objConsultaSolPerRQT.Hasta.toLocaleDateString();

    if(this.NullEmpty(param.Bl))
    {
      this.objConsultaSolPerRQT.Bl = "";
    }

    if(this.NullEmpty(param.Anio))
    {
      this.objConsultaSolPerRQT.Anio = "";
    }

    if(this.NullEmpty(param.Dam))
    {
      this.objConsultaSolPerRQT.Dam = "";
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
      document.getElementById('grillapermisos').style.visibility = "visible";
    }
    else {
      document.getElementById('grillapermisos').style.visibility = "hidden";
    }
  }
  
  public ChangingValue(param : any)
  {
    this.EstSolPerSelect = param.target.value;
  }

}
