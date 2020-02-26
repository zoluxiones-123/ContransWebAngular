import {Routes} from "@angular/router";
import {ConsultaFacturaComponent} from "./views/dashboards/consultafactura.component";
import {consultadireccionamientocomponent} from "./views/dashboards/consultadireccionamiento.component";
import { timelinecomponent } from "./views/dashboards/timeline/timeline.component";
import {ConsultaTemperaturaComponent} from "./views/dashboards/consultemperatura.component";
import {ConsultaDetalleTemperaturaComponent} from "./views/dashboards/consuldetalletemperatura.component";
import {CartaTemperaturaComponent} from "./views/dashboards/cartatemperatura.component";

// Forms: Entrada de Datos / Mantenimientos
import {ActualizarDatosUsuarioComponent} from "./views/formularios/actualizar-datos-usuario/actualizar-datos-usuario.component";


import {RepstockComponent } from "./views/dashboards/repstock.component";
import {RepfillrateComponent} from  "./views/dashboards/repfillrate.component";
import {RepstockcsuComponent} from  "./views/dashboards/repstockcsu.component";

import {ConsultacontdlComponent} from  "./views/dashboards/consultacontdl.component";

import {FileuploadComponent} from  "./views/dashboards/fileupload.component";

import {RepstockcliComponent} from  "./views/dashboards/repstockcli.component";
import {RepestadiaComponent} from  "./views/dashboards/repestadia.component";
import {RepabandonoComponent} from  "./views/dashboards/repabandono.component";
import {RepstockDAComponent} from  "./views/dashboards/repstock-da.component";

import {RepstockDSComponent} from  "./views/dashboards/repstock-ds.component";

import {RepstockDTComponent} from  "./views/dashboards/repstock-dt.component";
import {RepstockexpComponent} from  "./views/dashboards/repstockexp.component";
import {RepstockrealComponent} from  "./views/dashboards/repstockreal.component";

import {DashboardGlobalComponent} from "./views/dashboards/dashboardglobal.component"
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
      {path: 'repstock', component: RepstockComponent},
      {path: 'repfillrate', component: RepfillrateComponent},
      {path: 'consultafactura', component: ConsultaFacturaComponent},
      {path: 'suscripcion', component: SuscripComponent},
      {path: 'repstockcsu', component: RepstockcsuComponent},
      {path: 'tracking', component: timelinecomponent},
      {path: 'consultacontdl', component: ConsultacontdlComponent},
      {path: 'consultadireccionamiento', component: consultadireccionamientocomponent},
      {path: 'repstockexpo', component: RepstockexpComponent },
      {path: 'dashboardglobal', component : DashboardGlobalComponent},
      {path: 'consultatemperatura', component: ConsultaTemperaturaComponent},
      {path: 'cartatemperatura', component: CartaTemperaturaComponent},
      {path: 'repstockreal', component: RepstockrealComponent }

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
  {
    path: '**',  
    redirectTo: 'login'
  }
];
