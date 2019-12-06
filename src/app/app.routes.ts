import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
// import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
// import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
// import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";
import {ConsultaFacturaComponent} from "./views/dashboards/consultafactura.component";

// Forms: Entrada de Datos / Mantenimientos
import {ActualizarDatosUsuarioComponent} from "./views/formularios/actualizar-datos-usuario/actualizar-datos-usuario.component";


import {RepstockComponent } from "./views/dashboards/repstock.component";
import {RepfillrateComponent} from  "./views/dashboards/repfillrate.component";


import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";
import {SuscripComponent} from "./views/appviews/suscrip.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {topnavigationlayout} from "./components/common/layouts/topnavigationlayout.component";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      // {path: 'dashboard3', component: Dashboard3Component},
      // {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component},
      {path: 'repstock', component: RepstockComponent},
      {path: 'repfillrate', component: RepfillrateComponent},
      {path: 'consultafactura', component: ConsultaFacturaComponent},
      {path: 'suscripcion', component: SuscripComponent}

    ]
  },
  // App views
  {
    path: 'forms', component: BasicLayoutComponent,
    children: [
      {path: 'ActDatosUsuario', component: ActualizarDatosUsuarioComponent}
    ]
  },

  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  // Handle all other routes
  {path: '**',  redirectTo: 'login'}
];
