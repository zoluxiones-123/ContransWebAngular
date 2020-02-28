
import { Chart } from 'chart.js'
import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ReportService } from '../../services/report.service'
import { RepStockImpRPT } from '../../models/rep_stockimpRPT'
import { RepStockImpRQT } from '../../models/rep_stockimpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';

import { DetRepStockCliRPT } from '../../models/det_repstockcli'
import { DetRepStockCliRQT } from '../../models/det_repstockcli'

import { DataTableDirective } from 'angular-datatables';
import { Subject, fromEventPattern } from 'rxjs';

import { MatDialog, MatDialogConfig} from '@angular/material';
import { DetrepstockComponent  } from 'app/views/dashboards/detrepstock.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-repstock',
  templateUrl: './repstock.component.html'

})

export class RepstockComponent implements OnInit  {
  constructor(private reportService: ReportService,  private elementRef: ElementRef, 
    private dialog : MatDialog,
    private router: Router, private location: Location) { }

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
    
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;


  public isError = false;
  public repStockImpRPT :RepStockImpRPT = null;
  public stocktotal : string;
  public stk20 : string;
  public stk40 : string;
  public stk20ST : string;
  public stk20OT : string;
  public altoRep : number = 700;

  public stk40ST: string;
  public stk40HC : string;
  public stk40OT : string;

  public stkMe15: string;
  public stk1530: string;
  public stkMa30: string;

  public stkAlr : string;
  public stkAla : string;
  public stkAlv : string;
  public stkAlg : string;
  public esAgenteAduanas : boolean;
  public EsClickBarra : boolean;
  public seVisualiza: boolean;
  public Cliente :  string;
  

  public SiCargoData = true;

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

  dtOptions2 : any = {
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
          
  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 0,
    IDRol: 2,
    UniNeg : ''

  };

  title = 'Angular 8 with Chart Js';
  LineChart = [];
  
  chartcl : Chart;
  BarChart : Chart;
  //BarChart = [];
  BarChart2 = [];
  //BarChartH = [];
  BarChartH : Chart;

  XLabels = [];
  YLabels = [];
  Entidad = [];
  YStCT = [];
  YAband = [];
  BGColor = [];
  BDColor = [];
  BGColorF = [];
  BDColorF = [];
  dsitems = []
  
  
  dtTrigger:Subject<any> = new Subject();  
  dtTrigger2:Subject<any> = new Subject();

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    this.dtTrigger2.next();
    console.log(this.dtElement);
  }

  
  public ngOnDestroy():any {
    this.SetGrillaVisibility(false);
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
    
  }
  
  ngOnInit() {


    //his.createChart();
    //this.reportService.getStockImp(this.repStockImpRQT);  
      
    this.BGColor = ['rgba(255, 122, 51, 0.68)','rgba(51, 255, 243, 0.65)',  'rgba(51, 255, 88, 0.75)', 'rgba(51, 82, 255, 0.66)'];
    this.BDColor = ['rgba(255, 122, 51, 1)','rgba(51, 255, 243, 1)',  'rgba(51, 255, 88, 1)', 'rgba(51, 82, 255, 1)'];
    

    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}

    this.EsClickBarra = false;

    
    this.esAgenteAduanas = localStorage.getItem("RolEmpUsuaCodigoDefault") != "2";

    this.repStockImpRQT.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.repStockImpRQT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString()); 
    this.seVisualiza = false;
   
    return this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .getStockImp(this.repStockImpRQT)
    .subscribe(
    data => {
      
      this.repStockImpRPT = data;
      this.seVisualiza = (data != null);

      if (data !=null)
      {
        this.seVisualiza = this.repStockImpRPT.CNTSTK_TOT > 0;
      }

      if (this.seVisualiza == false)
      {
          //this.router.navigate(['home']);
      }


      if (this.repStockImpRPT.CNTSTK_TOT != 0)
      {
       
        this.stocktotal = this.repStockImpRPT.CNTSTK_TOT.toString();        
        this.stk20 =  this.repStockImpRPT.CNTSTK_20.toString();
        this.stk40 = this.repStockImpRPT.CNTSTK_40.toString();

        this.stk20ST =  this.repStockImpRPT.CNTSTK_20ST.toString();
        this.stk20OT =  this.repStockImpRPT.CNTSTK_20OT.toString();

        this.stk40ST = this.repStockImpRPT.CNTSTK_40ST.toString();
        this.stk40HC = this.repStockImpRPT.CNTSTK_40HC.toString();
        this.stk40OT = this.repStockImpRPT.CNTSTK_40OT.toString();
                      

        let listaclientes = JSON.parse(JSON.stringify(this.repStockImpRPT.CNTSTK_EN));
      
        for (var i = 0; i <= listaclientes.length - 1; i++) {
          let first = listaclientes[i];
          let bdc = this.BDColor[i];
          let bgc = this.BGColor[i];
          
          this.XLabels.push(first.NombreEntidad.toString());   
          this.YLabels.push(first.CNTSTK.toString()); 
          this.Entidad.push(first.IdEntidad.toString()); 
           
          
         // this.BDColorF.push(bdc);
         // this.BGColorF.push(bgc);

          let dtitem = new DataSetItem(
            first.NombreEntidad.toString(), bgc  , bdc, [first.CNTSTK.toString()]        
           )

          this.dsitems.push(dtitem);                     

        } 


        this.stkMe15 = this.repStockImpRPT.CNTSTK_ME15.toString();
        this.stk1530 = this.repStockImpRPT.CNTSTK_1530.toString();
        this.stkMa30 = this.repStockImpRPT.CNTSTK_MA30.toString();

        this.YStCT.push(this.stkMe15.toString());
        this.YStCT.push(this.stk1530.toString());
        this.YStCT.push(this.stkMa30.toString());

        this.stkAlr = this.repStockImpRPT.CNTSTK_ALR.toString();
        this.stkAla = this.repStockImpRPT.CNTSTK_ALA.toString();
        this.stkAlv = this.repStockImpRPT.CNTSTK_ALV.toString();
        this.stkAlg = this.repStockImpRPT.CNTSTK_ALG.toString();

        this.YAband.push(this.stkAlg.toString());
        this.YAband.push(this.stkAlr.toString());
        this.YAband.push(this.stkAla.toString());
        this.YAband.push(this.stkAlv.toString());
       
        this.cargarGraficosClienteFinal();

        this.SetGrillaVisibility(false);

        /*if (listaclientes.length == 1)
        {this.cargarGraficosCliente();}
        
        if (listaclientes.length == 4)
        {this.cargarGraficos();}        

        if (listaclientes.length == 2)
        {this.cargarGraficos2();}        
        
        if (listaclientes.length == 3)
        {this.cargarGraficos3();}        */

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
  
   //this.router.navigate(['home']);    

  }

  ClickDerecho()
  {
    
    document.oncontextmenu = function(){return false};
    this.DetalleRepStock();
    //document.oncontextmenu = function(){return false};
    //swal("No existen datos");
 
  }

  VerDetalleGeneral()
  {
  
      this.objDetStockCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
      this.objDetStockCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));      
      localStorage.setItem("CodEntidad", "");
      localStorage.setItem("TituloReporte", "Stock de Contenedores por Cliente");
  
      this.DetalleRepStock();

  }

  VerDetalle(evt:any){
    //var data = this.BarChart.getElementsAtEvent(evt);
    var data = this.BarChart.getElementAtEvent(evt);   
    
    if (data.length > 0)  
     {
       console.log(data[0]._model);
    
     let valor = this.BarChart.data.datasets[data[0]._datasetIndex].data[data[0]._index];

     let CodEntidad = this.Entidad[data[0]._datasetIndex].toString();

     this.Cliente =  this.XLabels[data[0]._datasetIndex].toString();

     let tipo = this.BarChart.data.labels[data[0]._index];

     localStorage.setItem("EsTotalG","0");
     
     localStorage.setItem("CodEntidad", CodEntidad);
    
    // this.EsClickBarra = true;

    this.objDetStockCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
    this.objDetStockCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.objDetStockCliRQT.IdCliente = CodEntidad;
    localStorage.setItem("TituloReporte", "Stock de Contenedores por Cliente");
    

    this.DetalleRepStock();

    
     }
  
    }

  public SetGrillaVisibility(param:boolean)
  {
    if (param) {
     // document.getElementById('grilla').style.visibility = "visible";
    }
    else {
    // document.getElementById('grilla').style.visibility = "hidden";
    }
  }

  DetalleRepStock(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
/*     dialogConfig.position = {
    top: '100px',
    left: '250px'
    }; */
    //dialogConfig.width = "40%";
    dialogConfig.height = "100%";
    dialogConfig.width = "1200px";


    this.dialog.open(DetrepstockComponent, dialogConfig);   

        
  }

  

    showData(evt:any){
      //var data = this.BarChart.getElementsAtEvent(evt);
      var data = this.BarChart.getElementAtEvent(evt);   
      
      if (data.length > 0)  
       {console.log(data[0]._model);}

    }

  cargarGraficos():void{

    
    if (this.BarChart != null)
    { this.BarChart.destroy();}

    // this.LineChart = new Chart(ctx,{   
      
    var ctx = this.elementRef.nativeElement.querySelector(`#barChart`);

    //this.BarChart = new Chart('barChart', {
    this.BarChart = new Chart(ctx, {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets: [{
            label: this.XLabels[0].toString(),
            backgroundColor: 'rgba(255, 122, 51, 0.68)',
            borderColor : 'rgba(255, 122, 51, 1)',
            data: [this.YLabels[0].toString()]
            },  
            { label: this.XLabels[1].toString(),
              backgroundColor: 'rgba(51, 255, 243, 0.65)',
              borderColor : 'rgba(51, 255, 243, 1)',
              data: [this.YLabels[1].toString()]
            },
            { label: this.XLabels[2].toString(),
              backgroundColor: 'rgba(51, 255, 88, 0.75)',
              borderColor : 'rgba(51, 255, 88, 1)',
              data: [this.YLabels[2].toString()]
            },
            { label: this.XLabels[3].toString(),
              backgroundColor: 'rgba(51, 82, 255, 0.66)',
              borderColor : 'rgba(51, 82, 255, 1)',
              data: [this.YLabels[3].toString()]
            },
        
        ]   
          //datasets: [{
           //   label: 'Número de Contenedores',
           //   data: this.YLabels,
            //  backgroundColor: [                 
              //    'rgba(255, 122, 51, 0.68)',
              //    'rgba(51, 255, 243, 0.65)',
              //    'rgba(51, 255, 88, 0.75)',
              //    'rgba(51, 82, 255, 0.66)'
                  
              //],
              //borderColor: [
              //  'rgba(255, 122, 51, 1)',
              //  'rgba(51, 255, 243, 1)',
              //  'rgba(51, 255, 88, 1)',
              //  'rgba(51, 82, 255, 1)'             
              //],
              //borderWidth: 1
          //}]
      },
    options: {       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Stock de Contenedores por Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
              },      
              barPercentage: 0.2,
              gridLines: {
              display:false
              },
              ticks: {
                display: false
            }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        
      }
  }),

 /* ctx.addEventListener('click', function (evt) {
    var activePoints = this.BarChart.getElementsAtEvent(evt);
    var activeDataSet = this.BarChart.getDatasetAtEvent(evt);
    alert("activePoints:" + activePoints.length);
    if (activePoints.length > 0)
    {
        var clickedDatasetIndex = activeDataSet[0]._datasetIndex;
        var clickedElementIndex = activePoints[0]._index;
        var value = this.BarChart.data.datasets[clickedDatasetIndex].data[clickedElementIndex];
    }
}, false);*/

  this.BarChartH = new Chart('barChartH', {
    responsive : true,
    type: 'horizontalBar',
    data: {
        labels: ['Abandono Legal','1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {      
        legend: {
            display: false,
        },
      title: {
        text : "Abandono Legal",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Contenedores'
            },              
            gridLines: {
            display:false
            },
            ticks: {
              beginAtZero: true
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días Restantes'
              },     
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}),


  this.BarChart2 = new Chart('barChart2', {
    responsive : true,
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 255, 243, 0.65)',
              'rgba(255, 122, 51, 0.68)',
                                           
            ],
            borderColor: [
              'rgba(51, 255, 88, 1)',
              'rgba(51, 255, 243, 1)',
              'rgba(255, 122, 51, 1)',
                             
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position : 'right',
        display: false,
      },
      title: {
        text : "Tiempo de Estadia por Contenedor",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Días'
            }, 
            barPercentage: 0.2,
            gridLines: {
            display:false
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              }, 

                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  }

  
  cargarGraficos3():void{

    this.BarChart = new Chart('barChart', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets: [{
            label: this.XLabels[0].toString(),
            backgroundColor: 'rgba(255, 122, 51, 0.68)',
            borderColor : 'rgba(255, 122, 51, 1)',
            data: [this.YLabels[0].toString()]
            },  
            { label: this.XLabels[1].toString(),
              backgroundColor: 'rgba(51, 255, 243, 0.65)',
              borderColor : 'rgba(51, 255, 243, 1)',
              data: [this.YLabels[1].toString()]
            },
            { label: this.XLabels[2].toString(),
              backgroundColor: 'rgba(51, 255, 88, 0.75)',
              borderColor : 'rgba(51, 255, 88, 1)',
              data: [this.YLabels[2].toString()]
            }                    
        ]   
          //datasets: [{
           //   label: 'Número de Contenedores',
           //   data: this.YLabels,
            //  backgroundColor: [                 
              //    'rgba(255, 122, 51, 0.68)',
              //    'rgba(51, 255, 243, 0.65)',
              //    'rgba(51, 255, 88, 0.75)',
              //    'rgba(51, 82, 255, 0.66)'
                  
              //],
              //borderColor: [
              //  'rgba(255, 122, 51, 1)',
              //  'rgba(51, 255, 243, 1)',
              //  'rgba(51, 255, 88, 1)',
              //  'rgba(51, 82, 255, 1)'             
              //],
              //borderWidth: 1
          //}]
      },
    options: {       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Stock de Contenedores por Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
              },      
              barPercentage: 0.2,
              gridLines: {
              display:false
              },
              ticks: {
                display: false
            }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }),

  this.BarChartH = new Chart('barChartH', {
    responsive : true,
    type: 'horizontalBar',    
    data: {
        labels: ['Abandono Legal','1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {      
        legend: {
            display: false,
        },
      title: {
        text : "Abandono Legal",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Contenedores'
            },              
            gridLines: {
            display:false
            },
            ticks: {
              beginAtZero: true
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días Restantes'
              },     
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}),


  this.BarChart2 = new Chart('barChart2', {
    responsive : true,
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 255, 243, 0.65)',
              'rgba(255, 122, 51, 0.68)',
                                           
            ],
            borderColor: [
              'rgba(51, 255, 88, 1)',
              'rgba(51, 255, 243, 1)',
              'rgba(255, 122, 51, 1)',
                             
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position : 'right',
        display: false,
      },
      title: {
        text : "Tiempo de Estadia por Contenedor",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Días'
            }, 
            barPercentage: 0.2,
            gridLines: {
            display:false
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              }, 

                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  }


  cargarGraficos2():void{

    this.BarChart = new Chart('barChart', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets: [{
            label: this.XLabels[0].toString(),
            backgroundColor: 'rgba(255, 122, 51, 0.68)',
            borderColor : 'rgba(255, 122, 51, 1)',
            data: [this.YLabels[0].toString()]
            },  
            { label: this.XLabels[1].toString(),
              backgroundColor: 'rgba(51, 255, 243, 0.65)',
              borderColor : 'rgba(51, 255, 243, 1)',
              data: [this.YLabels[1].toString()]
            }                            
        ]   
          //datasets: [{
           //   label: 'Número de Contenedores',
           //   data: this.YLabels,
            //  backgroundColor: [                 
              //    'rgba(255, 122, 51, 0.68)',
              //    'rgba(51, 255, 243, 0.65)',
              //    'rgba(51, 255, 88, 0.75)',
              //    'rgba(51, 82, 255, 0.66)'
                  
              //],
              //borderColor: [
              //  'rgba(255, 122, 51, 1)',
              //  'rgba(51, 255, 243, 1)',
              //  'rgba(51, 255, 88, 1)',
              //  'rgba(51, 82, 255, 1)'             
              //],
              //borderWidth: 1
          //}]
      },
    options: {       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Stock de Contenedores por Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
              },      
              barPercentage: 0.2,
              gridLines: {
              display:false
              },
              ticks: {
                display: false
            }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }),

  this.BarChartH = new Chart('barChartH', {
    responsive : true,
    type: 'horizontalBar',
    data: {
        labels: ['Abandono Legal','1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {      
        legend: {
            display: false,
        },
      title: {
        text : "Abandono Legal",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Contenedores'
            },              
            gridLines: {
            display:false
            },
            ticks: {
              beginAtZero: true
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días Restantes'
              },     
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}),


  this.BarChart2 = new Chart('barChart2', {
    responsive : true,
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 255, 243, 0.65)',
              'rgba(255, 122, 51, 0.68)',
                                           
            ],
            borderColor: [
              'rgba(51, 255, 88, 1)',
              'rgba(51, 255, 243, 1)',
              'rgba(255, 122, 51, 1)',
                             
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position : 'right',
        display: false,
      },
      title: {
        text : "Tiempo de Estadia por Contenedor",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Días'
            }, 
            barPercentage: 0.2,
            gridLines: {
            display:false
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              }, 

                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  }


  cargarGraficosCliente():void{

    this.BarChart = new Chart('barChart', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets: [{
            label: this.XLabels[0].toString(),
            backgroundColor: 'rgba(255, 122, 51, 0.68)',
            borderColor : 'rgba(255, 122, 51, 1)',
            data: [this.YLabels[0].toString()]
            }                                       
        ]   
          //datasets: [{
           //   label: 'Número de Contenedores',
           //   data: this.YLabels,
            //  backgroundColor: [                 
              //    'rgba(255, 122, 51, 0.68)',
              //    'rgba(51, 255, 243, 0.65)',
              //    'rgba(51, 255, 88, 0.75)',
              //    'rgba(51, 82, 255, 0.66)'
                  
              //],
              //borderColor: [
              //  'rgba(255, 122, 51, 1)',
              //  'rgba(51, 255, 243, 1)',
              //  'rgba(51, 255, 88, 1)',
              //  'rgba(51, 82, 255, 1)'             
              //],
              //borderWidth: 1
          //}]
      },
    options: {       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Stock de Contenedores por Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
              },      
              barPercentage: 0.2,
              gridLines: {
              display:false
              },
              ticks: {
                display: false
            }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }),

  this.BarChartH = new Chart('barChartH', {
    responsive : true,
    type: 'horizontalBar',
    data: {
        labels: ['Abandono Legal','1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {      
        legend: {
            display: false,
        },
      title: {
        text : "Abandono Legal",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Contenedores'
            },              
            gridLines: {
            display:false
            },
            ticks: {
              beginAtZero: true
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días Restantes'
              },     
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}),


  this.BarChart2 = new Chart('barChart2', {
    responsive : true,
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 255, 243, 0.65)',            
              'rgba(255, 122, 51, 0.68)'
             
                
            ],
            borderColor: [
              'rgba(51, 255, 88, 1)',
              'rgba(51, 255, 243, 1)',             
              'rgba(255, 122, 51, 1)'
              
                
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position : 'right',
        display: false,
      },
      title: {
        text : "Tiempo de Estadia por Contenedor",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Días'
            }, 
            barPercentage: 0.2,
            gridLines: {
            display:false
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              }, 

                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  }

  cargarGraficosClienteFinal():void{

    this.BarChart = new Chart('barChart', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets: this.dsitems       
                 
      },
    options: {       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Stock de Contenedores por Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
              },      
              barPercentage: 0.2,
              gridLines: {
              display:false
              },
              ticks: {
                display: false
            }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }),

  this.BarChartH = new Chart('barChartH', {
    responsive : true,
    type: 'horizontalBar',
    data: {
        labels: ['Abandono Legal','1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(2, 4, 12, 0.68)',
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {      
        legend: {
            display: false,
        },
      title: {
        text : "Abandono Legal",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Contenedores'
            },              
            gridLines: {
            display:false
            },
            ticks: {
              beginAtZero: true
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días Restantes'
              },     
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}),


  this.BarChart2 = new Chart('barChart2', {
    responsive : true,
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 255, 243, 0.65)',            
              'rgba(255, 122, 51, 0.68)'
             
                
            ],
            borderColor: [
              'rgba(51, 255, 88, 1)',
              'rgba(51, 255, 243, 1)',             
              'rgba(255, 122, 51, 1)'
              
                
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position : 'right',
        display: false,
      },
      title: {
        text : "Tiempo de Estadia por Contenedor",
        display : true
      },
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Número de Días'
            }, 
            barPercentage: 0.2,
            gridLines: {
            display:false
            }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              }, 

                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  }


  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}