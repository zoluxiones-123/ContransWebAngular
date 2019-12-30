import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SolicitudInscrip } from '../../models/solicinsc';
import { RespSolicitud } from '../../models/resp_solicinsc';
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
  selector: 'app-repstockcsu',
  templateUrl: './repstockcsu.component.html',
  styleUrls: ['./repstockcsu.component.css']
})
export class RepstockcsuComponent implements OnInit {

  myRegistro = new FormControl();
  myRegistroDS = new FormControl();
  myRegistroDT = new FormControl();
  
  
 // registros: string[] = ['123346', '458479', '303225'];
  registros: string[] = [];
  filteredReg: Observable<string[]>;

  registrosDS: string[] = [];
  filteredRegDS: Observable<string[]>;

  
  registrosDT: string[] = [];
  filteredRegDT: Observable<string[]>;


  Fechas: Array<string>;
  DiasAlmacen: Array<string>;
  FechasDS: Array<string>;
  DiasAlmacenDS: Array<string>;

  FechasDT: Array<string>;
  DiasAlmacenDT: Array<string>;
  

  Descripcion = [];
  Cantidad = [];

  DescripcionDS = [];
  CantidadDS = [];

  
  DescripcionDT = [];
  CantidadDT = [];

  BGColor = [];
  BDColor = [];

  BGColorDS = [];
  BDColorDS = [];

  
  BGColorDT = [];
  BDColorDT = [];
  


  rgb : number;
  bgrColor : string;
  bdrColor : string;
  BarChartCsu : Chart;
  BarChartDS : Chart;
  BarChartDT : Chart;
  
  
  constructor(private authService: AuthService, private authServiceDS: AuthService,   private router: Router) { 

    this.Fechas = [];
    this.DiasAlmacen = [];

    this.FechasDS = [];
    this.DiasAlmacenDS = [];

    
    this.FechasDT = [];
    this.DiasAlmacenDT = [];

    this.cargarRegistrosDS();       
    this.cargarRegistrosDA();     
    this.cargarRegistrosDT(); 
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

  chartList = [5, 6, 7, 8];
  

  ngOnInit() {

    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}

    //this.reportService.getStockImp(this.repStockImpRQT);         
    this.reqStockCsu.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsu.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";

    this.reqStockCsuDS.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDS.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsuDS.Almacen = "DS";

    
    this.reqStockCsuDT.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsuDT.Almacen = "DT";
    
    this.reqStockCsuDet.IDUser = Number(localStorage.getItem("Usuario").toString());   
    this.reqStockCsuDet.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
               
    this.filteredRegDS = this.myRegistroDS.valueChanges.pipe(
        startWith(''),
        map(value => this._filterDS(value))
      );
    
    this.filteredReg = this.myRegistro.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
    this.filteredRegDT = this.myRegistroDT.valueChanges.pipe(
        startWith(''),
        map(value => this._filterDT(value))
      );
    

  }

  cargarRegistrosDT():void
  {
 ////////////////Registros DS ////////////

 this.authServiceDS
 //.loginuser(this.user.Usuario, this.user.Password)
 .getRegStockCSU(this.reqStockCsuDT)
 .subscribe(
 data => {
   
   this.respStockCsuDT = data;

   if (this.respStockCsuDT.Data != null)
   { 
     //swal({text :"Se ha cambiado la contraseña correctamente", icon:"success"});
     //this.dialogRef.close();
     //this.router.navigate(['home']);
     let listaregistrosDT = JSON.parse(JSON.stringify(this.respStockCsuDT.Data));

     for (var i = 0; i <= listaregistrosDT.length - 1; i++) {
       let regi = listaregistrosDT[i];
       this.registrosDT.push(regi.Registro.toString());   
          
     }

    /* this.registrosDS.push('0001');   
     this.registrosDS.push('0002');    
     this.registrosDS.push('0003');*/  

 //    localStorage.setItem("ListaDS", JSON.stringify(this.registrosDS));

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
          
     }

    /* this.registrosDS.push('0001');   
     this.registrosDS.push('0002');    
     this.registrosDS.push('0003');*/  

 //    localStorage.setItem("ListaDS", JSON.stringify(this.registrosDS));

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

  cargarRegistrosDA():void{

    this.authService
        //.loginuser(this.user.Usuario, this.user.Password)
        .getRegStockCSU(this.reqStockCsu)
        .subscribe(
        data => {
          
          this.respStockCsu = data;

          if (this.respStockCsu.Data != null)
          { 
            //swal({text :"Se ha cambiado la contraseña correctamente", icon:"success"});
            //this.dialogRef.close();
            //this.router.navigate(['home']);
            let listaregistros = JSON.parse(JSON.stringify(this.respStockCsu.Data));
      
            for (var i = 0; i <= listaregistros.length - 1; i++) {
              let regi = listaregistros[i];
              this.registros.push(regi.Registro.toString());   
                 
            } 

            
           /* this.registros.push('0005');   
            this.registros.push('0009');    
            this.registros.push('0010');  */
            
         //   localStorage.setItem("ListaDA", JSON.stringify(this.registros));

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
      //var codenti = param.option.value.toString().split(",");
      //var codentif = codenti[0].toString();
     this.reqStockCsuDet.Almacen = "DA";  
     this.reqStockCsuDet.Registro = param.option.value.toString();
     //swal({text : param.option.value.toString()});
    // this.cargarGraficos();      
     this.cargarGraficosCsu("DA");
      //this.cargarGraficosT();
      
      //this.EntidadSelect = param.option.value;
    
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

  
  public ChangingRegistroDT(param : any)
  {
    //var codenti = param.option.value.toString().split(",");
    //var codentif = codenti[0].toString();
   this.reqStockCsuDet.Almacen = "DT";  
   this.reqStockCsuDet.Registro = param.option.value.toString();
   //swal({text : param.option.value.toString()});
  // this.cargarGraficos();      
   this.cargarGraficosCsu("DT");
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

          this.Descripcion = [];
          this.Cantidad = [];
          this.BGColor = [];
          this.BDColor = [];
         
          //this.BarChartCsu = [];
          this.DescripcionDS = [];
          this.CantidadDS = [];
          this.BGColorDS = [];
          this.BDColorDS = [];

          this.DescripcionDT = [];
          this.CantidadDT = [];
          this.BGColorDT = [];
          this.BDColorDT = [];
      

          this.rgb = 88;

          if (Almacen == "DA")
          {
            this.Fechas = [];
            this.DiasAlmacen = [];
          }

          if (Almacen == "DS")
          {
            this.FechasDS = [];
            this.DiasAlmacenDS = [];
          }

          if (Almacen == "DT")
          {
            this.FechasDT = [];
            this.DiasAlmacenDT = [];
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

            if (Almacen == "DS")
            {
            this.FechasDS.push(reg.FechaIngreso.toString());   
            this.DiasAlmacenDS.push(reg.DiasAlma.toString());    
            this.DescripcionDS.push(reg.Decripcion.toString()); 
            this.CantidadDS.push(reg.Cantidad.toString());      
            }

            if (Almacen == "DT")
            {
            this.FechasDT.push(reg.FechaIngreso.toString());   
            this.DiasAlmacenDT.push(reg.DiasAlma.toString());    
            this.DescripcionDT.push(reg.Decripcion.toString()); 
            this.CantidadDT.push(reg.Cantidad.toString());      
            }

            let rgbc = this.rgb;
            rgbc = rgbc + (100 * i);
 
            this.rgb = rgbc;
            
            this.bgrColor = 'rgba(51, 255,' + this.rgb.toString() + ',0.75)';
            this.bdrColor = 'rgba(51, 255,' + this.rgb.toString() + ', 1)';
            
            if (Almacen == "DA")
            {
            this.BGColor.push(this.bgrColor);
            this.BDColor.push(this.bdrColor);   
            }

            if (Almacen == "DS")
            {
              this.BGColorDS.push(this.bgrColor);
              this.BDColorDS.push(this.bdrColor);   
            }

            if (Almacen == "DT")
            {
              this.BGColorDT.push(this.bgrColor);
              this.BDColorDT.push(this.bdrColor);   
            }
         
          }

          if (Almacen == "DA")
          {this.cargarGraficosDA();                    }

          if (Almacen == "DS")
          {this.cargarGraficosDS();                    }

          if (Almacen == "DT")
          {this.cargarGraficosDT();                    }
          
          

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

  
  private _filterDT(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    //this.registrosDS = JSON.parse(localStorage.getItem("ListaDS"));

    return this.registrosDT.filter(option => option.toLowerCase().indexOf(filterValue) === 0);    
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
 //   this.registros = JSON.parse(localStorage.getItem("ListaDA"));
  
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
          //backgroundColor: [
         //   'rgba(255, 99, 132, 0.2)',
          //  'rgba(54, 162, 235, 0.2)',
         //   'rgba(255, 99, 132, 0.2)',
         //   'rgba(54, 162, 235, 0.2)',
        //  ],
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
              // console.log("tooltipitem ", tooltipItem);
              // console.log("data ", data);
              // console.log("tooltipsLabel ", this.tooltipsLabel);
              // console.log(this.tooltipsLabel[tooltipItem[0].index].toString());

              //return "Fecha Ingreso: " + this.tooltipsLabel[tooltipItem[0].index].toString() + " \n" + 
              //"Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
              

             return "Fecha Ingreso: " + this.Fechas[tooltipItem[0].index].toString() + " \n" + 
             "Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
              
              
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

  cargarGraficosDT():void{

    //var grapharea = document.getElementById("barChart2");

    if (this.BarChartDT != null)
    { this.BarChartDT.destroy();}

    this.BarChartDT = new Chart('barChartDT', {
      type: 'bar',
      data: {
        //labels: ["Red", "Blue", "green", "Yellow"],
        labels: this.DescripcionDT,       
        datasets: [{
          //label: '# of Vot4e0s0',
         data: this.CantidadDT,        
         backgroundColor : this.BGColorDT,
          //backgroundColor: [
         //   'rgba(255, 99, 132, 0.2)',11
          //  'rgba(54, 162, 235, 0.2)',
         //   'rgba(255, 99, 132, 0.2)',
         //   'rgba(54, 162, 235, 0.2)',
        //  ],
        borderColor : this.BDColorDT,

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
          text : "Carga Stock (DT)",
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
              

             return "Fecha Ingreso: " + this.FechasDT[tooltipItem[0].index].toString() + " \n" + 
             "Dias de Almacen: " + this.DiasAlmacenDT[tooltipItem[0].index].toString();
              
              
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

  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
