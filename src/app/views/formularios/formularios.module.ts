import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {ActualizarDatosUsuarioComponent} from "./actualizar-datos-usuario/actualizar-datos-usuario.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthService } from "app/services/auth.service";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    ActualizarDatosUsuarioComponent
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
    ActualizarDatosUsuarioComponent
  ],
  providers: [
    AuthService,

  ]
})

export class FormulariosModule {
}
