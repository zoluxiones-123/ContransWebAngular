import { Chart } from 'chart.js'
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service'
import { RepStockImpRPT } from '../../models/rep_stockimpRPT'
import { RepStockImpRQT } from '../../models/rep_stockimpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';


@Component({
  selector: 'app-repabandono',
  templateUrl: './repabandono.component.html',
  styleUrls: ['./repabandono.component.css']
})


export class RepabandonoComponent implements OnInit {

  constructor(private reportService: ReportService, private router: Router, private location: Location) { 
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



  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 0,
    IDRol: 2,
    UniNeg : ''

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
        
       

       

         this.cargarGraficoAbandono();

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

  cargarGraficoAbandono():void{

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
  });
  
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


  }
