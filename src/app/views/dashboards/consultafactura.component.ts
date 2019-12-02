import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../../models/Factura';
import { ReportService } from '../../services/report.service';
import { Subject, fromEventPattern } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'consultafactura',
    templateUrl: 'consultafactura.template.html'
  })

  export class ConsultaFacturaComponent implements OnDestroy, OnInit {  

    public SiCargoData = true;
    public ListaUnidadNegocio : Array<ListaUnidadNegocio>;
    public TieneData = false;
    public UnidadNegSelect:string;
    
    constructor(private reportService: ReportService) { 
      this.reportService.getunidadnegociolist().subscribe(data => this.ListaUnidadNegocio = data);
     }
    
    dtTrigger:Subject<any> = new Subject();
    dtOptions : any = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'excel'
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
          colvis : "Mostrar/Ocultar Columnas",
          excel : "Exportar a Excel"
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
      this.SetClienteInput();
    }
    

    public Redirrecionar(param:string){
      window.location.href = param;
    }

    public CargarGrilla(form: NgForm) {

      if (this.TieneData)
      {
        return;
      }


      this.objFacturaRQT = {
        IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
        IDRol : Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
        UnidadNeg : this.UnidadNegSelect,
        Desde : form.value.txtbox_Desde,
        Hasta : form.value.txtbox_Hasta,
        Documento : form.value.txtbox_Registro,
        Cliente : form.value.txtbox_Cliente
      }

      if(this.ValidarInput(this.objFacturaRQT))
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
            this.TieneData = true;
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

    public ValidarInput(param : FacturasRQT) : boolean
    {
      if (this.NullEmpty(this.UnidadNegSelect) ||this.NullEmpty(param.Desde) || this.NullEmpty(param.Hasta))
      {
        return true;
      }

      this.objFacturaRQT.Desde = this.objFacturaRQT.Desde.toLocaleDateString();
      this.objFacturaRQT.Hasta = this.objFacturaRQT.Hasta.toLocaleDateString();

      if(this.NullEmpty(param.Documento))
      {
        this.objFacturaRQT.Documento = " ";
      }

      if(this.NullEmpty(param.Cliente))
      {
        this.objFacturaRQT.Cliente = " ";
      }

      return false;
    }

    public NullEmpty (param:any) : boolean
    {
      return !(typeof param!='undefined' && param)
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

    public SiTieneData(param :boolean)
    {
      this.TieneData = false;
    }

    public ChangingValue(param : any)
    {
      this.UnidadNegSelect = param.target.value;
    }

    public SetClienteInput()
    {
      let enticodigo = localStorage.getItem("EntiCodigo");
      let entiNombre = localStorage.getItem("EntiNombre");

      if (enticodigo != "002915")
      {
        document.getElementById("txtbox_Cliente").textContent = entiNombre;
        document.getElementById("txtbox_Cliente").innerText = entiNombre;
        document.getElementById("txtbox_Cliente").setAttribute("placeholder",entiNombre)
        document.getElementById("txtbox_Cliente").setAttribute("disabled","true");
      }
    }

  }
