import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { ReportService } from '../../services/report.service';
import { Subject } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';




@Component({
    selector: 'consultafactura',
    templateUrl: 'consultafactura.template.html'
  })

  

  export class ConsultaFacturaComponent implements OnDestroy, OnInit {

    public SiCargoData = false;

    public ListaUnidadNegocio : Array<ListaUnidadNegocio>;

    constructor(private reportService: ReportService) { }
    
    dtTrigger:Subject<any> = new Subject();
    dtOptions : DataTables.Settings = {};

    private objFacturaRQT : FacturasRQT = {
      IDUSer: 1,
      IDRol: 1,
      UnidadNeg: "UN0001",
      Desde: "13/11/2019",
      Hasta: "13/11/2019",
      Docuento: "",
      Cliente: ""
    }

    public objFacturaRPT: Array<FacturasRPT>;
    
    public ngOnInit():any {

      

      this.reportService.getunidadnegociolist().subscribe(
        data => this.ListaUnidadNegocio = data
      );


     }
    

    public Redirrecionar(param:string){
      // window.lo
      window.location.href = param;
    }

    public CargarGrilla()
    {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10        
      };
      this.reportService.getFacturas(this.objFacturaRQT)
      .subscribe(
        data => {
          this.objFacturaRPT = data.Data;        
          this.dtTrigger.next();
        });
      this.SiCargoData = true;
    }

    public ngOnDestroy():any {
      this.SiCargoData = false;
    }
  }
