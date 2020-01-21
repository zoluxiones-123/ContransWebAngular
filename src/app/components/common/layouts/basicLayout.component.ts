import { Component } from '@angular/core';
import { detectBody } from '../../../app.helpers';
import { ReportService } from '../../../services/report.service';


declare var jQuery:any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent {

  constructor(private reportService: ReportService) {
    this.CargarDatosIniciales();
  }

  public ngOnInit():any {
    detectBody();
  }

  public onResize(){
    detectBody();
  }

  CargarDatosIniciales() {
    this.reportService.getMenu(localStorage.getItem("Usuario").toString(),localStorage.getItem("RolEmpUsuaCodigoDefault").toString()).subscribe(data=>{
      localStorage.setItem("Menu",JSON.stringify(data));
    });

    this.reportService.getGraficos(localStorage.getItem("Usuario").toString(),localStorage.getItem("RolEmpUsuaCodigoDefault").toString()).subscribe(data=>{
      localStorage.setItem("Graficos",JSON.stringify(data.Data));
    });
  }

}
