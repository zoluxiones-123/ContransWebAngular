import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { Component, OnInit, Inject,OnDestroy,  ViewChild,ViewChildren,QueryList, ElementRef,AfterViewInit  } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { TemperaturaDetalleRQT,TemperaturaDetalleRPT,TemperaturaDataRPT,TemperaturaVDRPT} from '../../models/Temperatura';
import swal from 'sweetalert';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';


@Component({
    selector: 'cartatemperaturaaviso.component',
    templateUrl: 'cartatemperaturaaviso.component.html',
  })
  export class CartaTemperaturaAvisoComponent  implements  OnInit{
  
 MsgCabecera: string;

      constructor(public dialogRef : MatDialogRef<CartaTemperaturaAvisoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private router: Router){
      }
    

      public ngOnInit():any {      

        if (localStorage.getItem("Usuario") == null)
           {this.router.navigate(['/login']);}

           this.MsgCabecera = localStorage.getItem("MsgCabecera");
    
        }
      
        
/*     onNoClick(): void {
      this.dialogRef.close();
    } */
    public cerrarPopup(){
      this.dialogRef.close();
      return false;
    }
  }
