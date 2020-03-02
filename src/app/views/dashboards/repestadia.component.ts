import { Chart } from 'chart.js'
import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportService } from '../../services/report.service'
import { RepStockImpRPT } from '../../models/rep_stockimpRPT'
import { RepStockImpRQT } from '../../models/rep_stockimpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';

import { MatDialog, MatDialogConfig} from '@angular/material';
import { DetrepstockComponent  } from 'app/views/dashboards/detrepstock.component';
import { DetrepstockestComponent  } from 'app/views/dashboards/detrepstockest.component';

@Component({
  selector: 'app-repestadia',
  templateUrl: './repestadia.component.html',
  styleUrls: ['./repestadia.component.css']
})

export class RepestadiaComponent implements OnInit {

  constructor(private reportService: ReportService, private dialogEst: MatDialog, private router: Router, private location: Location,   
    private elementRef : ElementRef) { 
  }

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
  public stkAlg : string;
  public esAgenteAduanas : boolean;
  public seVisualiza: boolean;
  public alto : string;

  dsitems= [];
  dsitemsDS= [];
  dsitemsDT= [];
  dsbgcolor = ['rgba(255, 122, 51, 0.68)','rgba(51, 255, 243, 0.65)','rgba(51, 255, 88, 0.75)','rgba(51, 82, 255, 0.66)'];
  dsbdcolor = ['rgba(255, 122, 51, 1)','rgba(51, 255, 243, 1)','rgba(51, 255, 88, 1)','rgba(51, 82, 255, 1)'];



  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 0,
    IDRol: 2,
    UniNeg : ''

  };

  title = 'Angular 8 with Chart Js';
  LineChart = [];
  BarChart = [];
  BarChart2 : Chart;
  BarChartH = [];
  XLabels = [];
  YLabels = [];
  YStCT = [];
  YAband = [];
  

  ngOnInit() {

    
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
          this.XLabels.push(first.NombreEntidad.toString());   
          this.YLabels.push(first.CNTSTK.toString());          
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
        
       

       

         this.cargarGraficoEstadia();

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

  VerDetalleEst(evt:any){
    //var data = this.BarChart.getElementsAtEvent(evt);
    var data = this.BarChart2.getElementAtEvent(evt);   
    
    if (data.length > 0)  
     {
       console.log(data[0]._model);
    
     let valor = this.BarChart2.data.datasets[data[0]._datasetIndex].data[data[0]._index];

     let IndexEst = Number.parseInt(data[0]._index) + 1
     
     localStorage.setItem("IndexEst", IndexEst.toString());
    
    // this.EsClickBarra = true;
  //  this.objDetStockCliRQT.IdCliente = CodEntidad;
    localStorage.setItem("TituloReporte", "Tiempo de Estadia - Importación");    

    this.DetalleRepStockEst();

    
     }
  
    }
    


DetalleRepStockEst(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 /*  dialogConfig.position = {
  top: '100px',
  left: '250px'
  }; */
  //dialogConfig.width = "40%";
  dialogConfig.height = "100%";
  dialogConfig.width = "1200px";

  this.dialogEst.open(DetrepstockestComponent, dialogConfig);   

}


  cargarGraficoEstadia():void{


    if (this.BarChart2 != null)
    { this.BarChart2.destroy();}

    let htmlRefEstadia = this.elementRef.nativeElement.querySelector(`#barChartEstadia`);

   // this.BarChart2 = new Chart('barChartEstadia', {
    this.BarChart2 = new Chart(htmlRefEstadia, {
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

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


  }

