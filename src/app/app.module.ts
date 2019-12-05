import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";
import { AppviewsModule } from "./views/appviews/appviews.module";
import { FormulariosModule } from "./views/formularios/formularios.module";

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { RepfillrateComponent } from './views/dashboards/repfillrate.component';
import { SuscripComponent } from './views/appviews/suscrip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule, MatAutocompleteModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
//import { ActualizarDatosUsuarioComponent } from './actualizar-datos-usuario/actualizar-datos-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    RepfillrateComponent,
    SuscripComponent,
    /*ActualizarDatosUsuarioComponent*/
   
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
    MatInputModule,
    NgxMatSelectSearchModule
  
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
