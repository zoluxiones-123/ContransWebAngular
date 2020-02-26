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
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DetrepstockCliComponent} from './detrepstockcli.component';
import { ChartsModule } from 'ng2-charts';
import { DetRepStockCliRQT } from "../../models/det_repstockcli";
import { DetRepStockCliRPT } from "../../models/det_repstockcli";

@Component({
  selector: 'app-repstockcli',
  templateUrl: './repstockcli.component.html'
})


export class RepstockcliComponent implements OnInit {

  constructor(private dialog : MatDialog, private reportService: ReportService, private elementRef: ElementRef, private router: Router, private location: Location) { 
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
  Entidad = [];
  NombreEntidad=[];
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
  BarChart: Chart;
  //BarChart : Chart;
  BarChart2 = [];
  BarChartH = [];
  XLabels = [];
  YLabels = [];
  YStCT = [];
  YAband = [];
  
  public objDetStockCliRPT: Array<DetRepStockCliRPT>;
  public objDetStockCliRQT : DetRepStockCliRQT = {
    IDUSer: 1,
    IDRol: 0,
    IdCliente: ""
  };

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
          this.Entidad.push(first.IdEntidad.toString());        
          this.NombreEntidad.push(first.NombreEntidad.toString())
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



  
  DetalleRepStock(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
    top: '100px',
    left: '150px'
    };
    dialogConfig.width = "70%";
    dialogConfig.height = "70%";
    //dialogConfig.width = "1200px";
    localStorage.setItem("TipoGrafico","repstockcli");
    this.dialog.open(DetrepstockCliComponent, dialogConfig);   
    
        
  }
  cargarGraficosCliente():void{

    
    //let htmlRef = this.elementRef.nativeElement.querySelector(`#barChartStockCli`);
    
    //this.BarChart = new Chart('barChart', {
    //this.BarChart = new Chart(htmlRef, {
    this.BarChart = new Chart('barChartStockCli', {
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
        position: 'bottom',
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
  });

  
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  VerDetalle(evt:any){
    //var data = this.BarChart.getElementsAtEvent(evt);
    var data = this.BarChart.getElementAtEvent(evt);   
    
    if (data.length > 0)  
     {console.log(data[0]._model);
    
     let valor = this.BarChart.data.datasets[data[0]._datasetIndex].data[data[0]._index];

     let CodEntidad = this.Entidad[data[0]._datasetIndex].toString();
     let NomEntidad = this.NombreEntidad[data[0]._datasetIndex].toString();

     //this.Cliente =  this.XLabels[data[0]._datasetIndex].toString();

     let tipo = this.BarChart.data.labels[data[0]._index];

     localStorage.setItem("EsTotalG","0");
     localStorage.setItem("CodEntidad", CodEntidad);
     localStorage.setItem("NombreEntidad", NomEntidad);
     
    
     //this.EsClickBarra = true;

    this.objDetStockCliRQT.IDUSer = Number.parseInt(localStorage.getItem("Usuario"));
    this.objDetStockCliRQT.IDRol = Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"));
    this.objDetStockCliRQT.IdCliente = CodEntidad;

    
   // this.altoRep = 1000;

   this.DetalleRepStock();
            
        }
    
    }


  }


