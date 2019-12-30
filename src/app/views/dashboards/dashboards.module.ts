import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import { DataTablesModule } from 'angular-datatables';

import {Dashboard1Component} from "./dashboard1.component";
import {Dashboard2Component} from "./dashboard2.component";
// import {Dashboard3Component} from "./dashboard3.component";
// import {Dashboard4Component} from "./dashboard4.component";
// import {Dashboard41Component} from "./dashboard41.component";
import {Dashboard5Component} from "./dashboard5.component";
import {ConsultaFacturaComponent} from "./consultafactura.component";
import {ConsultacontdlComponent} from "./consultacontdl.component";


// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../components/charts/flotChart';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule, TooltipModule } from "ngx-bootstrap";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { timelinecomponent } from "./timeline/timeline.component";
defineLocale('es', esLocale);



@NgModule({
  declarations: [Dashboard1Component,Dashboard2Component,Dashboard5Component,ConsultaFacturaComponent, timelinecomponent,ConsultacontdlComponent],
  imports     : [BrowserModule,ChartsModule, FlotModule,IboxtoolsModule,PeityModule,SparklineModule,JVectorMapModule,DataTablesModule, BrowserAnimationsModule, BsDatepickerModule.forRoot(), FormsModule, TooltipModule.forRoot()],
  exports     : [Dashboard1Component,Dashboard2Component,Dashboard5Component,ConsultaFacturaComponent,ConsultacontdlComponent],
})

export class DashboardsModule {}
