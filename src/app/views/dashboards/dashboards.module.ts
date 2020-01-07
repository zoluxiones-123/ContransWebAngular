import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import { DataTablesModule } from 'angular-datatables';
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
  declarations: [ConsultaFacturaComponent, timelinecomponent,ConsultacontdlComponent],
  imports     : [BrowserModule,ChartsModule, FlotModule,IboxtoolsModule,PeityModule,SparklineModule,JVectorMapModule,DataTablesModule, BrowserAnimationsModule, BsDatepickerModule.forRoot(), FormsModule, TooltipModule.forRoot()],
  exports     : [ConsultaFacturaComponent,ConsultacontdlComponent],
})

export class DashboardsModule {}
