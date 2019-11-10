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


@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  exports: [
    StarterViewComponent,
    LoginComponent
  ],
  providers: [
    AuthService,

  ]
})

export class AppviewsModule {
}
