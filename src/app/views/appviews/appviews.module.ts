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
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";



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
