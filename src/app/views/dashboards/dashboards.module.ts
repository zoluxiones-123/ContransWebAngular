import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import { DataTablesModule } from 'angular-datatables';

import {Dashboard1Component} from "./dashboard1.component";
import {Dashboard2Component} from "./dashboard2.component";
import {Dashboard3Component} from "./dashboard3.component";
import {Dashboard4Component} from "./dashboard4.component";
import {Dashboard41Component} from "./dashboard41.component";
import {Dashboard5Component} from "./dashboard5.component";
import {RepstockComponent} from "./repstock.component";
import {ConsultaFacturaComponent} from "./consultafactura.component";

// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../components/charts/flotChart';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap";
import { FormsModule } from "@angular/forms";

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { es } from 'ngx-bootstrap/locale';

defineLocale('es', es);



@NgModule({
  declarations: [Dashboard1Component,Dashboard2Component,Dashboard3Component,Dashboard4Component,Dashboard41Component,Dashboard5Component,RepstockComponent,ConsultaFacturaComponent],
  imports     : [BrowserModule,ChartsModule, FlotModule,IboxtoolsModule,PeityModule,SparklineModule,JVectorMapModule,DataTablesModule, BrowserAnimationsModule, BsDatepickerModule.forRoot(), FormsModule],
  exports     : [Dashboard1Component,Dashboard2Component,Dashboard3Component,Dashboard4Component,Dashboard41Component,Dashboard5Component,ConsultaFacturaComponent],
})

export class DashboardsModule {}
