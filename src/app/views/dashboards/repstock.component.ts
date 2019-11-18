
import { Chart } from 'chart.js'
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service'
import { RepStockImpRPT } from '../../models/rep_stockimpRPT'
import { RepStockImpRQT } from '../../models/rep_stockimpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-repstock',
  templateUrl: './repstock.component.html'

})
export class RepstockComponent implements OnInit  {
  constructor(private reportService: ReportService, private router: Router, private location: Location) { }
  
  public isError = false;
  public repStockImpRPT :RepStockImpRPT = null;
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
  public esAgenteAduanas : boolean;
          
  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 'jalvarado',
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

    this.reportService.getStockImp(this.repStockImpRQT);   
    
    this.esAgenteAduanas = localStorage.getItem("RolEmpUsuaCodigoDefault") != "2";

    this.repStockImpRQT.IDUser = localStorage.getItem("Usuario").toString();   
    this.repStockImpRQT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString()); 
   
    return this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .getStockImp(this.repStockImpRQT)
    .subscribe(
    data => {
      
      this.repStockImpRPT = data;

      if (this.repStockImpRPT.CNTSTK_TOT != 0)
      {
        localStorage.setItem("StockTotal", this.repStockImpRPT.CNTSTK_TOT.toString());
        localStorage.setItem("Stock20", this.repStockImpRPT.CNTSTK_20.toString());
        localStorage.setItem("Stock40", this.repStockImpRPT.CNTSTK_40.toString());
        localStorage.setItem("Stock20ST", this.repStockImpRPT.CNTSTK_20ST.toString());
        localStorage.setItem("Stock20OT", this.repStockImpRPT.CNTSTK_20OT.toString());

        localStorage.setItem("Stock40ST", this.repStockImpRPT.CNTSTK_40ST.toString());
        localStorage.setItem("Stock40HC", this.repStockImpRPT.CNTSTK_40HC.toString());
        localStorage.setItem("Stock40OT", this.repStockImpRPT.CNTSTK_40OT.toString());

        localStorage.setItem("StockAlr", this.repStockImpRPT.CNTSTK_ALR.toString());
        localStorage.setItem("StockAla", this.repStockImpRPT.CNTSTK_ALA.toString());
        localStorage.setItem("StockAlv", this.repStockImpRPT.CNTSTK_ALV.toString());

       
        

                
        localStorage.setItem("ListaClientes",JSON.stringify(this.repStockImpRPT.CNTSTK_EN));
        this.stocktotal = localStorage.getItem("StockTotal");
        this.stk20 =  localStorage.getItem("Stock20");
        this.stk40 = localStorage.getItem("Stock40");

        this.stk20ST = localStorage.getItem("Stock20ST");
        this.stk20OT = localStorage.getItem("Stock20OT");

        this.stk40ST = localStorage.getItem("Stock40ST");
        this.stk40HC = localStorage.getItem("Stock40HC");
        this.stk40OT = localStorage.getItem("Stock40OT");
        
        let listaclientes = JSON.parse(localStorage.getItem("ListaClientes"));

        listaclientes.forEach(item => {          
          this.XLabels.push(item.NombreEntidad.toString());   
          this.YLabels.push(item.CNTSTK.toString());             
        });

        localStorage.setItem("StockME15", this.repStockImpRPT.CNTSTK_ME15.toString());
        localStorage.setItem("Stock1530", this.repStockImpRPT.CNTSTK_1530.toString());
        localStorage.setItem("StockMA30", this.repStockImpRPT.CNTSTK_MA30.toString());

        this.stkMe15 = localStorage.getItem("StockME15");
        this.stk1530 = localStorage.getItem("Stock1530");
        this.stkMa30 = localStorage.getItem("StockMA30");

        this.YStCT.push(this.stkMe15.toString());
        this.YStCT.push(this.stk1530.toString());
        this.YStCT.push(this.stkMa30.toString());

        this.stkAlr = localStorage.getItem("StockAlr"); 
        this.stkAla = localStorage.getItem("StockAla");
        this.stkAlv = localStorage.getItem("StockAlv");

        this.YAband.push(this.stkAlr.toString());
        this.YAband.push(this.stkAla.toString());
        this.YAband.push(this.stkAlv.toString());
        
        //console.log(this.XLabels);
        //this.router.navigate(['report']);
        //this.router.navigate(['repstock']);
        this.cargarGraficos();
        
      }
      else{
        localStorage.removeItem('StockTotal');       
        this.onIsError();   
      }

      
      

    },  
    error => {
      this.onIsError();           
      console.log("Error");}
    );

  }

  cargarGraficos():void{

    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
          labels: this.XLabels,
          datasets: [{
              label: 'Número de Contenedores',
              data: this.YLabels,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 206, 16, 0.2)'
                  
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)'                  
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          text : "Stock de Contenedores x Cliente",
          display : true
        },
          scales: {
            xAxes:[{
              scaleLabel: {
                display: true,
                labelString: 'Clientes'
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
  }),

  this.BarChartH = new Chart('barChartH', {
    type: 'horizontalBar',
    data: {
        labels: ['1-5 dias', '6-11 dias', '> 11 dias' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YAband,
            backgroundColor: [
                'rgba(229, 10, 9, 0.68)',
                'rgba(255, 251, 29, 0.75)',
                'rgba(54, 179, 63, 0.65)'
                
            ],
            borderColor: [
                'rgba(229, 10, 9, 1)',
                'rgba(255, 251, 29, 1)',
                'rgba(54, 179, 63, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        text : "Abandono Legal x Cliente/Agencia Aduanas/Agente Cargo",
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
    type: 'bar',
    data: {
        labels: ['< 15', '15-30', '> 30' ],
        datasets: [{
            label: 'Número de Contenedores',
            data: this.YStCT,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        text : "Stock de Contenedores x Capacidad y Tipo",
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