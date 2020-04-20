
import {GenerarsolpermisoComponent} from './generarsolpermiso.component';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { CartaTemperaturaRQT,AnularCerrarCartaTemperaturaRQT,AnularCerrarCartaTemperaturaRPT,CartaTemperaturaRPT,ListaEstado} from '../../models/Temperatura';
import { ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo,ConsultaRefrendoExpoRQT,ConsultaRefrendoExpoRPT}  from '../../models/RefrendoExpo';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { UniNegocio,UnidadNegocio}  from '../../models/Factura';
import { LiquidacionBRQT,LiquidacionBRPT,LiquidacionCont}  from '../../models/Liquidacion';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-consultasolpermisos',
  templateUrl: './consultasolpermisos.component.html',
  styleUrls: ['./consultasolpermisos.component.css']
})
export class ConsultasolpermisosComponent implements OnInit {

  constructor(private reportService: ReportService,private dialog : MatDialog, private router: Router) { }

  ngOnInit() {
  }

  GenerarSolicitud()
  {
    const dialogRef = this.dialog.open(GenerarsolpermisoComponent,{
      disableClose: true,
      autoFocus: true,
      width: "700px",
      height: "100%"
    });
    
  }

}
