import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {DataTablesModule } from 'angular-datatables';
import {ConsultaFacturaComponent} from "./consultafactura.component";
import {ConsultacitasComponent } from './consultacitas.component';
import {ConsultacontdlComponent} from "./consultacontdl.component";
import {consultadireccionamientocomponent} from "./consultadireccionamiento.component";


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
import { registerContentQuery } from "@angular/core/src/render3/instructions";

import { RepstockDAComponent } from "./repstock-da.component";
import { RepstockcliComponent } from "./repstockcli.component";
import { RepestadiaComponent } from "./repestadia.component";
import { RepabandonoComponent } from "./repabandono.component";
import { RepfillrateComponent } from "./repfillrate.component";
import { RepstockDSComponent } from "./repstock-ds.component";
import { RepstockDTComponent } from "./repstock-dt.component";
import { RepfillratetabComponent } from "./repfillratetab.component";
import { RepfillrategrafComponent } from "./repfillrategraf.component";
import { RepstockexpocliComponent } from "./repstockexpocli.component";
import { RepstockexpestComponent } from "./repstockexpest.component";
import { ConsultaTemperaturaComponent } from './consultemperatura.component';
import { CartaTemperaturaComponent } from './cartatemperatura.component';
import { RepstockrealComponent } from "./repstockreal.component";



defineLocale('es', esLocale);



@NgModule({
  declarations: [ConsultaFacturaComponent, ConsultacitasComponent, ConsultaTemperaturaComponent,CartaTemperaturaComponent,timelinecomponent,ConsultacontdlComponent, RepstockrealComponent, consultadireccionamientocomponent],
  imports     : [BrowserModule,ChartsModule,  FlotModule,IboxtoolsModule,PeityModule,SparklineModule,JVectorMapModule,
    DataTablesModule, BrowserAnimationsModule, BsDatepickerModule.forRoot(), FormsModule, 
    TooltipModule.forRoot()],
  exports     : [ConsultaFacturaComponent, ConsultacitasComponent, ConsultacontdlComponent,ConsultaTemperaturaComponent,CartaTemperaturaComponent],
  entryComponents : [RepstockcliComponent,RepestadiaComponent,RepabandonoComponent,RepfillrateComponent,RepstockDAComponent,RepstockDSComponent,RepstockDTComponent,RepfillratetabComponent, RepfillrategrafComponent, RepstockexpocliComponent, RepstockexpestComponent]
 
})

export class DashboardsModule {}
