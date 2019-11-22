import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';


import swal from 'sweetalert';




@Component({
    selector: 'consultafactura',
    templateUrl: 'consultafactura.template.html'
  })

  export class ConsultaFacturaComponent implements OnDestroy, OnInit {  

    public SiCargoData = true;
    public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    
    constructor(private reportService: ReportService) { 
      this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);
     }
    
    dtTrigger:Subject<any> = new Subject();
    dtOptions : DataTables.Settings = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
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

    public objFacturaRQT : FacturasRQT = 
    {
      IDUSer: 1,
      IDRol: 1,
      UnidadNeg: "UN0001",
      Desde: "13/11/2019",
      Hasta: "13/11/2019",
      Documento: "",
      Cliente: ""
    }

    public objFacturaRPT: Array<FacturasRPT>;
    
    public ngOnInit():any {      
      this.SetGrillaVisibility(false);
    }
    

    public Redirrecionar(param:string){
      window.location.href = param;
    }

    public CargarGrilla(form: NgForm) {

      this.objFacturaRQT = {
        IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        UnidadNeg : form.value.listUniNeg,
        Desde : form.value.txtbox_Desde.toLocaleDateString(),
        Hasta : form.value.txtbox_Hasta.toLocaleDateString(),
        Documento : form.value.txtbox_Registro,
        Cliente : form.value.txtbox_Cliente
      }

      if(this.ValidarErorresInput(this.objFacturaRQT))
      {        
        swal({
              text: "Error en los campos de ingreso, por favor verificar",
              icon: "warning",
            });
        return;
      }

      this.reportService.getFacturas(this.objFacturaRQT).subscribe( 
        data => { 
          this.objFacturaRPT = data.Data;
          if (data.Data.length >= 1)
          {
            this.SiCargoData = true;
            this.dtTrigger.next(this.objFacturaRPT);
            this.SetGrillaVisibility(true);
          }
          else
          {
            swal("No existen datos");
          }
          this.dtTrigger.unsubscribe();
        }, 
        error => {
          swal("Error al cargar los datos"); 
          console.log("Error : ", error); 
        });
    }
    
    public ngOnDestroy():any {
      this.SetGrillaVisibility(false);
      this.dtTrigger.unsubscribe();
    }

    public ValidarErorresInput(param : FacturasRQT) : boolean
    {
      if (param.UnidadNeg === undefined || param.Desde === undefined || param.Hasta === undefined || param.Documento === undefined|| param.Cliente === undefined)
      {
        return true;
      }

      if (param.UnidadNeg == null || param.Desde == null || param.Hasta == null || param.Documento == null || param.Cliente == null)
      {
        return true;
      }
    }

    public SetGrillaVisibility(param:boolean)
    {
      if (param) {
        document.getElementById('grilla').style.visibility = "visible";
      }
      else {
        document.getElementById('grilla').style.visibility = "hidden";
      }
    }
  }