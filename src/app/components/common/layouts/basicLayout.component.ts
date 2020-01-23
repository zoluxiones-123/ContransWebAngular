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
  }

  public ngOnInit():any {
    detectBody();
  }

  public onResize(){
    detectBody();
  }

  

}
