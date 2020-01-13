import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataSetItem } from '../../models/datasetitem';
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Chart } from 'chart.js'
import { AuthService } from 'app/services/auth.service';
import { RepStockCSURQT, RepStockCSURQTDet } from "app/models/rep_stockCsuRqt";
import { RegistroStockCSU, RegistroStockCSUDet } from "app/models/reg_stockcsu";

@Component({
  selector: 'app-repstock-ds',
  templateUrl: './repstock-ds.component.html',
  styleUrls: ['./repstock-ds.component.css']
})

export class RepstockDSComponent implements OnInit {
  myRegistroDS = new FormControl();
  registrosDS: string[] = [];
  filteredRegDS: Observable < string[] > ;
  priregDS: string;
  FechasDS: Array < string > ;
  DiasAlmacenDS: Array < string > ;
  DescripcionDS = [];
  CantidadDS = [];
  BGColorDS = [];
  BDColorDS = [];
  rgb: number;
  bgrColor: string;
  bdrColor: string;
  BarChartCsu: Chart;
  BarChartDS: Chart;
  BarChartDT: Chart;

  constructor(private authService: AuthService, private authServiceDS: AuthService, private router: Router) {
    this.FechasDS = [];
    this.DiasAlmacenDS = [];
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

  private respStockCsuDS: RegistroStockCSU = {
    Cod: -1,
    Msj: '',
    Data: []
  };

  private respStockCsuDT: RegistroStockCSU = {
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

  ngOnInit() {
    
    if (localStorage.getItem("Usuario") == null) {
      this.router.navigate(['/login']);
  }

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

  cargarRegistrosDS(): void {
    this.authServiceDS.getRegStockCSU(this.reqStockCsuDS)
      .subscribe(
        data => {
          this.respStockCsuDS = data;
          if (this.respStockCsuDS.Data != null) {
            let listaregistrosDS = JSON.parse(JSON.stringify(this.respStockCsuDS.Data));
            for (var i = 0; i <= listaregistrosDS.length - 1; i++) {
              let regi = listaregistrosDS[i];
              this.registrosDS.push(regi.Registro.toString());
              if (i == 0) {
                this.priregDS = regi.Registro.toString();
                this.reqStockCsuDet.Almacen = "DS";
                this.reqStockCsuDet.Registro = this.priregDS;
                this.cargarGraficosCsu("DS");
                this.myRegistroDS.setValue(this.priregDS);
              }
            }
          } else {
            this.errorgen = true;
            this.errormsj = this.respStockCsuDS.Msj;
          }
        },
        error => {
          this.onIsError();
          console.log("Error");
        }
      );
  }

  cargarGraficosCsu(Almacen: string): void {
    this.authService
      .getRegStockCSUDet(this.reqStockCsuDet)
      .subscribe(
        data => {
          this.respStockCsuDet = data;
          if (this.respStockCsuDet.Data != null) {
            let lista = JSON.parse(JSON.stringify(this.respStockCsuDet.Data));
            this.DescripcionDS = [];
            this.CantidadDS = [];
            this.BGColorDS = [];
            this.BDColorDS = [];
            this.dsitems = [];
            this.dsitemsDS = [];
            this.dsitemsDT = [];
            this.rgb = 88;
            if (Almacen == "DS") {
              this.FechasDS = [];
              this.DiasAlmacenDS = [];
            }
            for (var i = 0; i <= lista.length - 1; i++) {
              let reg = lista[i];
              if (Almacen == "DS") {
                this.FechasDS.push(reg.FechaIngreso.toString());
                this.DiasAlmacenDS.push(reg.DiasAlma.toString());
                this.DescripcionDS.push(reg.Decripcion.toString());
                this.CantidadDS.push(reg.Cantidad.toString());
              }
              let rgbc = Math.floor(Math.random() * 555) + 50;
              this.rgb = rgbc;
              let rgbr = Math.floor(Math.random() * 155) + 50;
              this.bgrColor = 'rgba(51, ' + rgbr.toString() + ', ' + this.rgb.toString() + ',0.75)';
              this.bdrColor = 'rgba(51, 255,' + this.rgb.toString() + ', 1)';
              if (Almacen == "DS") {
                this.BGColorDS.push(this.bgrColor);
                this.BDColorDS.push(this.bdrColor);
                let dtitemds = new DataSetItem(
                  reg.Decripcion.toString(), this.bgrColor, this.bdrColor, [reg.Cantidad.toString()]
                )
                this.dsitemsDS.push(dtitemds);
              }
            }
            if (Almacen == "DS") {
              this.cargarGraficosDSF();
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

  private _filterDS(valueds: string): string[] {
    const filterValueds = valueds.toLowerCase();
    //this.registrosDS = JSON.parse(localStorage.getItem("ListaDS"));
    return this.registrosDS.filter(optionds => optionds.toLowerCase().indexOf(filterValueds) === 0);
  }

  cargarGraficosDSF(): void {
    if (this.BarChartDS != null) {
      this.BarChartDS.destroy();
    }
    this.BarChartDS = new Chart('barChartDS', {
      responsive: true,
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
          text: "Carga Stock(DS)",
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
              return "Fecha Ingreso: " + this.FechasDS[tooltipItem[0].index].toString() + " \n" +
                "Dias de Almacen: " + this.DiasAlmacenDS[tooltipItem[0].index].toString();
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
