import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {BsDropdownModule} from 'ngx-bootstrap';

import {BasicLayoutComponent} from "./basicLayout.component";
import {BlankLayoutComponent} from "./blankLayout.component";
import {topnavigationlayout} from "./topnavigationlayout.component";

import {NavigationComponent} from "./../navigation/navigation.component";
import {FooterComponent} from "./../footer/footer.component";
import {TopNavbarComponent} from "./../topnavbar/topnavbar.component";


@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    topnavigationlayout
  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    topnavigationlayout,
    TopNavbarComponent
    ],
})

export class LayoutsModule {}
