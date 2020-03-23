import { ReportService } from '../../services/report.service';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClient } from 'selenium-webdriver/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
//import { TemperaturaDetalleRQT, TemperaturaDetalleRPT, BuscarNuevoCartaDetalleTemperaturaRQT, BuscarNuevoCartaDetalleTemperaturaRPT, BuscarCartaDetalleTemperaturaRQT, BuscarCartaDetalleTemperaturaRPT, CartaDetalleTemperatura2RQT, CartaDetalleTemperatura2RPT, NuevoCartaDetalleTemperaturaRQT, NuevoCartaDetalleTemperaturaRPT, CartaDetalleTemperaturaRQT, CartaDetalleTemperaturaRPT, TemperaturaDataRPT, TemperaturaVDRPT } from '../../models/Temperatura';
import { ConsultaBookingRefrendoExpoRPT, ConsultaDetalleBookingRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ListaModalidadRefrendoExpo,GenerarRefrendoExpoRQT,GenerarRefrendoExpoRPT,GenerarDetalleRefrendoExpoRQT } from '../../models/RefrendoExpo';
import { MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEventPattern } from 'rxjs';
import { stringify } from 'querystring';
import { esLocale } from 'ngx-bootstrap';
import { Base64RPT, Base64RQT } from '../../models/Base64';
import { ZipRPT,ZipRQT } from '../../models/ConvertirZip';
import { FileItem } from '../../models/FileItem';
import { isError } from 'util';


@Component({
  selector: 'refrendoexponuevo',
  templateUrl: 'refrendoexponuevo.template.html',
  styleUrls: ['refrendoexponuevo.component.css']
})

export class RefrendoExpoNuevoComponent implements OnInit {

  public SiCargoData = true;
  public TieneData = false;
  fechaActual: any;
  minDate: Date;
  maxDate: Date;
  Contnumero: string;

  Codigo: string;
  Booking: string;
  Viaje: string;
  PuerDesc: string;
  PDestino: string;
  TipCarga: string;
  TipoCont: string;
  Exportador: string;
  Mercaderia: string;

  Despachador: string;
  AgenciaDeAduana: string;
  NroDeOrden: string;
  NroDeDAM: string;
  FechaDeNum: string;

  CantidadBultos: number;
  CantidadPeso: number;

  public Datos: ConsultaDetalleBookingRefrendoExpoRPT[];

  public objConsultaBookingRefrendoExpoRQT: ConsultaBookingRefrendoExpoRQT;
  public objConsultaBookingRefrendoExpoRPT: ConsultaBookingRefrendoExpoRPT;
  public objGenerarRefrendoExpoRQT: GenerarRefrendoExpoRQT;
  public objGenerarRefrendoExpoRPT: GenerarRefrendoExpoRPT;
  public objGenerarDetalleRefrendoExpoRQT: GenerarDetalleRefrendoExpoRQT;
  

  public ModalidadSelect: string;
  public ListaModalidad: Array<ListaModalidadRefrendoExpo>;

  //public Datas: Array<ConsultaDetalleBookingRefrendoExpoRPT>;
  setearFechasLimite(){
    let date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);    
  }

  constructor(private reportService: ReportService, public dialogRef: MatDialogRef<RefrendoExpoNuevoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    this.reportService.ConsultaModalidadRefrendoExpo().subscribe(data => this.ListaModalidad = data.Data);
    var emptyString = "";

    this.Codigo = emptyString;
    this.Booking = emptyString;
    this.Viaje = emptyString;
    this.PuerDesc = emptyString;
    this.PDestino = emptyString;
    this.TipCarga = emptyString;
    this.TipoCont = emptyString;
    this.Exportador = emptyString;
    this.Mercaderia = emptyString;

    this.Despachador = emptyString;
    this.AgenciaDeAduana = emptyString;
    this.NroDeOrden = emptyString;
    this.NroDeDAM = emptyString;
    this.FechaDeNum = emptyString;
    this.CantidadBultos = 0;
    this.CantidadPeso = 0;
  }

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isLoading = false;
  image: any;
  fileitems = [];
  fileitemsZ = [];
  selectedOptions = [];
  cerrado = false;

  public msjfinal:string = "";
  public isError = false;
  public EsMayor5 = false;
  public filename1: string = "";
  public filename2: string = "";
  public filename3: string = "";
  public filename4: string = "";
  public filename5: string = "";
  public filename6: string = "";
  public fname1: string = "";
  public fname2: string = "";
  public fname3: string = "";
  public fname4: string = "";
  public fname5: string = "";
  public fname6: string = "";
  public TotalMB: number = 0.00;
  public fileitem: any;
  public fileitemz: any;


  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    autoFill: true,
    dom: 'Bfrtip',
    //processing: true,
    fixedColumns: true,
    buttons: [
      /*'colvis',
      'excel',*/
    ],
    /* footerCallback: function ( row, data, start, end, display ) {
      var total = this.api()
          .column(2)//numero de columna a sumar
          //.column(1, {page: 'current'})//para sumar solo la pagina actual
          .data()
          .reduce(function (a, b) {
              return parseInt(a) + parseInt(b);
          }, 0 );

      $(this.api().column(2).footer()).html(total);
      
    }, */

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
        /*         colvis : "Columnas",
                excel : "Exportar a Excel" */
      },
      aria:
      {
        sortAscending: "Activar para ordenar la columna de manera ascendente",
        sortDescending: "Activar para ordenar la columna de manera descendente"
      }
    }
  };

  public BuscarBooking(form: NgForm) {
    this.objConsultaBookingRefrendoExpoRQT = {
      IDUSer: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      Booking: form.value.txtbox_NBooking,
      Modalidad: this.ModalidadSelect,
      Llenado: true
    }
    console.log(this.objConsultaBookingRefrendoExpoRQT);
    let res = this.reportService.ConsultaBookingRefrendoExpo(this.objConsultaBookingRefrendoExpoRQT);
    res.subscribe(
      data => {
        var resp: ConsultaBookingRefrendoExpoRPT;
        resp = data;
        console.log("CONSULTA BOOKING" + JSON.stringify(data));
        if (data.Cod == 1) {
          swal(data.Msj.toString());
        } else {
          let DetalleDatos = [];  
          this.Codigo = resp.Codigo;
          this.Exportador = resp.Exportador;
          this.Despachador = "";
          this.AgenciaDeAduana = "";
          this.NroDeOrden = "";
          this.NroDeDAM = "";
          this.FechaDeNum = "";
          this.Mercaderia = resp.Mercaderia;

          for (var clave in data.Datos){
            this.CantidadBultos =  this.CantidadBultos + data.Datos[clave].Bultos;
            this.CantidadPeso =  this.CantidadPeso + data.Datos[clave].Peso;
            DetalleDatos.push({'CodContenedor': data.Datos[clave].CodContenedor, 'Contenedor': data.Datos[clave].Contenedor, 'Capacidad': data.Datos[clave].Capacidad, 'TipoCont': data.Datos[clave].TipoCont, 'Bultos': data.Datos[clave].Bultos, 'Peso': data.Datos[clave].Peso, 'PctoAduana':"" });
          }
          this.Datos = DetalleDatos;
          console.log("CONSULTA DETALLE BOOKING " + this.Datos);

          this.muestra_oculta('DAM');
          this.muestra_oculta("CONTENEDORES");

          this.SiCargoData = true;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            console.log("ENTREEEEEE");
            this.dtTrigger.next(this.Datos);
          });
        }
      },
      error => {
        swal("Error al cargar los datos");
        console.log("Error : ", error);
      });
  }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnInit(): any {
    this.Contnumero = localStorage.getItem("paramNBooking");
    if (localStorage.getItem("Usuario") == null) { this.router.navigate(['/login']); }

    // this.SetGrillaVisibility(false);
    //this.setearFechasLimite();
    this.muestra_oculta("DAM");
    this.muestra_oculta("CONTENEDORES");
    this.muestra_oculta("DOCUMENTOS");

  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  change7($event): void {
    this.readThis7($event.target);
  }
  change3($event): void {
    this.readThis3($event.target);
  }
  change4($event): void {
    this.readThis4($event.target);
  }
  change5($event): void {
    this.readThis5($event.target);
  }
  change6($event): void {
    this.readThis6($event.target);
  }
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      var str = file.name;
      var res = str.split(".");

      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }

      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      this.fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      this.fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.filename1 = file.name;
      this.fname1 = file.name;
    }

    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      this.fileitemz = null;
      this.fileitem = null;
      let filname1 = this.filename1;
      let fnam1 = this.fname1;
      if (filname1 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam1;
        });

        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename1);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }
  readThis3(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      this.TotalMB = this.TotalMB + tamanioArch;
      let totalMBs = this.TotalMB;
      if (totalMBs > 5) { this.EsMayor5 = true }
      var str = file.name;
      var res = str.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }
      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      let fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.filename3 = this.reqBase64.NombreArc;
      this.fname3 = file.name;
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
    }
    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      let filname3 = this.filename3;
      let fnam3 = this.fname3;
      if (filname3 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam3;
        });
        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename3);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }
  readThis4(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      this.TotalMB = this.TotalMB + tamanioArch;
      let totalMBs = this.TotalMB;
      if (totalMBs > 5) { this.EsMayor5 = true }
      var str = file.name;
      var res = str.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }
      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      let fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.filename4 = this.reqBase64.NombreArc;
      this.fname4 = file.name;
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
    }

    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      let filname4 = this.filename4;
      let fnam4 = this.fname4;
      if (filname4 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam4;
        });
        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename4);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }
  readThis5(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      this.TotalMB = this.TotalMB + tamanioArch;
      let totalMBs = this.TotalMB;
      if (totalMBs > 5) { this.EsMayor5 = true }
      var str = file.name;
      var res = str.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }
      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      let fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.filename5 = this.reqBase64.NombreArc;
      this.fname5 = file.name;
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
    }
    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      let filname5 = this.filename5;
      let fnam5 = this.fname5;
      if (filname5 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam5;
        });
        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename1);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }
  readThis6(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      this.TotalMB = this.TotalMB + tamanioArch;
      let totalMBs = this.TotalMB;
      if (totalMBs > 5) { this.EsMayor5 = true }
      var str = file.name;
      var res = str.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }
      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      let fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.filename6 = this.reqBase64.NombreArc;
      this.fname6 = file.name;
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
    }
    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      let filname6 = this.filename6;
      let fnam6 = this.fname6;
      if (filname6 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam6;
        });
        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename1);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }
  readThis7(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image.toString());
      let tamanioArch: number = (file.size / 1024) / 1024;
      this.TotalMB = this.TotalMB + tamanioArch;
      let totalMBs = this.TotalMB;
      if (totalMBs > 5) { this.EsMayor5 = true }
      var str = file.name;
      var res = str.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        this.reqBase64.NombreArc = res[0].toString();
        this.reqBase64.TipoArc = tipoarchivo;
      }
      var oldstr = this.image.toString();
      var newstr = oldstr.toString().replace("data:text/plain;base64,", "");
      this.reqBase64.Base64 = newstr;
      this.filename2 = this.reqBase64.NombreArc;
      let index: number = 0;
      if (this.fileitemsZ.length >= 1) { index = this.fileitemsZ.length; }
      else { index = 0; }
      let fileitem = new Base64RQT("", this.reqBase64.Base64, this.reqBase64.NombreArc, this.reqBase64.TipoArc);
      let fileitemz = new FileItem(file.name, file.size, this.reqBase64.Base64, index);
      this.fname2 = file.name;
      this.fileitems.push(fileitem);
      this.fileitemsZ.push(fileitemz);
    }
    if (file != null) { myReader.readAsDataURL(file); }
    else {
      console.log("Aqui es con el boton cancelar");
      let filname2 = this.filename2;
      let fnam2 = this.fname2;
      if (filname2 != "") {
        var fitemz = this.fileitemsZ.filter(function (f) {
          return f.name == fnam2;
        });
        if (fitemz.length == 1) {
          let fitemf = fitemz[0];
          this.TotalMB = this.TotalMB - ((fitemf.size / 1024) / 1024);
          let totalmbb = this.TotalMB;
          if (this.TotalMB < 5) { this.EsMayor5 = false }
        }
        var pos = this.fileitems.map(function (e) {
          return e.NombreArc;
        }).indexOf(this.filename2);
        this.fileitems.splice(pos, 1);
        this.fileitemsZ.splice(pos, 1);
        let leng = this.fileitems.length;
        console.log(pos.toString());
      }
    }
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  AgregarArchivo(nombarc: string) {
    this.cerrado = true;
    if (nombarc != "") {
      var res = nombarc.split(".");
      if (res.length > 0) {
        var tipoarchivo = res[1];
        if ((tipoarchivo.toLowerCase() == "jpg") || (tipoarchivo.toLowerCase() == "jpeg") || (tipoarchivo.toLowerCase() == "pdf") || (tipoarchivo.toLowerCase() == "png")) {
          for (var i = 0; i <= this.fileitemsZ.length - 1; i++) {
            if (this.fileitemsZ[i].name == nombarc) {
              {
                swal({ text: "El archivo ya se encuentra en el listado" });
                return;
              }
            }
          }
          this.TotalMB = 0;
          if (this.fileitem != null) {
            this.fileitems.push(this.fileitem);
          }
          if (this.fileitemz != null) {
            this.fileitemsZ.push(this.fileitemz);
          }
          for (var i = 0; i <= this.fileitemsZ.length - 1; i++) {
            this.TotalMB = this.TotalMB + ((this.fileitemsZ[i].size / 1024) / 1024);
          }
          if (this.TotalMB > 5) { this.EsMayor5 = true }
        }
        else {
          swal({ text: "El archivo debe ser del tipo pdf, jpg, png" });
          return;
        }
      }
    }
  }

  EliminarSelect() {
    this.cerrado = true;
    this.TotalMB = 0;
    for (var i = 0; i <= this.selectedOptions.length - 1; i++) {
      var pos = this.fileitemsZ.map(function (e) {
        return e.name;
      }).indexOf(this.selectedOptions[i].toString());
      this.fileitems.splice(pos, 1);
      this.fileitemsZ.splice(pos, 1);
  }
    for (var i = 0; i <= this.fileitemsZ.length - 1; i++) {
      let pos = this.selectedOptions[i];
      this.fileitemsZ[i].index = i;
    }

    if (this.fileitemsZ.length == 0) { this.TotalMB = 0; }
    for (var i = 0; i <= this.fileitemsZ.length - 1; i++) {
      this.TotalMB = this.TotalMB + ((this.fileitemsZ[i].size / 1024) / 1024);
      if (this.TotalMB < 5) { this.EsMayor5 = false }
    }
  }

  registrarBase64(carpeta: string): void {
    for (var i = 0; i <= this.fileitems.length - 1; i++) {
      let reqBas64 = this.fileitems[i];
      reqBas64.Carpeta = carpeta;
      if (i == this.fileitems.length - 1) {
        var ultarch = reqBas64.NombreArc + "." + reqBas64.TipoArc;
      }
      let oldstr = reqBas64.Base64;
      let ind = oldstr.indexOf(",");
      let repstr = oldstr.substr(0, ind + 1);
      var newstr = oldstr.toString().replace(repstr, "");
      reqBas64.Base64 = newstr;
      console.log(reqBas64.Carpeta);
      console.log(reqBas64.Base64);
      this.reportService
        .RegistrarBase64(reqBas64)
        .subscribe(
          data => {
            this.respBase64 = data;
            if (this.respBase64 != null) {
              if (data != null) {
                console.log("Archivo guardado correctamente");
                if (ultarch.toString() == data.toString()) {
                  this.ConvertirZip(carpeta);
                }
              }
              else {
                this.msjfinal = data.toString();
                swal({ text: this.msjfinal.toString() });
              }
            }
            else {
              localStorage.removeItem('StockTotal');
              this.onIsError();
            }
          },
          error => {
            this.onIsError();
            console.log("Error");
          }
        );
    }
    this.onClose();
  }
  ConvertirZip(carpeta:string):void
  {      
    this.reqZip.Carpeta = carpeta;
    this.reportService
     .ConvertirZip(this.reqZip)
     .subscribe(
     data => {      
       this.respZip = data;
       if (this.respZip != null)
       {
           if (data != null)
           {
            console.log("Carpeta Zipeada correctamente");
           }
           else
           { 
            this.msjfinal = data.toString(); 
            swal({text : this.msjfinal.toString()});  
           }
        
       } 
       else{
         localStorage.removeItem('StockTotal');       
         this.onIsError();   
       }                       
     },  
     error => {
       this.onIsError();           
       console.log("Error");}
     );
}

  onClose(){
    this.cerrado = true;
    this.dialogRef.close();
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  private reqZip: ZipRQT = {
    Carpeta: ""    
   };

   private respZip: ZipRPT = {
    Archivo: ""    
   };

  private reqBase64: Base64RQT = {
    Carpeta: "",
    Base64: "",
    NombreArc: "",
    TipoArc: ""
   };

   private respBase64: Base64RPT = {
    Archivo: ""    
   };

   onListControlChanged(list:any)
   {
     this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
   }
 

  public IniciarForm(form: NgForm) {
  }

  public ngOnDestroy(): any {
    this.dtTrigger.unsubscribe();
  }
  
  public AgregarRefrendo(form: NgForm){
    var NBooking: string
    NBooking = form.value.txtbox_NBooking

    if ( NBooking == undefined){
      swal("Error: Ingresar Numero de Booking"); 
      //return false;
    }else{
      let DetalleDatos = [];  
      for (var clave in this.Datos){
        DetalleDatos.push({'CodContenedor': this.Datos[clave].CodContenedor, 'Contenedor': this.Datos[clave].Contenedor, 'Bultos': Number.parseInt(this.Datos[clave].Bultos.toString()), 'Peso': Number.parseInt(this.Datos[clave].Peso.toString()), 'PctoAduana': this.Datos[clave].PctoAduana });
      }
      this.Datos = DetalleDatos;
      console.log("Detalle Booking Guardar "+ this.Datos);

     this.objGenerarRefrendoExpoRQT = {
      IDUser: Number.parseInt(localStorage.getItem("Usuario")),
      IDRol: Number.parseInt(localStorage.getItem("RolEmpUsuaCodigoDefault")),
      BookLineCodigo: this.Codigo,
      BookLineNroDoc: form.value.txtbox_NBooking,
      DAM: form.value.txtbox_NroDeDAM,
      Exportador: form.value.txtbox_Exportador,
      NumOrden: form.value.txtbox_NroDeOrden,
      Despachador: form.value.txtbox_Despachador,
      EntiCodAgencia: "",
      AgenciaAduana: form.value.txtbox_AgenciaDeAduana,
      FechaNum: form.value.txtbox_FechaDeNum,
      Mercancia: form.value.txtbox_Mercaderia,
      EmpaCodigo: "",
      Llenado: true,
      Deta: this.Datos
     }

     if(this.ValidarInput(this.objGenerarRefrendoExpoRQT))
     {        
       swal({
             text: "Error en los campos de ingreso, por favor verificar",
             icon: "warning",
           });
       return;
     }

     console.log("Datos REFRENDON " + JSON.stringify(this.objGenerarRefrendoExpoRQT));

/*      console.log("EMPEZAR A Imagenes")
     this.reqBase64.Carpeta = "E:\\TX";
     this.registrarBase64("E:\\TX"); */

     console.log("EMPEZAR A GUARDAR DATOS")
     this.reportService.GenerarRefrendoExpo(this.objGenerarRefrendoExpoRQT).subscribe( 
      data => { 
        this.objGenerarRefrendoExpoRPT= data;
        console.log("Mensaje : " + JSON.stringify(data)); 
        console.log("Ruta : " + data.Msj.toString()); 
        //swal(data[0].Msj.toString()); 

        console.log("EMPEZAR A Imagenes")
        this.reqBase64.Carpeta = data.Msj.toString();
        this.registrarBase64(data.Msj.toString());

        swal("Se Guardo Correctamente"); 
        this.cerrarPopup();
      }, 
      error => {
        swal("Error al crear Refrendo Expo"); 
        console.log("Error : ", error); 
      });  

    }
  }

  public Recalcular(){
    this.CantidadBultos=0;
    this.CantidadPeso=0;
    for (var clave in this.Datos){
      this.CantidadBultos =  this.CantidadBultos + Number.parseInt(this.Datos[clave].Bultos.toString());
      this.CantidadPeso =  this.CantidadPeso + + Number.parseInt(this.Datos[clave].Peso.toString());
    }  
  }

  public ValidarInput(param: GenerarRefrendoExpoRQT): boolean {

    if (this.NullEmpty(param.Exportador) ) {
      return true;
    } 

    if (this.NullEmpty(param.Despachador) ) {
      return true;
    } 

    if (this.NullEmpty(param.AgenciaAduana) ) {
      return true;
    } 

    if (this.NullEmpty(param.NumOrden) ) {
      return true;
    } 

    if (this.NullEmpty(param.DAM) ) {
      return true;
    } 

    if (this.NullEmpty(param.FechaNum) ) {
      return true;
    }

    if (this.NullEmpty(param.Mercancia) ) {
      return true;
    }
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.objGenerarRefrendoExpoRQT.FechaNum = this.objGenerarRefrendoExpoRQT.FechaNum.toLocaleDateString("es-ES",options);
    console.log(this.objGenerarRefrendoExpoRQT.FechaNum);
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

  public SetGrillaVisibility(paramControl: string, paramControl2: string, param: boolean) {
    if (param) {
      document.getElementById(paramControl).style.visibility = "visible";
      //document.getElementById(paramControl).style.visibility = "visible";
    }
    else {
      document.getElementById(paramControl).style.visibility = "hidden";
      if (paramControl2.length > 0) {
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
  /* 
    public ChangingValue(param : any)
    {
      if (param.target.value=="EVERFRESH" || param.target.value=="STAR COOL CA"){
        this.SetGrillaVisibility("SelectComboxAtmosphere","",true)
      }else if (param.target.value=="MAXTEND" || param.target.value=="TRANSFRESH")
      {
        this.CO2="";
        this.O2=""
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
    } */


  public ChangingValue(param: any, paramTipo: string) {
    if (paramTipo == "Modalidad") {
      this.ModalidadSelect = param.target.value;
    }
  }

}
