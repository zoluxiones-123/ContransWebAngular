import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SolicitudInscrip } from '../../models/solicinsc';
import { RespSolicitud } from '../../models/resp_solicinsc';
import { DataSetItem } from '../../models/datasetitem';

import { ReportService } from '../../services/report.service';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { ConstantPool } from '@angular/compiler';
import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import swal from 'sweetalert';
import { Chart } from 'chart.js'
import { SwAlert } from 'app/models/swalert';
import { AuthService } from 'app/services/auth.service';
import { RepStockCSURQT, RepStockCSURQTDet} from "app/models/rep_stockCsuRqt";
import { RegistroStockCSU, RegistroStockCSUDet} from "app/models/reg_stockcsu";
import { stringify } from 'querystring';



@Component({
  selector: 'app-repstock-da',
  templateUrl: './repstock-da.component.html',
  styleUrls: ['./repstock-da.component.css']
})


export class RepstockDAComponent implements OnInit {

  myRegistro = new FormControl();
  
  
  
 // registros: string[] = ['123346', '458479', '303225'];
  registros: string[] = [];
  filteredReg: Observable<string[]>;

 
  priregDA: string;
 


  Fechas: Array<string>;
  DiasAlmacen: Array<string>;
  
  Descripcion = [];
  Cantidad = [];


  BGColor = [];
  BDColor = [];



  rgb : number;
  bgrColor : string;
  bdrColor : string;
  BarChartCsu : Chart;
  BarChartDS : Chart;
  BarChartDT : Chart;
  
  
  constructor(private authService: AuthService, private authServiceDS: AuthService,   private router: Router) { 

    this.Fechas = [];
    this.DiasAlmacen = [];

   

    }

  private reqStockCsu: RepStockCSURQT = {
    IDUser: 10,
    IDRol : 1,
    Almacen: 'DA'
  };

  
  private reqStockCsuDS: RepStockCSURQT = {
    IDUser: 10,
    IDRol : 1,
    Almacen: 'DS'
  };

  
  private reqStockCsuDT: RepStockCSURQT = {
    IDUser: 10,
    IDRol : 1,
    Almacen: 'DT'
  };

  
  private reqStockCsuDet: RepStockCSURQTDet = {
    IDUser: 10,
    IDRol : 1,
    Almacen: 'DA',
    Registro: '294507'
  };

  public isError = false;
  public errorgen = true;
  public errormsj = ''; 

  private respStockCsu: RegistroStockCSU = {
    Cod : -1,
    Msj: '',
    Data: []
  };

  
  private respStockCsuDS: RegistroStockCSU = {
    Cod : -1,
    Msj: '',
    Data: []
  };
  
  private respStockCsuDT: RegistroStockCSU = {
    Cod : -1,
    Msj: '',
    Data: []
  };
  
  private respStockCsuDet: RegistroStockCSUDet = {  
    Registro: '',
    Almacen: '',
    Total: 0,
    Data: []
  };

  BarChart = [];
  BarChart2 = [];
  //BarChartCsu = [];
  XLabels = [];
  YLabels = [];
  FechaIngreso = ['01/12/2019','05/12/2019','15/12/2019','25/01/2020'];
  dsitems= [];
  dsitemsDS= [];
  dsitemsDT= [];

  chartList = [5, 6, 7, 8];
  

  ngOnInit() {

    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}

    //this.reportService.getStockImp(this.repStockImpRQT);         
    this.reqStockCsu.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsu.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
 
    this.cargarRegistrosDA();   

    
    
    this.reqStockCsuDet.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDet.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
               
   
    
    this.filteredReg = this.myRegistro.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      
  }

  

  cargarRegistrosDA():void{

    this.authService
        //.loginuser(this.user.Usuario, this.user.Password)
        .getRegStockCSU(this.reqStockCsu)
        .subscribe(
        data => {
          
          this.respStockCsu = data;

          if (this.respStockCsu.Data != null)
          { 
           
            let listaregistros = JSON.parse(JSON.stringify(this.respStockCsu.Data));
      
            for (var i = 0; i <= listaregistros.length - 1; i++) {
              let regi = listaregistros[i];

              if (i == 0)
              { this.priregDA = regi.Registro.toString();
                            
                this.reqStockCsuDet.Almacen = "DA";  
                this.reqStockCsuDet.Registro = this.priregDA;
                this.cargarGraficosCsu("DA");  
                this.myRegistro.setValue(this.priregDA);
              
              }

              this.registros.push(regi.Registro.toString());   
                 
            } 

            
          }
          else{
            this.errorgen = true;
            this.errormsj = this.respStockCsu.Msj;

           
          }

        },  
        error => {
          this.onIsError();           
          console.log("Error");}
        );



  }

  public ChangingRegistro(param : any)
    {
     this.reqStockCsuDet.Almacen = "DA";  
     this.reqStockCsuDet.Registro = param.option.value.toString();
   
     this.cargarGraficosCsu("DA");
   
    
    }

    
  

  

    cargarGraficosCsu(Almacen:string):void{

      this.authService
      //.loginuser(this.user.Usuario, this.user.Password)
      .getRegStockCSUDet(this.reqStockCsuDet)
      .subscribe(
      data => {
        
        this.respStockCsuDet = data;

        if (this.respStockCsuDet.Data != null)
        { 
          
          let lista = JSON.parse(JSON.stringify(this.respStockCsuDet.Data));

          this.Descripcion = [];
          this.Cantidad = [];
          this.BGColor = [];
          this.BDColor = [];
         
          //this.BarChartCsu = [];
        

          this.dsitems = [];
          this.dsitemsDS = [];
          this.dsitemsDT = [];
          
      

          this.rgb = 88;

          if (Almacen == "DA")
          {
            this.Fechas = [];
            this.DiasAlmacen = [];
          }

         

          for (var i = 0; i <= lista.length - 1; i++) {
           
            let reg = lista[i];
           

            if (Almacen == "DA")
            {
            this.Fechas.push(reg.FechaIngreso.toString());   
            this.DiasAlmacen.push(reg.DiasAlma.toString());
            this.Descripcion.push(reg.Decripcion.toString()); 
            this.Cantidad.push(reg.Cantidad.toString());     
          

            }

          


           
            
            let rgbc = Math.floor(Math.random() * 555) + 50;
 
            this.rgb = rgbc;
            
            let rgbr = Math.floor(Math.random() * 155) + 50;
            
            //this.bgrColor = 'rgba(51, 255,' + this.rgb.toString() + ',0.75)';

            this.bgrColor = 'rgba(51, ' + rgbr.toString() + ', '  + this.rgb.toString() + ',0.75)';
            

            this.bdrColor = 'rgba(51, 255,' + this.rgb.toString() + ', 1)';

            // 5 -> 20
            
            if (Almacen == "DA")
            {
            this.BGColor.push(this.bgrColor);
            this.BDColor.push(this.bdrColor); 
            
            //data: [this.YLabels[0].toString()]
            
            let dtitem = new DataSetItem(
                         reg.Decripcion.toString(), this.bgrColor,this.bdrColor, [reg.Cantidad.toString()]        
                        )
            
            this.dsitems.push(dtitem);                                                                                  
            }            
          }

          if (Almacen == "DA")
          {this.cargarGraficosDAF();                    }

          
          
          
        }
        else{
          this.errorgen = true;
          this.errormsj = this.respStockCsu.Msj;

         
        }

      },  
      error => {
        this.onIsError();           
        console.log("Error");}
      );



    }
  

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
  
    return this.registros.filter(option => option.toLowerCase().indexOf(filterValue) === 0);    
    
  }

  cargarGraficos():void{

    this.BarChart = new Chart('barChart', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['26/02/2019','15/01/2019','25/05/2019'],       
          datasets: [
            {label: 'PlayBox erer',
            backgroundColor: 'rgba(255, 122, 51, 0.68)',
            borderColor : 'rgba(255, 122, 51, 1)',
            data: ['55','6']
            },  
            { label: 'Set 12 Masas Granuladas',
              backgroundColor: 'rgba(51, 255, 243, 0.65)',
              borderColor : 'rgba(51, 255, 243, 1)',
              data: ['76','7']
            },
            { label: 'Balde Masas Frutas',
              backgroundColor: 'rgba(51, 255, 88, 0.75)',
              borderColor : 'rgba(51, 255, 88, 1)',
              data: ['48','23']
            }
           
        
        ]   
          
      },
    options: {
      tooltips: {    
        callbacks: {          
          label: function(tooltipItem, data) {
         
            var successCount = data.labels[tooltipItem.datasetIndex].toString();
            var failCount = data.datasets[tooltipItem.datasetIndex].data[1];
         
          return "Fecha Ingreso: " + successCount + "\n Distinct: " + failCount;
          }
      }

       },       
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: "#000080",
        }
      },
        title: {
          text : "Carga Stock (DA)",
          display : true
        },
          scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Descripción'
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
                  labelString: 'Cantidad'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  }

  cargarGraficosDA():void{

    //var grapharea = document.getElementById("barChart2");

    if (this.BarChartCsu != null)
    { this.BarChartCsu.destroy();}

    this.BarChartCsu = new Chart('barChart2', {
      type: 'bar',
      data: {
        //labels: ["Red", "Blue", "green", "Yellow"],
        labels: this.Descripcion,       
        datasets: [{
          //label: '# of Votes',
         data: this.Cantidad,        
         backgroundColor : this.BGColor,
      
        borderColor : this.BDColor,

         // borderColor: [
          //  'rgba(255,99,132,1)',
         //   'rgba(54, 162, 235, 1)',
         //   'rgba(255,99,132,1)',
        //      'rgba(54, 162, 235, 1)',
        //  ],

          borderWidth: 1
        }]
      },
      options: {
        title: {
          text : "Carga Stock (DA)",
          display : true
        },
        scales: {
          xAxes:[{
            position : 'bottom',
        
            barPercentage: 0.1
           
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Cantidad'
              }, 
                ticks: {
                    beginAtZero: true
                }
            }]          
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            fontColor: "#000080",
          }
        },
        tooltips: {
        //  mode: 'index',
         // intersect: true,
          callbacks: {
           title: (tooltipItem, data) => {
           

             return "Fecha Ingreso: " + this.Fechas[tooltipItem[0].index].toString() + " \n" + 
             "Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
              
              
            },
            label: function(tooltipItem, data) {
            
              return "Cantidad: " + tooltipItem.yLabel + ' Unidades';           
            }

           }
          }


        }      
      }
    );
  

  }

  

  

  cargarGraficosDAF():void{

    
    if (this.BarChartCsu != null)
    { this.BarChartCsu.destroy();}

    this.BarChartCsu = new Chart('barChart2', {
      responsive : true,
      type: 'bar',
      data: {
          //labels: this.XLabels,
          labels: ['Articulos'],       
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
          text : "Carga Stock(DA)",
          display : true
        },
        scales: {
            xAxes:[{
              position : 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Articulos'
              },      
              barPercentage: 0.1,
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
                  labelString: 'Cantidad'
                }, 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          tooltips: {
          
              callbacks: {
               title: (tooltipItem, data) => {
                 
                  
    
                 return "Fecha Ingreso: " + this.Fechas[tooltipItem[0].index].toString() + " \n" + 
                 "Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
                  
                  
                },
                label: function(tooltipItem, data) {
               
                  return "Cantidad: " + tooltipItem.yLabel + ' Unidades';           
                }
    
               }
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

