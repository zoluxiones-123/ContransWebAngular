import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';
import { AngularDraggableModule } from 'angular2-draggable';

// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";
import { AppviewsModule } from "./views/appviews/appviews.module";
import { FormulariosModule } from "./views/formularios/formularios.module";

// App modules/components
import { topnavigationlayout } from './components/common/layouts/topnavigationlayout.component';
import { LayoutsModule } from "./components/common/layouts/layouts.module";

import { SuscripComponent } from './views/appviews/suscrip.component';
import { RegdireccComponent } from './views/dashboards/regdirecc.component';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule, MatAutocompleteModule, MatListModule, MatInputModule, MatDialogModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { ContraseniaComponent } from './views/appviews/contrasenia.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RepstockcsuComponent } from './views/dashboards/repstockcsu.component';
import { FileuploadComponent } from './views/dashboards/fileupload.component';
import { RepstockcliComponent } from './views/dashboards/repstockcli.component';
import { RepestadiaComponent } from './views/dashboards/repestadia.component';
import { RepabandonoComponent } from './views/dashboards/repabandono.component';

import {RepstockDAComponent} from "./views/dashboards/repstock-da.component";
import { RepstockDSComponent } from './views/dashboards/repstock-ds.component';
import { RepstockDTComponent } from './views/dashboards/repstock-dt.component';
import { RepstockexpComponent } from './views/dashboards/repstockexp.component';


import { DashboardGlobalComponent } from './views/dashboards/dashboardglobal.component';
import { IboxtoolsModule } from './components/common/iboxtools/iboxtools.module';
import { RepfillratetabComponent } from './views/dashboards/repfillratetab.component';
import { RepfillrategrafComponent } from './views/dashboards/repfillrategraf.component';


import { DragulaModule } from 'ng2-dragula';
import { RepstockexpocliComponent } from './views/dashboards/repstockexpocli.component';
import { RepstockexpestComponent } from './views/dashboards/repstockexpest.component';

@NgModule({
  declarations: [
    AppComponent,
    SuscripComponent,
    ContraseniaComponent,
    RepstockcsuComponent,
    FileuploadComponent,
    RepstockcliComponent,
    RepestadiaComponent,
    RepabandonoComponent,
    RepstockDSComponent,
    RepstockDTComponent,
    RepstockDAComponent,
    RegdireccComponent,
    RepstockexpComponent,
    DashboardGlobalComponent,
    RepfillratetabComponent,
    RepfillrategrafComponent,
    RepstockexpocliComponent,
    RepstockexpestComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    FormulariosModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    ModalModule.forRoot(),
    MatDialogModule,
    BsDatepickerModule.forRoot(),
    AngularDraggableModule,
    IboxtoolsModule,
    DragulaModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [SuscripComponent, ContraseniaComponent, RegdireccComponent]
  
  
})
export class AppModule { }
