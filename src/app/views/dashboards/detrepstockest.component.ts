

import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { RepStockRealRefRPT } from '../../models/rep_stockrealRPT'
import { RepStockRealCabecera } from '../../models/rep_stockrealRPT'

import {DetRepStockEstRPT, DetRepStockCliRPT } from '../../models/det_repstockcli'
import {DetRepStockEstRQT } from '../../models/det_repstockcli'

import { ReportService } from '../../services/report.service'
import swal from 'sweetalert';


import { DataTableDirective } from 'angular-datatables';
import {DataTablesModule } from 'angular-datatables';

import { Subject, fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-detrepstockest',
  templateUrl: './detrepstockest.component.html',
  styleUrls: ['./detrepstockest.component.css']
})
export class DetrepstockestComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<DetrepstockestComponent>, 
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
  public TituloReporte : string;
  public loading : boolean;
  
  public objStockRealRefRPT: Array<RepStockRealRefRPT>;
  public objColumnaRealRef: Array<RepStockRealCabecera>;

  public objDetStockCliRPT: Array<DetRepStockEstRPT>;

  public objDetStockCliRQT : DetRepStockEstRQT = {
    IDUSer: 1,
    IDRol: 0,
    Index: 0
  };
  

  
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
              columns: ':visible'
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

   
    this.objDetStockCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
    this.objDetStockCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.objDetStockCliRQT.Index = Number.parseInt(localStorage.getItem("IndexEst"));
    this.TituloReporte = localStorage.getItem("TituloReporte").toString(); 

    this.loading = true;
     
    let res = this.reportService.getDetStockEst(this.objDetStockCliRQT);
  
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
            
          //this.dtTrigger.next(this.objStockRealRefRPT);     
          this.dtTrigger.next(this.objDetStockCliRPT);             
           
          this.SetGrillaVisibility(true);

          });
        }
      ///  else
      //  {
     //     swal("No existen datos");
      //  }
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

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

  /*public CargarGrilla20ST(){
    this.objStockRealRefRPT = [
      {

        Id: 1,
        Container: "DRYU-259859-5",
        Size: 20,
        Tipo: "ST",
        Tara: 2200,
        PayLoad: 28280,
        AnioFabr: 2012,
        Clase: "M",
        CondicionCaja: "DD",
        CondicionMaquina: "OH",
        Bloqueo: "",
        BloqueoMotivo: "",
        FechaRecepcion: "9/10/2019",
        Nave: "MIZAR",
        NroViaje: "19037S",
        Marca: "AC"
      },       
      {
        Id: 2,
        Container: "TRHU-259859-5",
        Size: 20,
        Tipo: "ST",
        Tara: 2180,
        PayLoad: 28300,
        AnioFabr: 2012,
        Clase: "M",
        CondicionCaja: "DD",
        CondicionMaquina: "OH",
        Bloqueo: "",
        BloqueoMotivo: "",
        FechaRecepcion: "9/10/2019",
        Nave: "ATACAMA",
        NroViaje: "935E",
        Marca:"AC"
      },
      {
        Id: 10,
        Container: "BEAU-259859-5",
        Size: 20,
        Tipo: "ST",
        Tara: 2210,
        PayLoad: 28270,
        AnioFabr: 2016,
        Clase: "M",
        CondicionCaja: "DD",
        CondicionMaquina: "OH",
        Bloqueo: "",
        BloqueoMotivo: "",
        FechaRecepcion: "8/01/2020",
        Nave: "CORCOVADO",
        NroViaje: "946E",
        Marca : ""
      },
      {
        Id: 11,
        Container: "FBIU-033141-5",
        Size: 20,
        Tipo: "ST",
        Tara: 2140,
        PayLoad: 28340,
        AnioFabr: 2018,
        Clase: "C",
        CondicionCaja: "DD",
        CondicionMaquina: "OH",
        Bloqueo: "",
        BloqueoMotivo: "",
        FechaRecepcion: "7/01/2020",
        Nave: "CORCOVADO",
        NroViaje: "946E",
        Marca: ""
      }
    ]


  }*/

  

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

