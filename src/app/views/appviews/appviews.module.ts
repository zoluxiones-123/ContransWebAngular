import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthService } from "app/services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { RepfillrateComponent } from "../dashboards/repfillrate.component";
import { RepstockComponent } from "../dashboards/repstock.component";

import {DataTablesModule } from 'angular-datatables';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { MatSelectModule, MatAutocompleteModule, MatInputModule, MatDialogModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    RepfillrateComponent,
    RepstockComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxSpinnerModule
  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    RepfillrateComponent,
    RepstockComponent
  ],
  providers: [
    AuthService,
  ]
})

export class AppviewsModule {
}
