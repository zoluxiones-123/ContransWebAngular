import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';
import { RepestadiaComponent } from './repestadia.component';
import { RepstockcliComponent } from './repstockcli.component';
import { RepstockDAComponent } from './repstock-da.component';
import { RepabandonoComponent } from './repabandono.component';
import { RepfillrateComponent } from './repfillrate.component';
import { RepstockDSComponent } from './repstock-ds.component';
import { RepstockDTComponent } from './repstock-dt.component';
import { element } from 'protractor';
import { elementEnd } from '@angular/core/src/render3/instructions';
import { ReportService } from '../../services/report.service';
import { RepfillratetabComponent } from './repfillratetab.component';
import { RepfillrategrafComponent  } from './repfillrategraf.component';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { ContraseniaComponent } from '../appviews/contrasenia.component';
import { RepstockexpestComponent } from './repstockexpest.component';
import { RepstockexpocliComponent } from './repstockexpocli.component';
declare var jQuery : any;
declare var $ : any;

@Component({
  selector: 'dashboardglobal',
  templateUrl: './dashboardglobal.component.html',
  styleUrls : ['./dashboardglobal.component.css']
})


export class DashboardGlobalComponent {

  graphs : any;
  EsCargado = true;
  subs = new Subscription();


  constructor (private reportService: ReportService, private dialog : MatDialog,
    private dialogc : MatDialog, private dragulaService: DragulaService) {   
      this.cargarGraficos();
      if(localStorage.getItem("CambiaContrasenia") == "1"){
        this.onCambioContrasenia();
      }

    this.subs.add(this.dragulaService.drop("graficos")
      .subscribe(({ name, el, source }) => {
      this.EnviarOrdenGraph();
      })
    );
  }

  onCambioContrasenia()
  {
    const dialogConfigC = new MatDialogConfig();
    dialogConfigC.disableClose = true;
    dialogConfigC.autoFocus = true;
    dialogConfigC.width = "40%";
    
    localStorage.setItem("CambiaContrasenia","1");
    this.dialogc.open(ContraseniaComponent, dialogConfigC);


    //this.openModal(this.contraseniamod);

  }

  cargarGraficos() {
    this.graphs = JSON.parse(localStorage.getItem("Graficos"));
    this.graphs.forEach( element => {
      switch( element.Nombre ) {        
        case "repstockcli" : {
          element.component = RepstockcliComponent;
          break;
        }
        case "repestadia" : {
          element.component = RepestadiaComponent;
          break;
        }
        case "repabandono" : {
          element.component = RepabandonoComponent;
          break;
        }
        case "repfillrate" : {
          element.component = RepfillrategrafComponent;
          break;
        }
        case "repstock-da" : {
          element.component = RepstockDAComponent;
          break;
        }
        case "repstock-ds" : {
          element.component = RepstockDSComponent;
          break;
        }
        case "repstock-dt" : {
          element.component = RepstockDTComponent;
          break;
        }
        case "repfillratetab" : {
          element.component = RepfillratetabComponent;
          break;
        }
        case "RepstockexpestComponent" : {
          element.component = RepstockexpestComponent;
          break;
        }
        case "RepstockexpocliComponent" : {
          element.component = RepstockexpocliComponent;
          break;
        }
        
        default : {
          console.log("No se encontro grafico para ", element.name);
          break;
        }
      }
    });
  }

  ngOnInit() {

  }

  abrirMenu () {
    let elemns = document.getElementsByClassName("theme-config-box")[0];
    elemns.classList.toggle("show");
  }
  
  Ocultar (namegraph:string) {
    this.graphs.forEach(element => {
      if (element.Nombre == namegraph){
        element.Visible = !element.Visible;
        this.EnviarServicio(element);
      }
    })
  }

  EnviarServicio(element :any){

    this.graphs.forEach(item=>{
      if(item.Nombre == element.Nombre){
        item.Visible = element.Visible;
      }
    });

    localStorage.setItem("Grafico",JSON.stringify(this.graphs));

    let enviarelement : any = {
      CodUsuario : localStorage.getItem("Usuario").toString(),
      CodRol : localStorage.getItem("RolEmpUsuaCodigoDefault").toString(),
      DashboardsCodigo : element.Codigo,
      Visible : element.Visible
    };

    this.reportService.setGraficos(enviarelement).subscribe(data => {
      if(data.Cod != 0){
        console.log("Error en guardar el grafico ", element.Nombre);
      }
    })

  }

  EnviarOrdenGraph (){

    let tempGraph = new Array<any>();
    let graphsINTERNO = this.graphs;
    graphsINTERNO.forEach(element =>{
      let tempelement = {
        Codigo : element.Codigo,
        Nombre : element.Nombre,
        Titulo : element.Titulo,
        Visible : element.Visible
      };
      tempGraph.push(tempelement);
    });
    let enviarelement = {
      IDUser : localStorage.getItem("Usuario").toString(),
      IDRol : localStorage.getItem("RolEmpUsuaCodigoDefault").toString(),
      Grafico : tempGraph
    }
    this.reportService.setOrdenGraficos(enviarelement).subscribe(data=>{
      if(data.Cod != 0){
        console.log("Error en guardar orden del grafico ");
      }
    });
  }

}