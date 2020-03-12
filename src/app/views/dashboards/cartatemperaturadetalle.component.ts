import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { TemperaturaDetalleRQT, TemperaturaDetalleRPT,CartaDetalleTemperatura2RQT,CartaDetalleTemperatura2RPT,ActualizarCartaDetalleTemperaturaRQT,ActualizarCartaDetalleTemperaturaRPT, CartaDetalleTemperaturaRQT, CartaDetalleTemperaturaRPT, TemperaturaDataRPT, TemperaturaVDRPT } from '../../models/Temperatura';
import { MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';
import { esLocale } from 'ngx-bootstrap';


@Component({
  selector: 'cartatemperaturadetalle',
  templateUrl: 'cartatemperaturadetalle.template.html',
  styleUrls: ['cartatemperaturadetalle.component.css']
})

export class CartaTemperaturaDetalleComponent implements OnInit {

  public SiCargoData = true;
  public TieneData = false;
  fechaActual: any;
  minDate: Date;
  maxDate: Date;
  Contnumero: string;

  Nave: string;
  Viaje: string;
  Booking: string;
  Embarcador: string;
  Consignatario: string;
  PtoEmba: string;
  PtoDescarga: string;
  PtoDestinoFinal: string;
  Producto: string;
  Temp: string;
  Hume: string;
  Hume_Opcion: string;
  Vent_Opcion: string;
  Vent_CLOSED: string;
  Vent_FULLOPEN: string;
  Vent_CBMHOUR: string;
  CTreat_Opcion: string;
  CTreat_SI: string;
  CTreat_No: string;
  CAtmo_Opcion: string;
  CAtmo_Select: string;
  CAtmo_SI: string;
  CAtmo_No: string;
  CO2: string;
  O2: string;
  EVERFRESH_SI: string;
  EVERFRESH_No: string;
  EVERFRESH_CO2: string;
  EVERFRESH_O2: string;
  STARCOOLCA_SI: string;
  STARCOOLCA_No: string;
  STARCOOLCA_CO2: string;
  STARCOOLCA_O2: string;
  MAXTEND: string;
  TRANSFRESH: string;
  FCTemp: string;

  Contenedor: string;
  Capacidad: string;
  TipoCont: string;
  Puerto: string;

  public objCartaDetalleTemperaturaRQT: CartaDetalleTemperaturaRQT;
  public objCartaDetalleTemperaturaRPT: CartaDetalleTemperaturaRPT;
  public objCartaDetalleTemperatura2RQT: CartaDetalleTemperatura2RQT;
  public objCartaDetalleTemperatura2RPT: CartaDetalleTemperatura2RPT;
  public objActualizarCartaDetalleTemperaturaRQT: ActualizarCartaDetalleTemperaturaRQT;
  public objActualizarCartaDetalleTemperaturaRPT: ActualizarCartaDetalleTemperaturaRPT;

  public SelectControlAtmosphere: any[];
  public SelectAirVentilation: any[];
  public SelectHumidity: any[];



  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<CartaTemperaturaDetalleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    var emptyString = "";
    this.Nave = emptyString;
    this.Viaje = emptyString;
    this.Booking = emptyString;
    this.Embarcador = emptyString;
    this.Consignatario = emptyString;
    this.PtoEmba = emptyString;
    this.PtoDescarga = emptyString;
    this.PtoDestinoFinal = emptyString;
    this.Producto = emptyString;
    this.Temp = emptyString;
    this.Hume = emptyString;
    this.Hume_Opcion = emptyString;
    this.Vent_Opcion= emptyString;
    this.Vent_CLOSED = emptyString;
    this.Vent_FULLOPEN = emptyString;
    this.Vent_CBMHOUR = emptyString;
    this.CTreat_Opcion = emptyString;
    this.CTreat_No = emptyString;
    this.CTreat_SI = emptyString;
    this.CTreat_No = emptyString;
    this.CAtmo_Opcion = emptyString;
    this.CAtmo_Select = emptyString;
    this.CAtmo_SI = emptyString;
    this.CAtmo_No = emptyString;
    this.CO2 = emptyString;
    this.O2 = emptyString;
    
    this.EVERFRESH_SI = emptyString;
    this.EVERFRESH_No = emptyString;
    this.EVERFRESH_CO2 = emptyString;
    this.EVERFRESH_O2 = emptyString;
    this.STARCOOLCA_SI = emptyString;
    this.STARCOOLCA_No = emptyString;
    this.STARCOOLCA_CO2 = emptyString;
    this.STARCOOLCA_O2 = emptyString;
    this.MAXTEND = emptyString;
    this.TRANSFRESH = emptyString;
    this.FCTemp = emptyString;

    this.Contenedor = emptyString;
    this.Capacidad = emptyString;
    this.TipoCont = emptyString;
    this.Puerto = emptyString;


    this.objCartaDetalleTemperaturaRQT = {
      Usuario: Number.parseInt(localStorage.getItem("Usuario")),
      IdCT: localStorage.getItem("paramIdCT"),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault"))
    }

    this.objCartaDetalleTemperatura2RQT = {
      NBooking: localStorage.getItem("paramNBooking")
    }

    this.CargarDetalleCarta(this.objCartaDetalleTemperaturaRQT);
    console.log(this.objCartaDetalleTemperaturaRQT);
    
    this.CargarDetalleCarta2(this.objCartaDetalleTemperatura2RQT);
    console.log(this.objCartaDetalleTemperatura2RQT)
  }


  public CargarDetalleCarta(param: CartaDetalleTemperaturaRQT) {
    let res = this.reportService.getDetalleCartaTemperatura(param);

    res.subscribe(
      data => {
        var resp: CartaDetalleTemperaturaRPT;
        resp = data.Data;
        //console.log(data.Data);
        this.Nave = resp[0].Nave;
        //console.log(resp[0].Viaje);
        this.Viaje = resp[0].Viaje;
        this.Booking = resp[0].Booking;
        this.Embarcador = resp[0].Embarcador;
        this.Consignatario = resp[0].Consignatario;
        this.PtoEmba = resp[0].PtoEmba;
        this.PtoDescarga = resp[0].PtoDescarga;
        this.PtoDestinoFinal = resp[0].PtoDestinoFinal;

        this.Producto = resp[0].Producto;
        this.Temp = resp[0].Temp;
        

        if (resp[0].Hume=="OFF"){
          this.Hume_Opcion = "OFF"
          this.SetGrillaVisibility("SelectComboxHumidity","", false)
        }else{
          this.Hume_Opcion = "%"
          this.SetGrillaVisibility("SelectComboxHumidity","", true)
        }
        this.Hume = resp[0].Hume;

        if (resp[0].Vent_CBMHOUR=="X"){
          this.Vent_Opcion="CBM/HOUR"
          this.SetGrillaVisibility("SelectComboxAirVentilation","", true)
        }else if (resp[0].Vent_CLOSED=="X"){
          this.Vent_Opcion="CLOSED"
          this.SetGrillaVisibility("SelectComboxAirVentilation","", false)
        }else if (resp[0].Vent_FULLOPEN=="X"){
          this.Vent_Opcion="FULL OPEN"
          this.SetGrillaVisibility("SelectComboxAirVentilation","", false)
        }
        this.Vent_CLOSED = resp[0].Vent_CLOSED;
        this.Vent_FULLOPEN = resp[0].Vent_FULLOPEN;
        this.Vent_CBMHOUR = resp[0].Vent_CBMHOUR;

        this.Producto = resp[0].Producto;
        this.Temp = resp[0].Temp;

        if (resp[0].CTreat_SI == "X") {
          this.CTreat_Opcion = "YES"
        } else if (resp[0].CTreat_No == "X") {
          this.CTreat_Opcion = "NO"
        }

        this.CTreat_SI = resp[0].CTreat_SI;
        this.CTreat_No = resp[0].CTreat_No;

        if (resp[0].CAtmo_SI == "X") {
          this.CAtmo_Opcion = "YES"
          this.SetGrillaVisibility("ControlComboxAtmosphere","", true)
        } else if (resp[0].CAtmo_No == "X") {
          this.CAtmo_Opcion = "NO"
          this.SetGrillaVisibility("ControlComboxAtmosphere","", false)
        }

        this.CAtmo_SI = resp[0].CAtmo_SI;
        this.CAtmo_No = resp[0].CAtmo_No;

        if (resp[0].EVERFRESH_SI == "X") {
          this.CAtmo_Select = "EVERFRESH"
          console.log("entre");
          this.O2 = resp[0].EVERFRESH_O2;
          this.CO2 = resp[0].EVERFRESH_CO2;
          document.getElementById("SelectComboxAtmosphere").style.visibility = "visible";
          //this.SetGrillaVisibility("SelectComboxAtmosphere","",true)
        } else if (resp[0].EVERFRESH_No == "X") {
          //this.CAtmo_Select = "NO"
          
          this.SetGrillaVisibility("SelectComboxAtmosphere","", false)
        }

        this.EVERFRESH_SI = resp[0].EVERFRESH_SI;
        this.EVERFRESH_No = resp[0].EVERFRESH_No;
        this.EVERFRESH_O2 = resp[0].EVERFRESH_O2;
        this.EVERFRESH_CO2 = resp[0].EVERFRESH_CO2;

        if (resp[0].STARCOOLCA_SI == "X") {
          this.CAtmo_Select = "STAR COOL CA"
          this.SetGrillaVisibility("SelectComboxAtmosphere","", true)
          this.O2 = resp[0].STARCOOLCA_O2;
          this.CO2 = resp[0].STARCOOLCA_CO2;
        } else if (resp[0].STARCOOLCA_No == "X") {
          //this.CAtmo_Select = "NO"
          this.SetGrillaVisibility("SelectComboxAtmosphere","",false)
        }

        this.STARCOOLCA_SI = resp[0].STARCOOLCA_SI;
        this.STARCOOLCA_No = resp[0].STARCOOLCA_No;
        this.STARCOOLCA_CO2 = resp[0].STARCOOLCA_CO2;
        this.STARCOOLCA_O2 = resp[0].STARCOOLCA_O2;

        if (resp[0].MAXTEND == "X") {
          this.CAtmo_Select = "MAXTEND"
        }
        this.MAXTEND = resp[0].MAXTEND;

        if (resp[0].TRANSFRESH == "X") {
          this.CAtmo_Select = "TRANSFRESH"
        }
        this.TRANSFRESH = resp[0].TRANSFRESH;

        this.FCTemp = resp[0].FCTemp;

      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });
  }

  
  public CargarDetalleCarta2(param: CartaDetalleTemperatura2RQT) {
    let res = this.reportService.getDetalleCartaTemperatura2(param);

    res.subscribe(
      data => {
        var resp: CartaDetalleTemperatura2RPT;
        resp = data.Data;
        //console.log(data.Data);
        this.Contenedor = resp[0].Contenedor;
        //console.log(resp[0].Viaje);
        this.Capacidad = resp[0].Capacidad + resp[0].TipoCont;
        this.TipoCont = resp[0].TipoCont;
        this.Puerto = resp[0].Puerto;
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });
  }


  @ViewChild(DataTableDirective)
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;


  ngAfterViewInit(): void {
    /* this.dtTriggerCabecera.next();
    this.dtTrigger.next();
    console.log(this.dtElement); */
  }

/*   setearFechasLimite() {
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log("Fechita: " + date)
  } */

/*   dtTrigger: Subject<any> = new Subject();
  dtTriggerCabecera: Subject<any> = new Subject(); */

/*   dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    dom: 'Bfrtip',
    paging: false,
    fixedColumns: true,
    processing: true,
    buttons: [
      'excel',
    ],

    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      search: "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      buttons: {
        colvis: "Columnas",
        excel: "Exportar a Excel"
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };

  dtOptionsCabecera: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    processing: true,
    //dom: 'Bfrtip',
    paging: false,
    fixedColumns: true,
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      search: "Buscar",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior"
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  }; */

  //public objTemperaturaDetalleRQT: TemperaturaDetalleRQT;
  //public objTemperaturaDataRPT: Array<TemperaturaDataRPT>;
  //public objTemperaturaVDRPT: Array<TemperaturaVDRPT>;
  /*   public objTemperaturaDataRPT: TemperaturaDataRPT;
    public objTemperaturaVDRPT: TemperaturaVDRPT; */




  public ngOnInit(): any {
    this.Contnumero = localStorage.getItem("paramNBooking");
    //this.fechaActual = new Date();
    /*    let fechita = new Date();
       let dia = fechita.getDate().toString();
       let mes = (fechita.getMonth() + 1).toString();
       let anio = fechita.getFullYear().toString();
       this.fechaActual = dia + "-" + mes + "-" + anio; */

    this.SelectControlAtmosphere = [{ Descripcion: "" },
    { Descripcion: "EVERFRESH" },
    { Descripcion: "STAR COOL CA" },
    { Descripcion: "MAXTEND" },
    { Descripcion: "TRANSFRESH" }
    ]
    this.SelectAirVentilation = [{ Descripcion: "" },
    { Descripcion: "CLOSED" },
    { Descripcion: "FULL OPEN" },
    { Descripcion: "CBM/HOUR" }
    ]
    this.SelectHumidity = [{ Descripcion: "" },
    { Descripcion: "%" },
    { Descripcion: "OFF" }
    ]



    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }

    // this.SetGrillaVisibility(false);
    //this.setearFechasLimite();
    this.muestra_oculta("datosbooking");
    this.muestra_oculta("temperatura");
    this.muestra_oculta("containers");

  }
  
  public IniciarForm(form: NgForm) {


  }

  public ngOnDestroy(): any {
    //this.SetGrillaVisibility(false);
    //this.dtTrigger.unsubscribe();
    //this.dtTriggerCabecera.unsubscribe();
  }

  public ValidarInput(param: TemperaturaDetalleRQT): boolean {
    if (this.NullEmpty(param.FechaIni) || this.NullEmpty(param.FechaFin)) {
      return true;
    }
    /*       var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          this.objTemperaturaDetalleRQT.FechaIni = this.objTemperaturaDetalleRQT.FechaIni.toLocaleDateString("es-ES",options);
          this.objTemperaturaDetalleRQT.FechaFin = this.objTemperaturaDetalleRQT.FechaFin.toLocaleDateString("es-ES",options); 
     *///console.log(this.objTemperaturaDetalleRQT.FechaIni);
    //console.log(this.objTemperaturaDetalleRQT.FechaFin);
    return false;
  }

  public NullEmpty(param: any): boolean {
    return !(typeof param != 'undefined' && param)
  }

  /*     public SetGrillaVisibility(param:boolean)
      {
        if (param) {
          document.getElementById('grilla1').style.visibility = "visible";
          document.getElementById('grilla2').style.visibility = "visible";
        }
        else {
          document.getElementById('grilla1').style.visibility = "hidden";
          document.getElementById('grilla2').style.visibility = "hidden";
        }
      } */

  public SetGrillaVisibility(paramControl: string,paramControl2: string, param: boolean) {
    if (param) {
      document.getElementById(paramControl).style.visibility = "visible";
      //document.getElementById(paramControl).style.visibility = "visible";
    }
    else {
      document.getElementById(paramControl).style.visibility = "hidden";
      if (paramControl2.length>0){
        document.getElementById(paramControl2).style.visibility = "hidden";
      }
    }
  }
  public muestra_oculta(param: string) {
    if (document.getElementById) { //se obtiene el id
      var el = document.getElementById(param); //se define la variable "el" igual a nuestro div
      el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
    }
  }


  public SiTieneData(param: boolean) {
    this.TieneData = false;
  }

  public cerrarPopup() {
    this.dialogRef.close();
    return false;
  }

  public ChangingValue(param : any)
  {
    if (param.target.value=="EVERFRESH" || param.target.value=="STAR COOL CA"){
      this.SetGrillaVisibility("SelectComboxAtmosphere","",true)
    }else if (param.target.value=="MAXTEND" || param.target.value=="TRANSFRESH")
    {
      /* this.CO2="";
      this.O2="" */
      this.SetGrillaVisibility("SelectComboxAtmosphere","",false)
    }

    if (param.target.value=="CBM/HOUR"){
      this.SetGrillaVisibility("SelectComboxAirVentilation","",true)
    }else if (param.target.value=="FULL OPEN" || param.target.value=="CLOSED")
    {
      this.SetGrillaVisibility("SelectComboxAirVentilation","",false)
    }

    if (param.target.value=="OFF"){
      this.Hume="OFF"
      this.SetGrillaVisibility("SelectComboxHumidity","",false)
    }else if (param.target.value=="%")
    {
      this.SetGrillaVisibility("SelectComboxHumidity","",true)
    }

    //this.EstadoSelect = param.target.value;
    console.log(param.target)
    console.log(param.target.value)
  }

    public ActualizarTemperatura(form: NgForm){
      var paramCtem: boolean
      var paramCTreat: boolean
      var paramCAtmo: boolean

      if(this.CTreat_Opcion=="YES"){
        paramCTreat= true;
      }else if(this.CTreat_Opcion=="NO"){
        paramCTreat= false;
      }

      if(this.CAtmo_Opcion=="YES"){
        paramCAtmo= true;
      }else if(this.CAtmo_Opcion=="NO"){
        this.CO2="";
        this.O2="";
        this.CAtmo_Select="";
        paramCAtmo= false;
      }

      if(this.Temp.length > 0){
        paramCtem= true;
      }else if(this.Temp.length == 0){
        paramCtem= false;
      }


      this.objActualizarCartaDetalleTemperaturaRQT = {
        ID: Number.parseInt(localStorage.getItem("paramIdCT")),
        temp: this.Temp,
        vent: this.Vent_Opcion,
        hume: this.Hume,
        O2: this.O2,
        CO2: this.CO2,
        specials: this.CAtmo_Select,
        Ctem: paramCtem,
        CTreat: paramCTreat,
        CAtmo: paramCAtmo,
        FCTemp: "",
        dpro: this.Producto,
        Usuario: localStorage.getItem("Usuario"),
      }
      console.log("Datos Actualizar" + JSON.stringify(this.objActualizarCartaDetalleTemperaturaRQT));

      this.reportService.ActualizarCartaTemperatura(this.objActualizarCartaDetalleTemperaturaRQT).subscribe( 
        data => { 
          this.objActualizarCartaDetalleTemperaturaRPT= data;
          console.log("Mensaje : ", data); 
          swal(data[0].Msj.toString()); 
          this.cerrarPopup();
        }, 
        error => {
          swal("Error al intentar actualizar los datos de la Carta"); 
          console.log("Error : ", error); 
        }); 
      /* if(this.cambiarClave == "SI")
        this.actualizarClaveRequest = {
          IDUSer : Number.parseInt(localStorage.getItem("Usuario")),
          OldPass : this.claveActual,
          NewPass : this.claveNueva
        }
  
      var msgValidacion : string;
      msgValidacion = this.validarPrevioGuardar();
      
      if(msgValidacion.length > 0){        
        swal({
              text: msgValidacion,
              icon: "warning",
            });
        return false;
      }
  
      this.usuario.actualizarDatos(this.usuarioRequest).subscribe( 
        data => { 
          if(this.cambiarClave == "NO"){
            swal("Datos Guardados Correctamente");
            this.dialogRef.close();
          }
          else{    
            this.usuario.actualizarClave(this.actualizarClaveRequest).subscribe( 
              data => { 
                if(data != null){
                  var resp : ActualizarClaveResponse;
                  resp = data;
  
                  if(resp.Cod == 0){
                    this.claveActual = "";
                    this.claveNueva = "";
                    this.claveRepetida = "";
                    swal("Datos Guardados y Contraseña Cambiada Correctamente");
                    this.dialogRef.close();
                  }                  
                  else 
                    swal("Datos Guardados correctamente pero no se pudo cambiar la contraseña. " + resp.Msj);
                }
              }, 
              error => {
                swal("Se guardaron los datos pero sucedio un error al cambiar la contraseña"); 
                console.log("Error : ", error); 
              });        
          }          
        }, 
        error => {
          swal("Error al intentar guardar los datos del servicio"); 
          console.log("Error : ", error); 
        }); */
  
        return false;
    }

}
