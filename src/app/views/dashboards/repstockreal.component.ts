import { Chart } from 'chart.js'
import { AfterViewInit, Component, OnDestroy, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ReportService } from '../../services/report.service'
import { RepStockImpRPT } from '../../models/rep_stockimpRPT'
import { RepStockRealRPT } from '../../models/rep_stockrealRPT'
import { RepStockRealRefRPT } from '../../models/rep_stockrealRPT'

import { DetRepStockRealRQT } from  '../../models/det_repstockreal'
import { DetRepStockRealRPT } from  '../../models/det_repstockreal'


import { RepStockRealVacRQT } from  '../../models/det_repstockreal'
import { RepStockRealVacRPT } from  '../../models/det_repstockreal'
import { DetRepStockRealVac } from  '../../models/det_repstockreal'


import { DetRepStockReal } from  '../../models/det_repstockreal'


import { Entidades } from 'app/models/entidad';
import { entid } from 'app/models/entidad';
import { entidad } from 'app/models/entidad';

import { RepStockImpRQT } from '../../models/rep_stockimpRQT'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import swal from 'sweetalert';
import { DataTableDirective } from 'angular-datatables';
import { Subject, fromEventPattern, interval, timer } from 'rxjs';
import { RepDiasLibresRPT } from '../../models/rep_diaslibresRPT'
import { RepDiasLibresRQT } from '../../models/rep_diaslibresRQT'

import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-repstockreal',
  templateUrl: './repstockreal.component.html',
  styleUrls: ['./repstockreal.component.css']
})



export class RepstockrealComponent implements OnInit, AfterViewInit, OnDestroy  {
  constructor(private authservice: AuthService, private reportService: ReportService,  private elementRef: ElementRef, private router: Router, private location: Location) { }

 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  
  public SiCargoData = true;
  public TieneData = false;
  public UnidadNegSelect:string;
  
  minDate: Date;
  maxDate: Date;

  public objrepdlRQT : RepDiasLibresRQT;

  public objrepdlRPT: RepDiasLibresRPT;
  public loading : boolean;
  
  public LEntidades : Entidades;
  public ListaEntidades : Array<entidad> = [];

  public RepStockReal : DetRepStockReal;
  public LRepStockReal : Array<DetRepStockRealRPT> = [];

  public LRepStockRealVac : Array<RepStockRealVacRPT>;
  public objRepStockRealDet : DetRepStockRealVac;

 
  public isError = false;
  public repStockImpRPT :RepStockImpRPT = null;
  public stocktotal : number;
  public stk20 : string;
  public stk40 : string;
  public stk20ST : string;
  public stk20RF : string;
  public EntidadSelect : string;
  public NEntidadSelect : string;
  
  public NombreEntidad : string;
  

  public CTN : string;

  public stk40ST: string;
  public stk40HC : string;
  public stk40RF : string;

  //public objStockRealRPT: Array<RepStockRealRPT>;
  public objStockRealRefRPT: Array<RepStockRealRefRPT>;
    
  public ConsultoReporte : boolean;
  public VisCol : boolean;
  
  private repStockImpRQT: RepStockImpRQT = {
    IDUser: 0,
    IDRol: 2,
    UniNeg : ''

  };

  
  private repDetStockRealRQT: DetRepStockRealRQT = {
    IDUSer: 0,
    IDRol: 0,
    Entidad : ''

  };

  
  private detStockRealVacRQT: RepStockRealVacRQT = {
    IDUSer: 0,
    IDRol: 0,
    Entidad : '',
    Tipo : ''
  };

  

  title = 'Angular 8 with Chart Js';
  LineChart = [];
  
  chartcl : Chart;
  PieChart : Chart;
  //BarChart = [];
  BarChart2 = [];
  BarChartH = [];
  XLabels = [];
  YLabels = [];
  YStCT = [];
  YAband = [];
  PieData = [];
  PieLabels = [];
  tiporeportes = [];

  

  dtTrigger:Subject<any> = new Subject();

  dtOptions : any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
      'colvis',
      {
          extend: 'excel',
          exportOptions: {
              columns: ':visible'
          }
      }     
    ],    
    columnDefs :  [
      {
          "targets": [ 8 ],
          "visible": false
        },
      {
          "targets": [ 9 ],
          "visible": false
      },
      {
        "targets": [ 10 ],
        "visible": false
      },
      {
        "targets": [ 14 ],
        "visible": false
      }
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
        colvis : "Columnas",
        excel : "Exportar a Excel"
      },
      aria :
      {
        sortAscending :"Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };

  
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    this.dtTrigger.next();
    console.log(this.dtElement);
  }
  

  ngOnInit() {

    this.tiporeportes = [{
      id: 'ONE',
      nombre: 'Linea ONE'
     },
     {
      id: 'PIL',
      nombre: 'Linea PIL'   
    }];

   this.stocktotal = 0;
   this.loading = false;
    //this.reportService.getStockImp(this.repStockImpRQT);   

    
  this.reportService
  .getListaNaviera()
  .subscribe(
    data => {
      
      this.LEntidades = data;

      if (this.LEntidades.Data != null)
      {                              
        let listaent =JSON.parse(JSON.stringify(this.LEntidades.Data));              
       
        for (var i = 0; i <= listaent.length-1; i++) {
          let last = listaent[i];            
          this.ListaEntidades.push(last);
          //this.options.push(last.Nombre);
        }
      
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

    this.ConsultoReporte = false;
    this.SiCargoData = false;

    if (localStorage.getItem("Usuario") == null)
    {  this.router.navigate(['/login']);}

    this.SetGrillaVisibility(false);
    
  
   //this.router.navigate(['home']);    

  }

  
  public ChangingValue(param : any)
  {
    this.EntidadSelect = param.target.value;

    let ind = param.target.selectedIndex;
    
    this.NEntidadSelect = param.target.options[ind].innerText;

    //this.NEntidadSelect = this.ListaEntidades[ind].Nombre;
               
  }

  showData(evt:any){
      //var data = this.BarChart.getElementsAtEvent(evt);
      var data = this.PieChart.getElementAtEvent(evt);   
      
      if (data.length > 0)  
       {console.log(data[0]._model);

     // this.LRepStockRealVac = [];
      
      let valor = this.PieChart.data.datasets[data[0]._datasetIndex].data[data[0]._index];

      let tipo = this.PieChart.data.labels[data[0]._index];

       
      this.detStockRealVacRQT.IDUSer =  Number(localStorage.getItem("Usuario").toString());   
      this.detStockRealVacRQT.IDRol =  Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());   
      this.detStockRealVacRQT.Entidad =  this.EntidadSelect.toString();
      this.detStockRealVacRQT.Tipo =  tipo.toString();

      this.dtOptions.columnDefs = [
        {
            "targets": [ 8 ],
            "visible": false
          },
        {
            "targets": [ 9 ],
            "visible": false
        },
        {
          "targets": [ 10 ],
          "visible": false
        },
        {
          "targets": [ 14 ],
          "visible": false
        }
      ];

      //this.CargarGrillaFinal();

      this.loading = true;

      let res = this.reportService.getStockRealDet(this.detStockRealVacRQT)

      if (tipo.toString() == "40 RH")
      {         
       this.dtOptions.columnDefs = [
         {
             "targets": [ 8 ],
             "visible": true
           },
         {
             "targets": [ 9 ],
             "visible": true
         },
         {
           "targets": [ 10 ],
           "visible": true
         },
         {
           "targets": [ 14 ],
           "visible": true
         }
       ]
      }
      else
      {
        this.dtOptions.columnDefs = [
          {
              "targets": [ 8 ],
              "visible": false
            },
          {
              "targets": [ 9 ],
              "visible": false
          },
          {
            "targets": [ 10 ],
            "visible": false
          },
          {
            "targets": [ 14 ],
            "visible": false
          }
        ]

      }
    
      res.subscribe( 
        data => { 
          this.objRepStockRealDet = data; 

          
          if (data.length >= 1)
          {
          
            this.SiCargoData = true;
            this.loading = false;
           
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
              dtInstance.destroy();
      
              this.dtTrigger.next(this.objRepStockRealDet.Data);
              this.SetGrillaVisibility(true);
            });
            //this.dtTrigger.next(this.objrepdlRPT);
            //this.SetGrillaVisibility(true);
            // this.TieneData = true;
          }
          else
          {
            this.SiCargoData = true;
            this.loading = false;
  
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
            dtInstance.destroy();
       
               this.dtTrigger.next(this.objRepStockRealDet);
               this.SetGrillaVisibility(true);
            });
  
            swal("No existen datos");
          }
         // this.dtTrigger.unsubscribe();
        }, 
        error => {
                  swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
          console.log("Error : ", error); 
        }
      );
  
  
       }
    }
       
  
     CargarGrilla40HC()
     {

      this.LRepStockRealVac = [
        {
          Contenedor: "PCIU-122436-6",
          Size: 20,
          Tipo: 20,
          Tara: 2260,
          PayLoad: 28220,
          AnioFabr: 2011,
          Clase: "M",
          CondicionCaja: "OK",
          CondicionMaquina: "",
          Bloqueo: "",
          BloqueoMotivo: "",
          FRecepcion: "31/01/2020 11:45",
          Nave: "E.R FRANCE",
          NroViaje: "001W",
          Marca: "XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "XX"
      }
      ]

     }

     CargarGrillaFinal()
     {
      
      this.reportService
      .getStockRealDet(this.detStockRealVacRQT)
      .subscribe(
      data => {

       // this.RepStockRealVac = data;

        this.LRepStockRealVac = data;

        if (this.LRepStockRealVac.length >= 1)
        { 
          
         //this.CargarGrilla20ST();

         //this.SiCargoData = true;

         //return;

         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
          dtInstance.destroy();
           
       });

       this.dtTrigger.next(this.LRepStockRealVac);     

       // console.log(this.dtTrigger);

        this.SetGrillaVisibility(true);


        
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

     CargarGrilla20ST()
     {

      



      this.LRepStockRealVac = [
        {
          Contenedor: "PCIU-122436-6",
          Size: 20,
          Tipo: 20,
          Tara: 2260,
          PayLoad: 28220,
          AnioFabr: 2011,
          Clase: "M",
          CondicionCaja: "OK",
          CondicionMaquina: "",
          Bloqueo: "",
          BloqueoMotivo: "",
          FRecepcion: "31/01/2020 11:45",
          Nave: "E.R FRANCE",
          NroViaje: "001W",
          Marca: "333333333XX"
      },
      {
        Contenedor: "PCIU-122436-6",
        Size: 20,
        Tipo: 20,
        Tara: 2260,
        PayLoad: 28220,
        AnioFabr: 2011,
        Clase: "M",
        CondicionCaja: "OK",
        CondicionMaquina: "",
        Bloqueo: "",
        BloqueoMotivo: "",
        FRecepcion: "31/01/2020 11:45",
        Nave: "E.R FRANCE",
        NroViaje: "001W",
        Marca: "wwwwwwwXX"
      }
      ]

     }

   


    public CargarGrilla(form: NgForm) {
            
   
    }

    public CargarGrafico(form: NgForm) {
    

      this.ConsultoReporte = true;

      this.PieData = [];
      this.PieLabels = [];

      this.repDetStockRealRQT.IDUSer =  Number(localStorage.getItem("Usuario").toString());   
      this.repDetStockRealRQT.IDRol =  Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());   
      this.repDetStockRealRQT.Entidad =  this.EntidadSelect.toString();
      
      this.SetGrillaVisibility(false);

      return this.reportService
      //.loginuser(this.user.Usuario, this.user.Password)
      .getStockReal(this.repDetStockRealRQT)
      .subscribe(
      data => {

        this.RepStockReal = data;

        if (this.RepStockReal.Data != null)
        {                              
          let listaent =JSON.parse(JSON.stringify(this.RepStockReal.Data));              
         
          for (var i = 0; i <= listaent.length-1; i++) {
            let pie = listaent[i];            
            //this.LRepStockReal.push(pie);

            this.PieData.push(pie.Cantidad.toString());
            this.PieLabels.push(pie.Tipo);
          }

         


          this.cargarGraficos();

        
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

    public CargarPie1(form: NgForm) {

      this.ConsultoReporte = true;

      this.PieData = [];

      this.stocktotal = 0;

      this.repDetStockRealRQT.IDUSer =  Number(localStorage.getItem("Usuario").toString());   
      this.repDetStockRealRQT.IDRol =  Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());   
      this.repDetStockRealRQT.Entidad =  this.EntidadSelect.toString();
      
      this.SetGrillaVisibility(false);
      

      return this.reportService
      //.loginuser(this.user.Usuario, this.user.Password)
      .getStockImp(this.repStockImpRQT)
      .subscribe(
      data => {
        
        this.repStockImpRPT = data;         
  
        if (this.repStockImpRPT.CNTSTK_TOT != 0)
        {
         
         // this.stocktotal = this.repStockImpRPT.CNTSTK_TOT.toString();        
          this.stk20 =  this.repStockImpRPT.CNTSTK_20.toString();
          this.stk40 = this.repStockImpRPT.CNTSTK_40.toString();
  
          this.stk20ST =  this.repStockImpRPT.CNTSTK_20ST.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_20ST.toString());
  
          this.stk20RF =  this.repStockImpRPT.CNTSTK_20OT.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_20OT.toString());
  
  
          this.stk40ST = this.repStockImpRPT.CNTSTK_40ST.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_40ST.toString());
  
  
          this.stk40HC = this.repStockImpRPT.CNTSTK_40HC.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_40HC.toString());
  
  
          this.stk40RF = this.repStockImpRPT.CNTSTK_40OT.toString();
  
          
          this.PieData.push(this.repStockImpRPT.CNTSTK_40OT.toString());
  
          this.PieLabels = ["20 ST","20 RF", "40 ST", "40 HC", "40 RF"];
  
          this.cargarGraficos();
                  
       
  
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
    
  
      /*if(this.ValidarInput(this.objrepdlRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      }*/
  
  
            // this.TieneData = true;
        
  
    }

    public CargarPie(form: NgForm) {

      if (this.EntidadSelect != undefined )
      {
        if (this.EntidadSelect.toString() != "" )
        {  this.ConsultoReporte = true; }      
      }
      else
      {return;}
  
      this.PieData = [];
      this.PieLabels = [];

      this.repStockImpRQT.IDUser = Number(localStorage.getItem("Usuario").toString());   
      this.repStockImpRQT.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString()); 
     
      this.repDetStockRealRQT.IDUSer =  Number(localStorage.getItem("Usuario").toString());   
      this.repDetStockRealRQT.IDRol =  Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());   
      this.repDetStockRealRQT.Entidad =  this.EntidadSelect.toString();
      
      this.stocktotal = 0;
      
      this.SetGrillaVisibility(false);

      return this.reportService
      .getStockReal(this.repDetStockRealRQT)
      .subscribe(
      data => {

        this.RepStockReal = data;

        if (this.RepStockReal.Data != null)
        {                              
          let listaent =JSON.parse(JSON.stringify(this.RepStockReal.Data));              
         
          for (var i = 0; i <= listaent.length-1; i++) {
            let pie = listaent[i];      
            
            this.stocktotal = this.stocktotal + pie.Cantidad;

            this.PieData.push(pie.Cantidad.toString());
            this.PieLabels.push(pie.Tipo);
          }

      

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
    



     /* return this.reportService
      .getStockImp(this.repStockImpRQT)
      .subscribe(
      data => {
        
        this.repStockImpRPT = data;         
  
        if (this.repStockImpRPT.CNTSTK_TOT != 0)
        {
         
          this.stocktotal = this.repStockImpRPT.CNTSTK_TOT.toString();        
          this.stk20 =  this.repStockImpRPT.CNTSTK_20.toString();
          this.stk40 = this.repStockImpRPT.CNTSTK_40.toString();
  
          this.stk20ST =  this.repStockImpRPT.CNTSTK_20ST.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_20ST.toString());
  
          this.stk20RF =  this.repStockImpRPT.CNTSTK_20OT.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_20OT.toString());
  
  
          this.stk40ST = this.repStockImpRPT.CNTSTK_40ST.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_40ST.toString());
  
  
          this.stk40HC = this.repStockImpRPT.CNTSTK_40HC.toString();
  
          this.PieData.push(this.repStockImpRPT.CNTSTK_40HC.toString());
  
  
          this.stk40RF = this.repStockImpRPT.CNTSTK_40OT.toString();
  
          
          this.PieData.push(this.repStockImpRPT.CNTSTK_40OT.toString());
  
          this.PieLabels = ["20 ST","20 RF", "40 ST", "40 HC", "40 RF"];
  
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
      );*/
    
  
     
        
  
    }

    public ValidarInput(param : RepDiasLibresRQT) : boolean
    {  
    if (this.NullEmpty(param.Registro) && this.NullEmpty(param.Bl) && this.NullEmpty(param.Contenedor))
    {
      return true;
    }

    //this.objFacturaRQT.Desde = this.objFacturaRQT.Desde.toLocaleDateString();
    //this.objFacturaRQT.Hasta = this.objFacturaRQT.Hasta.toLocaleDateString();

    if(this.NullEmpty(param.Registro))
    {
      this.objrepdlRQT.Registro = "";
    }

    if(this.NullEmpty(param.Bl))
    {
      this.objrepdlRQT.Bl = " ";
    }

    if(this.NullEmpty(param.Contenedor))
    {
      this.objrepdlRQT.Contenedor = " ";
    }

    return false;
  }

    public ngOnDestroy():any {
      this.SetGrillaVisibility(false);
      this.dtTrigger.unsubscribe();
    }

    
  VerDetalleGeneral()
  {
  
    this.detStockRealVacRQT.IDUSer =  Number(localStorage.getItem("Usuario").toString());   
    this.detStockRealVacRQT.IDRol =  Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());   
    this.detStockRealVacRQT.Entidad =  this.EntidadSelect.toString();
    this.detStockRealVacRQT.Tipo =  "";

    //this.CargarGrillaFinal();
    this.dtOptions.columnDefs = [
      {
          "targets": [ 8 ],
          "visible": true
        },
      {
          "targets": [ 9 ],
          "visible": true
      },
      {
        "targets": [ 10 ],
        "visible": true
      },
      {
        "targets": [ 14 ],
        "visible": true
      }
    ];

    let res = this.reportService.getStockRealDet(this.detStockRealVacRQT)

    
    res.subscribe( 
      data => { 
        this.objRepStockRealDet = data; 

        
        if (data.length >= 1)
        {
        
          this.SiCargoData = true;
         
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  
            dtInstance.destroy();
    
            this.dtTrigger.next(this.objRepStockRealDet.Data);
            this.SetGrillaVisibility(true);
          });
          //this.dtTrigger.next(this.objrepdlRPT);
          //this.SetGrillaVisibility(true);
          // this.TieneData = true;
        }
        else
        {
          this.SiCargoData = true;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

          dtInstance.destroy();
     
             this.dtTrigger.next(this.objRepStockRealDet);
             this.SetGrillaVisibility(true);
          });

          swal("No existen datos");
        }
       // this.dtTrigger.unsubscribe();
      }, 
      error => {
                swal({
          text: "Error al cargar los datos",
          icon: "error",
        }); 
        console.log("Error : ", error); 
      }
    );


  }
  
    public NullEmpty (param:any) : boolean
    {
      return !(typeof param!='undefined' && param)
    }
  
    public SetGrillaVisibility(param:boolean)
    {
      if (param) {
        document.getElementById('grilla').style.visibility = "visible";
      }
      else {
        document.getElementById('grilla').style.visibility = "hidden";
      }
    }
  
    public SiTieneData(param :boolean)
    {
      this.TieneData = false;
    }
  
  
  

  cargarGraficos():void{

    
    if (this.PieChart != null)
    { this.PieChart.destroy();}

    // this.LineChart = new Chart(ctx,{   
      
    let htmlRef = this.elementRef.nativeElement.querySelector(`#PieChart`);
   
    
  //this.PieChart = new Chart('PieChart', {
  this.PieChart = new Chart(htmlRef, {
    responsive : true,
    type: 'pie',
    data: {
        labels: this.PieLabels,
        datasets: [
          {
              fill: true,
              backgroundColor: [                 
                    'rgba(255, 122, 51, 0.68)',
                    'rgba(51, 255, 243, 0.65)',                    
                    'rgba(51, 82, 255, 0.66)',
                    'rgba(51, 255, 43, 0.65)',
                    'rgba(51, 32, 155, 0.66)'
                    
                ],

              data: this.PieData
  // Notice the borderColor 
         /*     borderColor:	['rgba(255, 122, 51, 0.68)',
              'rgba(51, 255, 243, 0.65)',
              'rgba(51, 255, 88, 0.75)',
              'rgba(51, 82, 255, 0.66)',
              'rgba(51, 255, 43, 0.65)'],
              borderWidth: [2,2,2,2,2]*/
          }
      ]
    },

    options:  {
      title: {
                display: true,
                text: 'Reporte Stock Linea ' + this.NEntidadSelect.toString(),
                               
                //text: 'Reporte Stock Linea ' + document.getElementById('listUniNeg').innerText,
                //text: 'Reporte Stock Linea ' + this.EntidadSelect.toString(),
                position: 'top'
            },
      rotation: -0.7 * Math.PI
      }

});
  }

  
  

 



  cargarGraficosCliente():void{

    this.PieChart = new Chart('barChart', {
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

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
