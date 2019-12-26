import { Component } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReportService } from '../../../services/report.service';



@Component({
  selector: 'timeline',
  templateUrl: 'timeline.template.html',
  styleUrls : ['./timeline.component.css']
})
export class timelinecomponent { 

  ContransList : Array<any>;
  TMList : Array<any>;
  TieneIntegral:boolean;


  constructor(private reportService: ReportService) { 
    let IDUserObj = localStorage.getItem("IDUser");
    let IDRolObj = localStorage.getItem("IDRol");
    let ContenedorObj = "";
    this.reportService.getretiroestado(IDUserObj,IDRolObj,ContenedorObj).subscribe(data => {
      this.ContransList = data.Contrans;
      this.TMList = data.TM;
      this.TieneIntegral = this.TMList.length > 0;
    });


   }

  lista : Array<any> = [
    {
      msjcont : 
      "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " + 
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 " +
      "Ctn 12: SUDU1847236 / 09-12-2019 23:04 " +
      "Ctn 13: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 " +
      "Ctn 12: SUDU1847236 / 09-12-2019 23:04 " +
      "Ctn 13: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 " +
      "Ctn 12: SUDU1847236 / 09-12-2019 23:04 " +
      "Ctn 13: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " + 
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 " +
      "Ctn 12: SUDU1847236 / 09-12-2019 23:04 " +
      "Ctn 13: SUDU1847236 / 09-12-2019 10:04 " +
      "Ctn 14: SUDU1847236 / 09-12-2019 10:04 ",
      numbertrucks : "16",
      iconStage : "fa fa-home",
      nombreStage : "Ingreso Contrans",
      iconCarrito : "fa fa-truck"
    },
    {
      msjcont : "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " + 
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 ",
      numbertrucks : "2",
      iconStage : "fa fa-check-square",
      nombreStage : "Permiso Salida",
      iconCarrito : "fa fa-truck"
    },
    {
      msjcont : "Ctn 01: SUDU1847236 / 09-12-2019 10:04 " + 
      "Ctn 11: SUDU1847236 / 09-12-2019 20:04 " +
      "Ctn 12: SUDU1847236 / 09-12-2019 23:04 ",
      numbertrucks : "3",
      iconStage : "fa fa-clock-o",
      nombreStage : "Cita de Salida",
      iconCarrito : "fa fa-truck"
    },
    {
      msjcont : "",
      numbertrucks : "",
      iconStage : "fa fa-bus",
      nombreStage : "Ingreso Transporte",
      iconCarrito : "fa fa-truck vacio"
    }
  ]



  
}

