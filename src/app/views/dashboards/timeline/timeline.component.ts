import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReportService } from '../../../services/report.service';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import { Input } from '@angular/compiler/src/core';



@Component({
  selector: 'timeline',
  templateUrl: 'timeline.template.html',
  styleUrls : ['./timeline.component.css']
})
export class timelinecomponent { 

  Respuesta:any;
  ContransList : Array<any>;
  TMList : Array<any>;
  IDUserObj; 
  IDRolObj; 
  ContenedorObj;  
  contenedorFormControl = new FormControl('');

  constructor(private reportService: ReportService) { 
  }

  ngOnInit(){
    this.IDUserObj = localStorage.getItem("Usuario").toString();
    this.IDRolObj = localStorage.getItem("RolEmpUsuaCodigoDefault").toString();
    this.ContenedorObj = "";
    this.generarTimeline();
  }

  ngAfterContentInit(){

  }

  public generarTimeline() {
    console.log(this.IDUserObj,this.IDRolObj,this.ContenedorObj); //    <------------
    this.reportService.getretiroestado(this.IDUserObj,this.IDRolObj,this.ContenedorObj).subscribe(
     data => {
     this.ContransList = data.Contrans;
     this.TMList = data.TM;
     });
  }

  public actualizarTimeline() {
    let obj = document.getElementById("ContainerInput") as object;
    this.ContenedorObj = obj["value"];
    // ContenedorObj = (document.getElementById("ContainerInput") as HTMLElement).valu;
    this.generarTimeline();
  }
  
}

