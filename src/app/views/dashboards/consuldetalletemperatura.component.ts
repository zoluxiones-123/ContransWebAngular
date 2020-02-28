import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { Component, OnInit, Inject,OnDestroy,  ViewChild,ViewChildren,QueryList, ElementRef,AfterViewInit  } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { TemperaturaDetalleRQT,TemperaturaDetalleRPT,TemperaturaDataRPT,TemperaturaVDRPT} from '../../models/Temperatura';
import { MatDialog, MatDialogConfig} from '@angular/material';
import swal from 'sweetalert';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';


@Component({
    selector: 'consuldetalletemperatura',
    templateUrl: 'consuldetalletemperatura.template.html'
  })

  export class ConsultaDetalleTemperaturaComponent implements AfterViewInit, OnDestroy, OnInit {  

    public SiCargoData = true;
    public TieneData = false;
    fechaActual: any;
    minDate: Date;
    maxDate: Date;
    Contnumero : string;
    

    constructor(private reportService: ReportService,public dialogRef : MatDialogRef<ConsultaDetalleTemperaturaComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private router: Router){
    }
    
    @ViewChild(DataTableDirective)
    @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>
    dtElement: DataTableDirective;
    dtInstance: DataTables.Api;


    ngAfterViewInit(): void {
      this.dtTriggerCabecera.next();
      this.dtTrigger.next();
      console.log(this.dtElement);
    }

    setearFechasLimite(){
      let date = new Date();
      this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
      this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
    }
    
    dtTrigger:Subject<any> = new Subject();
    dtTriggerCabecera:Subject<any> = new Subject();

    dtOptions : any = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      autoFill: true, 
      dom: 'Bfrtip',
      paging:         false,
      fixedColumns:   true,
      buttons: [
        'excel',
      ],

      language: {
        lengthMenu: "Mostrar _MENU_ registros" ,
        search : "Buscar",
        info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        paginate : {
          first:    "Primero",
          last:     "Último",
          next:     "Siguiente",
          previous: "Anterior"
        },
        buttons : {
          colvis : "Columnas",
          excel : "Exportar a Excel"
        },
        aria :
        {
          sortAscending :"Activar para ordenar la columna de manera ascendente",
          sortDescending: "Activar para ordenar la columna de manera descendente"
        }
      }
    };

    dtOptionsCabecera : any = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      autoFill: true, 
      //dom: 'Bfrtip',
      paging:         false,
      fixedColumns:   true,
      language: {
        lengthMenu: "Mostrar _MENU_ registros" ,
        search : "Buscar",
        info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        paginate : {
          first:    "Primero",
          last:     "Último",
          next:     "Siguiente",
          previous: "Anterior"
        },
        aria :
        {
          sortAscending :"Activar para ordenar la columna de manera ascendente",
          sortDescending: "Activar para ordenar la columna de manera descendente"
        }
      }
    };

    public objTemperaturaDetalleRQT: TemperaturaDetalleRQT;
    //public objTemperaturaDataRPT: Array<TemperaturaDataRPT>;
    //public objTemperaturaVDRPT: Array<TemperaturaVDRPT>;
    public objTemperaturaDataRPT: TemperaturaDataRPT;
    public objTemperaturaVDRPT: TemperaturaVDRPT;
    
    
    public ngOnInit():any {      
    this.Contnumero = localStorage.getItem("Contnumero"),
    this.fechaActual = new Date();
 /*    let fechita = new Date();
    let dia = fechita.getDate().toString();
    let mes = (fechita.getMonth() + 1).toString();
    let anio = fechita.getFullYear().toString();
    this.fechaActual = dia + "-" + mes + "-" + anio; */

    
    
      if (localStorage.getItem("Usuario") == null)
       {this.router.navigate(['/login']);} 

      this.SetGrillaVisibility(false);
      this.setearFechasLimite();

    }        


    public CargarGrilla(form: NgForm) {

       if (this.TieneData)
      {
        return;
      } 

       this.objTemperaturaDetalleRQT = {
        IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        CodContenedor : localStorage.getItem("CodContenedor"),
        BookLineNroDoc : localStorage.getItem("BookLineNroDoc"),
        FechaIni : form.value.txtbox_Desde,
        FechaFin : form.value.txtbox_Hasta,
      };
      //console.log(Number.parseInt(localStorage.getItem("Usuario")) +'-'+ Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"))+'-'+localStorage.getItem("ContCargCodigo") +'-'+  localStorage.getItem("BookLineNroDoc") +'-'+  form.value.txtbox_Desde +'-'+  form.value.txtbox_Hasta)
      
      if(this.ValidarInput(this.objTemperaturaDetalleRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      }
      
      console.log(this.objTemperaturaDetalleRQT.IDUSer +' - ' +this.objTemperaturaDetalleRQT.IDRol +' - ' +this.objTemperaturaDetalleRQT.CodContenedor +' - ' +this.objTemperaturaDetalleRQT.BookLineNroDoc +' - ' +this.objTemperaturaDetalleRQT.FechaIni+' - ' +this.objTemperaturaDetalleRQT.FechaFin );
      let res = this.reportService.getTemperaturaDetalle(this.objTemperaturaDetalleRQT);      
      res.subscribe( 
        data => { 

          this.objTemperaturaVDRPT = data.VD;
          console.log('RESULTADO:' +  JSON.stringify(data.VD ))
          
          this.objTemperaturaDataRPT = data.Data;
          console.log('RESULTADO:' +  JSON.stringify(data.Data ))
          if (data.Data.length >= 1)
          {
            //swal("Si existen datos");
          }
          else
          {
            swal("No existen datos");
            
          }

          this.SiCargoData = true;
            this.dtElements.forEach((dtElement: DataTableDirective) => {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {dtInstance.destroy();});
            });
            this.dtTriggerCabecera.next(this.objTemperaturaVDRPT); 
            this.dtTrigger.next(this.objTemperaturaDataRPT);

          this.SetGrillaVisibility(true);
        }, 
        error => {
          swal("Error al cargar los datos"); 
          console.log("Error : ", error); 
        }
      );  

    }
    
     public ngOnDestroy():any {
      this.SetGrillaVisibility(false);
      this.dtTrigger.unsubscribe();
      this.dtTriggerCabecera.unsubscribe();
    } 

    public ValidarInput(param : TemperaturaDetalleRQT) : boolean
    {
      if (this.NullEmpty(param.FechaIni) || this.NullEmpty(param.FechaFin))
      {
        return true;
      } 
      var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.objTemperaturaDetalleRQT.FechaIni = this.objTemperaturaDetalleRQT.FechaIni.toLocaleDateString("es-ES",options);
      this.objTemperaturaDetalleRQT.FechaFin = this.objTemperaturaDetalleRQT.FechaFin.toLocaleDateString("es-ES",options); 
//console.log(this.objTemperaturaDetalleRQT.FechaIni);
//console.log(this.objTemperaturaDetalleRQT.FechaFin);
       return false;
    }

    public NullEmpty (param:any) : boolean
    {
      return !(typeof param!='undefined' && param)
    }

    public SetGrillaVisibility(param:boolean)
    {
      if (param) {
        document.getElementById('grilla1').style.visibility = "visible";
        document.getElementById('grilla2').style.visibility = "visible";
      }
      else {
        document.getElementById('grilla1').style.visibility = "hidden";
        document.getElementById('grilla2').style.visibility = "hidden";
      }
    }


    public SiTieneData(param :boolean)
    {
      this.TieneData = false;
    }


  public cerrarPopup(){
    this.dialogRef.close();
    return false;
  }
  
}
