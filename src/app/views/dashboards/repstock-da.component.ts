import { Component, OnInit, Inject } from '@angular/core';
import { DataSetItem } from '../../models/datasetitem';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Chart } from 'chart.js'
import { AuthService } from 'app/services/auth.service';
import { RepStockCSURQT, RepStockCSURQTDet } from "app/models/rep_stockCsuRqt";
import { RegistroStockCSU, RegistroStockCSUDet } from "app/models/reg_stockcsu";

@Component({
  selector: 'app-repstock-da',
  templateUrl: './repstock-da.component.html',
  styleUrls: ['./repstock-da.component.css']
})
export class RepstockDAComponent implements OnInit {
  myRegistro = new FormControl();
  registros: string[] = [];
  filteredReg: Observable<string[]>;
  priregDA: string;
  Fechas: Array<string>;
  DiasAlmacen: Array<string>;
  Descripcion = [];
  Cantidad = [];
  BGColor = [];
  BDColor = [];
  rgb: number;
  bgrColor: string;
  bdrColor: string;
  BarChartCsu: Chart;

  constructor(private authService: AuthService, private authServiceDS: AuthService, private router: Router) {
    this.Fechas = [];
    this.DiasAlmacen = [];
  }
  private reqStockCsu: RepStockCSURQT = {
    IDUser: 10,
    IDRol: 1,
    Almacen: 'DA'
  };
  private reqStockCsuDS: RepStockCSURQT = {
    IDUser: 10,
    IDRol: 1,
    Almacen: 'DS'
  };
  private reqStockCsuDT: RepStockCSURQT = {
    IDUser: 10,
    IDRol: 1,
    Almacen: 'DT'
  };
  private reqStockCsuDet: RepStockCSURQTDet = {
    IDUser: 10,
    IDRol: 1,
    Almacen: 'DA',
    Registro: '294507'
  };
  public isError = false;
  public errorgen = true;
  public errormsj = '';
  private respStockCsu: RegistroStockCSU = {
    Cod: -1,
    Msj: '',
    Data: []
  };
  private respStockCsuDet: RegistroStockCSUDet = {
    Registro: '',
    Almacen: '',
    Total: 0,
    Data: []
  };
  dsitems = [];
  dsitemsDS = [];
  dsitemsDT = [];
  chartList = [5, 6, 7, 8];

  ngOnInit() {
    if (localStorage.getItem("Usuario") == null) {
      this.router.navigate(['/login']);
    }
    this.reqStockCsu.IDUser = Number(localStorage.getItem("Usuario").toString());
    this.reqStockCsu.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
    this.cargarRegistrosDA();
    this.reqStockCsuDet.IDUser = Number(localStorage.getItem("Usuario").toString());
    this.reqStockCsuDet.IDRol = Number(localStorage.getItem("RolEmpUsuaCodigoDefault").toString());
    this.reqStockCsu.Almacen = "DA";
    this.filteredReg = this.myRegistro.valueChanges.pipe(startWith(''),map(value => this._filter(value))
    );
  }

  cargarRegistrosDA(): void {
    this.authService
      .getRegStockCSU(this.reqStockCsu)
      .subscribe(
        data => {
          this.respStockCsu = data;
          //if (this.respStockCsu.Data != null) {            
          if (this.respStockCsu.Data.length > 1 ) {            
            let listaregistros = JSON.parse(JSON.stringify(this.respStockCsu.Data));
            for (var i = 0; i <= listaregistros.length - 1; i++) {
              let regi = listaregistros[i];
              if (i == 0) {
                this.priregDA = regi.Registro.toString();
                this.reqStockCsuDet.Almacen = "DA";
                this.reqStockCsuDet.Registro = this.priregDA;
                this.cargarGraficosCsu("DA");
                this.myRegistro.setValue(this.priregDA);
              }
              this.registros.push(regi.Registro.toString());
            }
          } else {
            this.errorgen = true;
            this.errormsj = this.respStockCsu.Msj;
          }
        },
        error => {
          this.onIsError();
          console.log("Error");
        }
      );
  }

  public ChangingRegistro(param: any) {
    this.reqStockCsuDet.Almacen = "DA";
    this.reqStockCsuDet.Registro = param.option.value.toString();
    this.cargarGraficosCsu("DA");
  }

  cargarGraficosCsu(Almacen: string): void {
    this.authService
      .getRegStockCSUDet(this.reqStockCsuDet)
      .subscribe(
        data => {
          this.respStockCsuDet = data;
          if (this.respStockCsuDet.Data != null) {
            let lista = JSON.parse(JSON.stringify(this.respStockCsuDet.Data));
            this.Descripcion = [];
            this.Cantidad = [];
            this.BGColor = [];
            this.BDColor = [];
            this.dsitems = [];
            this.dsitemsDS = [];
            this.dsitemsDT = [];
            this.rgb = 88;
            if (Almacen == "DA") {
              this.Fechas = [];
              this.DiasAlmacen = [];
            }
            for (var i = 0; i <= lista.length - 1; i++) {
              let reg = lista[i];
              if (Almacen == "DA") {
                this.Fechas.push(reg.FechaIngreso.toString());
                this.DiasAlmacen.push(reg.DiasAlma.toString());
                this.Descripcion.push(reg.Decripcion.toString());
                this.Cantidad.push(reg.Cantidad.toString());
              }
              let rgbc = Math.floor(Math.random() * 555) + 50;
              this.rgb = rgbc;
              let rgbr = Math.floor(Math.random() * 155) + 50;
              this.bgrColor = 'rgba(51, ' + rgbr.toString() + ', ' + this.rgb.toString() + ',0.75)';
              this.bdrColor = 'rgba(51, 255,' + this.rgb.toString() + ', 1)';
              if (Almacen == "DA") {
                this.BGColor.push(this.bgrColor);
                this.BDColor.push(this.bdrColor);
                let dtitem = new DataSetItem(
                  reg.Decripcion.toString(), this.bgrColor, this.bdrColor, [reg.Cantidad.toString()]
                )
                this.dsitems.push(dtitem);
              }
            }
            if (Almacen == "DA") {
              this.cargarGraficosDAF();
            }
          } else {
            this.errorgen = true;
            this.errormsj = this.respStockCsu.Msj;
          }
        },
        error => {
          this.onIsError();
          console.log("Error");
        }
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.registros.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  cargarGraficosDAF(): void {
    if (this.BarChartCsu != null) {
      this.BarChartCsu.destroy();
    }
    this.BarChartCsu = new Chart('barChartDA', {
      responsive: false,
      type: 'bar',
      data: {
        //labels: this.XLabels,
        labels: ['Articulos'],
        datasets: this.dsitems
      },
      options: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            fontColor: "#000080",
          }
        },
        title: {
          text: "Carga Stock(DA)",
          display: true
        },
        scales: {
          xAxes: [{
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Articulos'
            },
            barPercentage: 0.1,
            gridLines: {
              display: false
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
              return "Articulo: " + this.Descripcion[tooltipItem[0].index].toString() + " \n" +
                "Fecha Ingreso: " + this.Fechas[tooltipItem[0].index].toString() + " \n" +
                "Dias de Almacen: " + this.DiasAlmacen[tooltipItem[0].index].toString();
            },
            label: function (tooltipItem, data) {
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