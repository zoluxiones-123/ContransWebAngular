import { Chart } from 'chart.js'
import { Component, OnInit, ElementRef  } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { RepOcupabilidad } from '../../models/rep_ocupabilidad';
import { RepStockImpRQT } from '../../models/rep_stockimpRQT';
import { RepFillRate } from '../../models/rep_fillrate';
import { RepEriRQT } from '../../models/rep_eriRQT';
import { RepEriRPT } from '../../models/rep_eriRPT';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { SuscripComponent } from '../appviews/suscrip.component';

@Component({
  selector: 'app-repfillrate',
  templateUrl: './repfillrate.component.html'
 
})
export class RepfillrateComponent implements OnInit {
  constructor(private reportService: ReportService, private elementRef: ElementRef, private dialog : MatDialog, private router: Router, private location: Location) { }
  
  public isError = false;
  public repOcupabilidad :RepOcupabilidad = null;
  public repFillRate :RepFillRate = null;
  public repEri :RepEriRPT = null;
  
  public fecha : string;
  public valor: string;
  public cantPos: string;
  public mes: string;
  public anio: string;

  public mesf: string;
  public aniof: string;

  public fechaf : string;
  public valorf: string;
  public unidSol: string;
  public pedSol: string;
  
  public fechae : string;
  public diae: string;
  public valore: string;
  public sindif: number;
  public sob: number;
  public sindifg: number;
  public sobg: number;
  public totfech: number;
  public totg: number;
  public uninego: string;
  public uninegof: string;
  public uninegoo: string;
  public falt: number;
  public faltg: number;
  
  public mese: string;
  public anioe: string;
  public finocup : boolean;
  public fineri : boolean;
  public finfill : boolean;
  public seVisualizaFillRate: boolean;

           
  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 0,
    IDRol: 0,
    UniNeg : ""

  };

  private repEriRQT: RepEriRQT = {
    IDUser: 0,
    IDRol: 0,
    UniNeg : ""
  };
  
  LineChart : Chart;
  BarChart = [];
  EjeX = [];
  EjeOcup = [];
  YLabelsF = [];
  YStCT = [];
  YAband = [];
  XLabelsE = [];
  YLabelsE = [];
  

  ngOnInit() {

    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}

    //this.reportService.getStockImp(this.repStockImpRQT);         
    this.repStockImpRQT.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.repStockImpRQT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.repStockImpRQT.UniNeg = "UN0006";

    this.repEriRQT.IDUser = this.repStockImpRQT.IDUser;
    this.repEriRQT.IDRol = this.repStockImpRQT.IDRol;
    this.repEriRQT.UniNeg = "UN0006";

    localStorage.removeItem('ListaEri'); 
    localStorage.removeItem('ListaFillRate');
    localStorage.removeItem('ListaOcup');   
    
    this.finocup = false;
    this.fineri = false;
    this.finfill = false;

    this.generaRepEri();
    this.generaRepFillRate();
    this.generaRepOcu();


    }

    onCreate(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      this.dialog.open(SuscripComponent, dialogConfig);      
    }
    
    generaRepEri():void{

    //Reporte Eri...............//
    this.reportService
    //.loginuser(this.user.Usuario, this.user.Password)
    .getEri(this.repEriRQT)
    .subscribe(
    data => {
      
      this.repEri = data;

      if (this.repEri.Data != null)
      {
                        
        //localStorage.setItem("ListaEri",JSON.stringify(this.repEri.Data));
      
        let fechaer  = this.repEri.Fecha.toString();
        this.fechae = fechaer;
        this.fechae = this.repEri.Fecha.toString();
        this.valore = this.repEri.Valor.toString();
        this.sindif =  this.repEri.SinDiferencia;
        this.sob = this.repEri.Sobrante;
        this.sindifg = this.repEri.SinDiferenciaG;
        this.sobg = this.repEri.SobranteG;
        this.totfech = this.repEri.TotalFecha;
        this.totg = this.repEri.TotalGe;
        this.uninego = this.repEri.UnidNegoDescripcion.toString();

        this.falt = this.repEri.Faltantes; 
        this.faltg = this.repEri.FaltantesG; 

        this.seVisualizaFillRate = (this.falt != -1);
                
        let index = this.fechae.indexOf( "-" ); 
        let month = Number(this.fechae.substring(0,index));
        this.anioe = this.fechae.substring(index + 1,this.fechae.length);
        let anioer = this.fechae.substring(index + 1,this.fechae.length);
        this.diae = Number(this.repEri.FechaUpdate.toString().substring(0,2)).toString();

      switch (month) {
        case 1:
          this.mese = "Enero";
          break;
        case 2:
          this.mese = "Febrero";
          break;
        case 3:
          this.mese = "Marzo";
          break;
        case 4:
          this.mese = "Abril";
          break;
        case 5:
          this.mese = "Mayo";
          break;
        case 6:
          this.mese = "Junio";
          break;
        case 7:
          this.mese = "Julio";
          break;
        case 8:
          this.mese = "Agosto";
          break;
        case 9:
          this.mese = "Setiembre";
          break;
        case 10:
          this.mese = "Octubre";
          break;
        case 11:
          this.mese = "Noviembre";
          break;
        case 12:
          this.mese = "Diciembre";
          break;              
        default:
          console.log("No existe el mes!");
          break;
      }
       
        //let listaeri = JSON.parse(localStorage.getItem("ListaEri"));
        let listaeri = JSON.parse(JSON.stringify(this.repEri.Data));

        if (listaeri != null)
        {
         for (var i = 1; i <= listaeri.length; i++) {
           let last = listaeri[listaeri.length-i];
           this.XLabelsE.push(last.Fecha.toString());   
           this.YLabelsE.push(last.Valor.toString());          
           }
           
        this.fineri = true;
    
        }         
        
        if (this.finocup == true && this.fineri == true && this.finfill == true)
        { let xvar = this.EjeX;  
          let ocup = this.EjeOcup;
          let frate = this.YLabelsF;
          let eri =  this.YLabelsE;

          console.log(xvar);
          console.log(ocup); 
          console.log(frate);
          console.log(eri);
          console.log("x RepEri");

          this.cargarGraficos() };
        
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

    }
  
    generaRepFillRate():void{
  
      this.repFillRate = new RepFillRate();

      this.reportService.getFillRate(this.repStockImpRQT).
      subscribe(data=>{
        this.repFillRate = JSON.parse(JSON.stringify(data));
  
        if (this.repFillRate.Fecha != null)
        {                      
          //localStorage.setItem("ListaFillRate",JSON.stringify(this.repFillRate.Data));
    
          this.fechaf = this.repFillRate.Fecha.toString();
          this.valorf = this.repFillRate.Valor.toString();
          this.unidSol =  this.repFillRate.UnidadesSolicitadas.toString();
          this.pedSol =  this.repFillRate.PedidosSolicitados.toString();
          this.uninegof = this.repFillRate.UnidNegoDescripcion.toString();
          
          
          let index = this.fechaf.indexOf( "-" ); 
          let monthf = Number(this.fechaf.substring(0,index));
          this.aniof = this.fechaf.substring(index + 1,this.fechaf.length);
    
        switch (monthf) {
          case 1:
            this.mesf = "Enero";
            break;
          case 2:
            this.mesf = "Febrero";
            break;
          case 3:
            this.mesf = "Marzo";
            break;
          case 4:
            this.mesf = "Abril";
            break;
          case 5:
            this.mesf = "Mayo";
            break;
          case 6:
            this.mesf = "Junio";
            break;
          case 7:
            this.mesf = "Julio";
            break;
          case 8:
            this.mesf = "Agosto";
            break;
          case 9:
            this.mesf = "Setiembre";
            break;
          case 10:
            this.mesf = "Octubre";
            break;
          case 11:
            this.mesf = "Noviembre";
            break;
          case 12:
            this.mesf = "Diciembre";
            break;              
          default:
            console.log("No such day exists!");
            break;
        }
    
        //let listafillrate = JSON.parse(localStorage.getItem("ListaFillRate"));

        let listafillrate = JSON.parse(JSON.stringify(this.repFillRate.Data));
    
        if (listafillrate != null)
        {

          for (var i = 1; i <= listafillrate.length; i++) {
            let last = listafillrate[listafillrate.length-i];
            //this.XLabels.push(last.Fecha.toString());   
            this.YLabelsF.push(last.Valor.toString());    
          }

          this.finfill = true;
        }


          if (this.finocup == true && this.fineri == true && this.finfill == true)
          { let xvar = this.EjeX;  
            let ocup = this.EjeOcup;
            let frate = this.YLabelsF;
            let eri =  this.YLabelsE;

            console.log(xvar);
            console.log(ocup); 
            console.log(frate);
            console.log(eri);
            console.log("x RepFillRate");
            
            this.cargarGraficos() };
        
  
      }
  
      });

    }

    
 

  generaRepOcu():void{
      this.reportService
      .getOcupabilidad(this.repStockImpRQT)
      .subscribe(
      data => {
        
        this.repOcupabilidad = data;
  
        if (this.repOcupabilidad.Data != null)
        {
                          
          //localStorage.setItem("ListaOcup",JSON.stringify(this.repOcupabilidad.Data));
  
          this.fecha = this.repOcupabilidad.Fecha.toString();
          this.valor = this.repOcupabilidad.Valor.toString();
          this.cantPos =  this.repOcupabilidad.CantidadesPosiciones.toString();
          this.uninegoo = this.repOcupabilidad.UnidNegoDescripcion.toString();
          
          let index = this.fecha.indexOf( "-" ); 
          let month = Number(this.fecha.substring(0,index));
          this.anio = this.fecha.substring(index + 1,this.fecha.length);
  
        switch (month) {
          case 1:
            this.mes = "Enero";
            break;
          case 2:
            this.mes = "Febrero";
            break;
          case 3:
            this.mes = "Marzo";
            break;
          case 4:
            this.mes = "Abril";
            break;
          case 5:
            this.mes = "Mayo";
            break;
          case 6:
            this.mes = "Junio";
            break;
          case 7:
            this.mes = "Julio";
            break;
          case 8:
            this.mes = "Agosto";
            break;
          case 9:
            this.mes = "Setiembre";
            break;
          case 10:
            this.mes = "Octubre";
            break;
          case 11:
            this.mes = "Noviembre";
            break;
          case 12:
            this.mes = "Diciembre";
            break;              
          default:
            console.log("No such day exists!");
            break;
        }
  
          //this.stocktotal = localStorage.getItem("StockTotal");
          
          //let listaocup = JSON.parse(localStorage.getItem("ListaOcup"));
          let listaocup = JSON.parse(JSON.stringify(this.repOcupabilidad.Data));
    
          if (listaocup != null)
          {

        
          for (var i = 1; i <= listaocup.length; i++) {
            let last = listaocup[listaocup.length-i];
            this.EjeX.push(last.Fecha.toString());   
            this.EjeOcup.push(last.Valor.toString());    
             }

          this.finocup = true;
          }

          if (this.finocup == true && this.fineri == true && this.finfill == true)
          { 
        
            console.log("x RepOcupabilidad")
            this.cargarGraficos() };
        
      
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
    }

   cargarGraficos():void{

    console.log(this.EjeX);
    console.log(this.EjeOcup);
    console.log(this.YLabelsF);
    console.log(this.YLabelsE);
    
    if (this.LineChart != null)
    { this.LineChart.destroy();}

    // this.LineChart = new Chart(ctx,{   
      
    let htmlRef = this.elementRef.nativeElement.querySelector(`#lineChart`);
    // this.myChart = new Chart(htmlRef, {
    //this.LineChart = new Chart('lineChart',{    
     // this.LineChart = new Chart('lineChart',{    
    this.LineChart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.EjeX,      
        datasets: [{
          label : '% Ocupabilidad',
          data: this.EjeOcup,
          fill: false,
          lineTension: 0.2,
          borderColor: "blue",
          borderWidth: 1
        },
        {
          label: '% Fill Rate',
          data: this.YLabelsF,
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1
				
        },
        {
          label: '% Eri',
          data: this.YLabelsE,
          fill: false,
          lineTension: 0.2,
          borderColor: "green",
          borderWidth: 1
				
        }
      
      ]      
    },
    options: {
     title: {
       text : "Indicador de Ocupabilidad, FillRate y Eri",
       display : true
     },
     scales : {
      yAxes : [{
        ticks : {
          beginAtZero: true
        }
      }]
  }


  }
     
    } );

  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  

}
