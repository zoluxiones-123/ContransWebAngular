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
  selector: 'app-repstock-ds',
  templateUrl: './repstock-ds.component.html',
  styleUrls: ['./repstock-ds.component.css']
})


export class RepstockDSComponent implements OnInit {

  myRegistroDS = new FormControl();
 
  
  
  registrosDS: string[] = [];
  filteredRegDS: Observable<string[]>;

  

  priregDS: string;
  


  FechasDS: Array<string>;
  DiasAlmacenDS: Array<string>;


  DescripcionDS = [];
  CantidadDS = [];

  

  BGColorDS = [];
  BDColorDS = [];

  
  


  rgb : number;
  bgrColor : string;
  bdrColor : string;
  BarChartCsu : Chart;
  BarChartDS : Chart;
  BarChartDT : Chart;
  
  
  constructor(private authService: AuthService, private authServiceDS: AuthService,   private router: Router) { 


    this.FechasDS = [];
    this.DiasAlmacenDS = [];

    
   

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
    
    this.reqStockCsuDS.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDS.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsuDS.Almacen = "DS";

    this.cargarRegistrosDS(); 
    
    
    this.reqStockCsuDet.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDet.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
               
    this.filteredRegDS = this.myRegistroDS.valueChanges.pipe(
        startWith(''),
        map(value => this._filterDS(value))
      );
    
  }


  cargarRegistrosDS():void
  {
 ////////////////Registros DS ////////////

 this.authServiceDS
 //.loginuser(this.user.Usuario, this.user.Password)
 .getRegStockCSU(this.reqStockCsuDS)
 .subscribe(
 data => {
   
   this.respStockCsuDS = data;

   if (this.respStockCsuDS.Data != null)
   { 
     //swal({text :"Se ha cambiado la contraseña correctamente", icon:"success"});
     //this.dialogRef.close();
     //this.router.navigate(['home']);
     let listaregistrosDS = JSON.parse(JSON.stringify(this.respStockCsuDS.Data));

     for (var i = 0; i <= listaregistrosDS.length - 1; i++) {
       let regi = listaregistrosDS[i];
       this.registrosDS.push(regi.Registro.toString());   
       
       if (i == 0)
       { this.priregDS = regi.Registro.toString();
                     
         this.reqStockCsuDet.Almacen = "DS";  
         this.reqStockCsuDet.Registro = this.priregDS;
         this.cargarGraficosCsu("DS");  
         this.myRegistroDS.setValue(this.priregDS);
       
       }



     }

   }
   else{
     this.errorgen = true;
     this.errormsj = this.respStockCsuDS.Msj;

    
   }

 },  
 error => {
   this.onIsError();           
   console.log("Error");}
 );
  }

  

    
  public ChangingRegistroDS(param : any)
  {
    //var codenti = param.option.value.toString().split(",");
    //var codentif = codenti[0].toString();
   this.reqStockCsuDet.Almacen = "DS";  
   this.reqStockCsuDet.Registro = param.option.value.toString();
   //swal({text : param.option.value.toString()});
  // this.cargarGraficos();      
   this.cargarGraficosCsu("DS");
    //this.cargarGraficosT();
    
    //this.EntidadSelect = param.option.value;
  
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
          //swal({text :"Se ha cambiado la contraseña correctamente", icon:"success"});
          //this.dialogRef.close();
          //this.router.navigate(['home']);
          let lista = JSON.parse(JSON.stringify(this.respStockCsuDet.Data));

          
         
          //this.BarChartCsu = [];
          this.DescripcionDS = [];
          this.CantidadDS = [];
          this.BGColorDS = [];
          this.BDColorDS = [];

         
          this.dsitems = [];
          this.dsitemsDS = [];
          this.dsitemsDT = [];
          
      

          this.rgb = 88;

         

          if (Almacen == "DS")
          {
            this.FechasDS = [];
            this.DiasAlmacenDS = [];
          }

          

          for (var i = 0; i <= lista.length - 1; i++) {
           
            let reg = lista[i];                      

            if (Almacen == "DS")
            {
            this.FechasDS.push(reg.FechaIngreso.toString());   
            this.DiasAlmacenDS.push(reg.DiasAlma.toString());    
            this.DescripcionDS.push(reg.Decripcion.toString()); 
            this.CantidadDS.push(reg.Cantidad.toString());      
            }           

            //let rgbc = this.rgb;
            //rgbc = rgbc + (300 * i);
            
            let rgbc = Math.floor(Math.random() * 555) + 50;
 
            this.rgb = rgbc;
            
            let rgbr = Math.floor(Math.random() * 155) + 50;
            
            //this.bgrColor = 'rgba(51, 255,' + this.rgb.toString() + ',0.75)';

            this.bgrColor = 'rgba(51, ' + rgbr.toString() + ', '  + this.rgb.toString() + ',0.75)';
            

            this.bdrColor = 'rgba(51, 255,' + this.rgb.toString() + ', 1)';

            // 5 -> 20
            
           

            if (Almacen == "DS")
            {
              this.BGColorDS.push(this.bgrColor);
              this.BDColorDS.push(this.bdrColor);   

              let dtitemds = new DataSetItem(
                reg.Decripcion.toString(), this.bgrColor,this.bdrColor, [reg.Cantidad.toString()]        
               )
   
              this.dsitemsDS.push(dtitemds);              

            }

          
          }

        

          if (Almacen == "DS")
          {this.cargarGraficosDSF();                    }

        
          
          

  //backgroundColor: 'rgba(51, 255, 88, 0.75)',
  //borderColor : 'rgba(51, 255, 88, 1)',

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
  
  private _filterDS(valueds: string): string[] {
    const filterValueds = valueds.toLowerCase();
    
    //this.registrosDS = JSON.parse(localStorage.getItem("ListaDS"));

    return this.registrosDS.filter(optionds => optionds.toLowerCase().indexOf(filterValueds) === 0);    
    
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
      tooltips: {    
        callbacks: {          
          label: function(tooltipItem, data) {
           // swal(tooltipItem.datasetIndex.toString());
           //swal(this.FechaIngreso[tooltipItem.datasetIndex].toString());
            var successCount = data.labels[tooltipItem.datasetIndex].toString();
            var failCount = data.datasets[tooltipItem.datasetIndex].data[1];
           // var failCount = data.datasets[1].data[tooltipItem.index];
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

 
  cargarGraficosDS():void{

    //var grapharea = document.getElementById("barChart2");

    if (this.BarChartDS != null)
    { this.BarChartDS.destroy();}

    this.BarChartDS = new Chart('barChartDS', {
      type: 'bar',
      data: {
        //labels: ["Red", "Blue", "green", "Yellow"],
        labels: this.DescripcionDS,       
        datasets: [{
          //label: '# of Vot4e0s0',
         data: this.CantidadDS,        
         backgroundColor : this.BGColorDS,
          //backgroundColor: [
         //   'rgba(255, 99, 132, 0.2)',11
          //  'rgba(54, 162, 235, 0.2)',
         //   'rgba(255, 99, 132, 0.2)',
         //   'rgba(54, 162, 235, 0.2)',
        //  ],
        borderColor : this.BDColorDS,

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
          text : "Carga Stock (DS)",
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
              // console.log("tooltipitem ", tooltipItem);
              // console.log("data ", data);
              // console.log("tooltipsLabel ", this.tooltipsLabel);
              // console.log(this.tooltipsLabel[tooltipItem[0].index].toString());

              //return "Fecha Ingreso: " + this.tooltipsLabel[tooltipItem[0].index].toString() + " \n" + 
              //"Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
              

             return "Fecha Ingreso: " + this.FechasDS[tooltipItem[0].index].toString() + " \n" + 
             "Dias de Almacen: " + this.DiasAlmacenDS[tooltipItem[0].index].toString();
              
              
            },
            label: function(tooltipItem, data) {
              // swal(tooltipItem.datasetIndex.toString());
              //swal(this.FechaIngreso[tooltipItem.datasetIndex].toString());
               //var successCount = data.labels[tooltipItem.datasetIndex].toString();
              // var failCount = data.datasets[tooltipItem.datasetIndex].data[1];
              // var failCount = data.datasets[1].data[tooltipItem.index];
              return "Cantidad: " + tooltipItem.yLabel + ' Unidades';           
            }

           }
          }



        }      
      }
    );
  
    //this.BarChartCsu.destroy();

  }

 

  

  cargarGraficosDSF():void{

    if (this.BarChartDS != null)
    { this.BarChartDS.destroy();}

  this.BarChartDS = new Chart('barChartDS', {
    responsive : true,
    type: 'bar',
    data: {
        //labels: this.XLabels,
        labels: ['Articulos'],       
        datasets: this.dsitemsDS
        
        
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
        text : "Carga Stock(DS)",
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
               
                
  
               return "Fecha Ingreso: " + this.FechasDS[tooltipItem[0].index].toString() + " \n" + 
               "Dias de Almacen: " + this.DiasAlmacenDS[tooltipItem[0].index].toString();
                
                
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
