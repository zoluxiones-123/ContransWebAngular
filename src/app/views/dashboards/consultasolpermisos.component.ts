
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
  public EstSolPerSelect : string = "";

  public Documento : string = "";
  public DAMAnio : string = "";
  public DAMNro : string = "";
  

  
  public objConsultaSolPerRQT : ConsultaSolPermisoRQT;

  public objConsultaSolPerRPT: ConsultaSolPermisoRPT;
  
  public objLSolPer : Array<SolicitudPermiso>;

  constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router) { 
    this.reportService.getEstadosSolPermiso().subscribe(
    data => {

      this.ListaUniNegocio = data.Data;
         

} 
);
    
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
  
  }

  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
  }

  public popupAccion(estado:string, codigosolper:number)
  { 
    if (estado != "Pendiente")
    {
    localStorage.setItem("SolPerEst", codigosolper.toString());

    const dialogRef = this.dialog.open(MontopagarsolpermisoComponent,{
      disableClose: true,
      autoFocus: true,
      width: "700px",
      height: "100%"
    });
    
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
      width: "700px",
      height: "100%"
    });
    
  }

  
  public CargarGrilla() {

    this.objConsultaSolPerRQT = {
      IDUser : Number.parseInt(localStorage.getItem("Usuario")),
      IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Codigo : 0,
      Estado : Number.parseInt(this.EstSolPerSelect),
      Bl : this.Documento,
      Anio : this.DAMAnio,
      Dam : this.DAMNro
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
    if (this.NullEmpty(this.EstSolPerSelect))
    {
      return true;
    }

    if(this.NullEmpty(param.Bl))
    {
      this.objConsultaSolPerRQT.Bl = "";
    }

    if(this.NullEmpty(param.Anio))
    {
      this.objConsultaSolPerRQT.Anio = " ";
    }

    if(this.NullEmpty(param.Dam))
    {
      this.objConsultaSolPerRQT.Dam = " ";
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
  
  public ChangingValue(param : any)
  {
    this.EstSolPerSelect = param.target.value;
  }

}
