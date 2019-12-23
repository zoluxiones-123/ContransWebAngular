import { Component } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@Component({
  selector: 'timeline',
  templateUrl: 'timeline.template.html',
  styleUrls : ['./timeline.component.css']
})
export class timelinecomponent { 

  public TieneIntegral:boolean = true;
  public msjcont : string = 
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
  "Ctn 14: SUDU1847236 / 09-12-2019 10:04 ";
}
