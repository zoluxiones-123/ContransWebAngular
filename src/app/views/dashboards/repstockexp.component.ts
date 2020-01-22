import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ReportService } from '../../services/report.service'
import { RepStockExpRPT } from '../../models/rep_stockexpRPT'
import { RepStockExpRQT } from '../../models/rep_stockexpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';


@Component({
  selector: 'app-repstockexp',
  templateUrl: './repstockexp.component.html'
})

export class RepstockexpComponent implements OnInit  {
  constructor(private reportService: ReportService, private router: Router, private location: Location) { }
  
  public isError = false;
  public repStockExpRPT :RepStockExpRPT = null;
  public stocktotal : string;
  public stk20 : string;
  public stk40 : string;
  public stk20ST : string;
  public stk20OT : string;

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
  public seVisualiza: boolean;
  public alto : string;

  
  dsitems= [];
  dsbgcolor = ['rgba(255, 122, 51, 0.68)','rgba(51, 255, 243, 0.65)','rgba(51, 255, 88, 0.75)','rgba(51, 82, 255, 0.66)'];
  dsbdcolor = ['rgba(255, 122, 51, 1)','rgba(51, 255, 243, 1)','rgba(51, 255, 88, 1)','rgba(51, 82, 255, 1)'];

          
  private repStockExpRQT: RepStockExpRQT = {
    IDUser: 0,
    IDRol: 2

  };

  title = 'Angular 8 with Chart Js';
  LineChart = [];
  BarChart = [];
  BarChart2 = [];
  BarChartH = [];
  XLabels = [];
  YLabels = [];
  YStCT = [];
  YAband = [];
  
  
  
  ngOnInit() {


    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}


    if (localStorage.getItem("EsStarter").toString() == "1")
    {
      this.alto = "420px";
    }
    else
    { this.alto = "515px";}
    
    this.esAgenteAduanas = localStorage.getItem("RolEmpUsuaCodigoDefault") != "2";

    this.repStockExpRQT.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.repStockExpRQT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString()); 
    this.seVisualiza = false;
   
    return this.reportService
    .getStockExp(this.repStockExpRQT)
    .subscribe(
    data => {
      
      this.repStockExpRPT = data;
      this.seVisualiza = (data != null);

      if (data !=null)
      {
        this.seVisualiza = this.repStockExpRPT.CNTSTK_TOT > 0;
      }

     

      if (this.repStockExpRPT.CNTSTK_TOT != 0)
      {
       
                
        this.stocktotal = this.repStockExpRPT.CNTSTK_TOT.toString();        
        this.stk20 =  this.repStockExpRPT.CNTSTK_20.toString();
        this.stk40 = this.repStockExpRPT.CNTSTK_40.toString();

        this.stk20ST =  this.repStockExpRPT.CNTSTK_20ST.toString();
        this.stk20OT =  this.repStockExpRPT.CNTSTK_20OT.toString();

        this.stk40ST = this.repStockExpRPT.CNTSTK_40ST.toString();
        this.stk40HC = this.repStockExpRPT.CNTSTK_40HC.toString();
        this.stk40OT = this.repStockExpRPT.CNTSTK_40OT.toString();
                      
        //let listaclientes = JSON.parse(localStorage.getItem("ListaClientes"));

        let listaclientes = JSON.parse(JSON.stringify(this.repStockExpRPT.CNTSTK_EN));
      
        for (var i = 0; i <= listaclientes.length - 1; i++) {
          let first = listaclientes[i];
          this.XLabels.push(first.NombreEntidad.toString());   
          this.YLabels.push(first.CNTSTK.toString());          
        } 

        this.stkMe15 = this.repStockExpRPT.CNTSTK_ME15.toString();
        this.stk1530 = this.repStockExpRPT.CNTSTK_1530.toString();
        this.stkMa30 = this.repStockExpRPT.CNTSTK_MA30.toString();

        this.YStCT.push(this.stkMe15.toString());
        this.YStCT.push(this.stk1530.toString());
        this.YStCT.push(this.stkMa30.toString());

        this.stkAlr = this.repStockExpRPT.CNTSTK_ALR.toString();
        this.stkAla = this.repStockExpRPT.CNTSTK_ALA.toString();
        this.stkAlv = this.repStockExpRPT.CNTSTK_ALV.toString();
        this.stkAlg = this.repStockExpRPT.CNTSTK_ALG.toString();

        this.YAband.push(this.stkAlg.toString());
        this.YAband.push(this.stkAlr.toString());
        this.YAband.push(this.stkAla.toString());
        this.YAband.push(this.stkAlv.toString());

        this.dsitems = [];

        for (var i = 0; i <= listaclientes.length - 1; i++) {
        
          let dtitem = new DataSetItem(
            this.XLabels[i].toString(), this.dsbgcolor[i].toString(), this.dsbdcolor[i].toString(), [this.YLabels[i].toString()]        
           )
                  
          this.dsitems.push(dtitem);   
        }

         this.cargarGraficosCliente();
        


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


  cargarGraficosCliente():void{

    this.BarChart = new Chart('barChartCliente', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Clientes'],       
          datasets:  this.dsitems
                 
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
          text : "Stock de Contenedores por Cliente - Exportación",
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

 /* this.BarChartH = new Chart('barChartHorizontal', {
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
        text : "Abandono Legal - Exportación",
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
}),*/

  this.BarChart2 = new Chart('barChartEstadia', {
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
        text : "Tiempo de Estadia por Contenedor - Exportación",
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
