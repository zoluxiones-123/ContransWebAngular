import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/* import { RepStockRealRefRPT } from '../../models/rep_stockrealRPT'
import { RepStockRealCabecera } from '../../models/rep_stockrealRPT' */

import { DetRepStockCliRPT } from '../../models/det_repstockcli'
import { DetRepStockCliRQT } from '../../models/det_repstockcli'


import { ReportService } from '../../services/report.service'
import swal from 'sweetalert';


import { DataTableDirective } from 'angular-datatables';
import {DataTablesModule } from 'angular-datatables';

import { Subject, fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-detrepstockcli',
  templateUrl: './detrepstockcli.component.html',
  styleUrls: ['./detrepstockcli.component.css']
})
export class DetrepstockCliComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<DetrepstockCliComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any, private reportService: ReportService)
     {   }
   
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  dtTrigger:Subject<any> = new Subject();

  columns: string[] = [];

  public SiCargoData = true;
  public TieneData = false;
  public EsTotalG : string;
  public TipoGrafico: string;
  public CabeceraPopup: string;
  public NombreEntidad: string;
  public loading : boolean;
/*   public objStockRealRefRPT: Array<RepStockRealRefRPT>;
  public objColumnaRealRef: Array<RepStockRealCabecera>; */

  public objDetStockCliRPT: Array<DetRepStockCliRPT>;
  public objDetStockCliRQT : DetRepStockCliRQT = {
    IDUSer: 1,
    IDRol: 0,
    IdCliente: ""
  };
  

  
   dtOptions : any = {
     pagingType: 'full_numbers',
     pageLength: 10,
     searching: false,
     dom: 'Bfrtip',       
     buttons: [
      'colvis',
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

    this.EsTotalG = localStorage.getItem("EsTotalG").toString();
    this.TipoGrafico = localStorage.getItem("TipoGrafico").toString();
    this.NombreEntidad = localStorage.getItem("NombreEntidad").toString();
    this.objDetStockCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
    this.objDetStockCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.objDetStockCliRQT.IdCliente = localStorage.getItem("CodEntidad").toString();

    this.loading = true;

    if (this.TipoGrafico=="repstockcli")
    {
    this.CabeceraPopup = "Detalle Stock Contenedores: " + this.NombreEntidad;
    let res = this.reportService.getStockImpCli(this.objDetStockCliRQT);
            
    res.subscribe( 
      data => { 
        this.objDetStockCliRPT = data;
        if (data.length >= 1)
        {
          this.SiCargoData = true;
          this.columns = Object.keys(data[0]);
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(this.objDetStockCliRPT);             
          this.dtTrigger
          this.SetGrillaVisibility(true);
          });
        }
        else
        {
          swal("No existen datos");
        }
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );
  }
  else if (this.TipoGrafico=="repstockexpocli")
  {
    this.CabeceraPopup = "Detalle Stock Contenedores Exportacion: " + this.NombreEntidad;
    let res = this.reportService.getStockImpCli(this.objDetStockCliRQT);
            
    res.subscribe( 
      data => { 
        this.objDetStockCliRPT = data;
        if (data.length >= 1)
        {
          this.SiCargoData = true;
          this.columns = Object.keys(data[0]);
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(this.objDetStockCliRPT);             
          this.SetGrillaVisibility(true);
          });
        }
        else
        {
          swal("No existen datos");
        }
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );
  }
  }

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

 



  Cerrar()
  {
    this.dialogRef.close();
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

}