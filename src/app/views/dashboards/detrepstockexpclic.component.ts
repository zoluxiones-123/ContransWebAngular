import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/* import { RepStockRealRefRPT } from '../../models/rep_stockrealRPT'
import { RepStockRealCabecera } from '../../models/rep_stockrealRPT' */

import { DetRepStockExpCliRPT } from '../../models/det_repstockexpcli'
import { DetRepStockExpCliRQT } from '../../models/det_repstockexpcli'


import { ReportService } from '../../services/report.service'
import swal from 'sweetalert';


import { DataTableDirective } from 'angular-datatables';
import {DataTablesModule } from 'angular-datatables';

import { Subject, fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-detrepstockexpcli',
  templateUrl: './detrepstockexpcli.component.html',
  styleUrls: ['./detrepstockexpcli.component.css']
})
export class DetrepstockExpCliComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<DetrepstockExpCliComponent>, 
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
  
/*   public objStockRealRefRPT: Array<RepStockRealRefRPT>;
  public objColumnaRealRef: Array<RepStockRealCabecera>; */

  public objDetStockExpCliRPT: Array<DetRepStockExpCliRPT>;
  public objDetStockExpCliRQT : DetRepStockExpCliRQT = {
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

    this.EsTotalG = localStorage.getItem("EsTotalG").toString();
    this.TipoGrafico = localStorage.getItem("TipoGrafico").toString();
    this.objDetStockExpCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
    this.objDetStockExpCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.objDetStockExpCliRQT.IdCliente = localStorage.getItem("CodEntidad").toString();

    if (this.TipoGrafico=="repstockcli")
    {
    let res = this.reportService.getStockImpCli(this.objDetStockExpCliRQT);
            
    res.subscribe( 
      data => { 
        this.objDetStockExpCliRPT = data;
        if (data.length >= 1)
        {
          this.SiCargoData = true;

          this.columns = Object.keys(data[0]);

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
            
          //this.dtTrigger.next(this.objStockRealRefRPT);     
          this.dtTrigger.next(this.objDetStockExpCliRPT);             
           
          this.SetGrillaVisibility(true);

          //this.dtTrigger.next(this.objFacturaRPT);
          //this.SetGrillaVisibility(true);
          // this.TieneData = true;
          });
        }
        else
        {
          swal("No existen datos");
        }
       // this.dtTrigger.unsubscribe();
      }, 
      error => {
        swal("Error al cargar los datos"); 
        console.log("Error : ", error); 
      }
    );



   /*this.CargarColumnas();
  
    if (this.EsTotalG == "0")
    {this.CargarGrilla20ST();}
    else
    {this.CargarGrillaTotal();}
    
    this.SiCargoData = true;
           
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

    dtInstance.destroy();
    
    this.dtTrigger.next(this.objStockRealRefRPT);     
    this.dtTrigger2.next(this.objStockRealRefRPT);             
   
    this.SetGrillaVisibility(true);
 });*/

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