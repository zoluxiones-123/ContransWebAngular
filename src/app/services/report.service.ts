import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";
import { map, tap} from 'rxjs/operators';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio,TiposCarga, AlmacenRQT, Almacenes, TiposCita, UniNegocio } from '../models/Factura';
import { TemperaturaRPT,BuscarNuevoCartaDetalleTemperaturaRQT,BuscarNuevoCartaDetalleTemperaturaRPT,BuscarCartaDetalleTemperaturaRQT,BuscarCartaDetalleTemperaturaRPT,NuevoCartaDetalleTemperaturaRQT,NuevoCartaDetalleTemperaturaRPT,CartaDetalleTemperaturaRQT,CartaDetalleTemperatura2RQT,CartaDetalleTemperatura2RPT,ActualizarCartaDetalleTemperaturaRQT,ActualizarCartaDetalleTemperaturaRPT,CartaDetalleTemperaturaRPT,TemperaturaRQT,TemperaturaDetalleRPT, AnularCerrarCartaTemperaturaRPT,AnularCerrarCartaTemperaturaRQT,TemperaturaDetalleRQT,CartaTemperaturaRQT,CartaTemperaturaRPT, ListaEstado } from '../models/Temperatura';
import { GenerarRefrendoExpoActualizarRQT,GenerarRefrendoExpoActualizarRPT,ConsultaIDBookingRefrendoExpoRQT,ConsultaIDBookingRefrendoExpoRPT,ListaRegimenRefrendoExpo,AnularRefrendoExpoRQT,AnularRefrendoExpoRPT,ConsultaRefrendoExpoRQT, ConsultaRefrendoExpoRPT, ConsultaBookingRefrendoExpoRQT, ConsultaBookingRefrendoExpoRPT, GenerarRefrendoExpoRQT, GenerarRefrendoExpoRPT, ListaEstadoRefrendoExpo,ListaModalidadRefrendoExpo, Despachadores, AgenciaAduanera, Productos,ListaDetallePagoCobranzaDetalleRQT,ListaDetallePagoCobranzaDetalleRPT,ImprimirRefrendoExpoRPT,ImprimirRefrendoExpoRQT } from '../models/RefrendoExpo';
import {ConsultaPagosServicioRQT,ConsultaPagosServicioRPT,ListaEstadoPagoCobranza} from '../models/Pagos';
import { CitasRPT, CitasRQT, Citas, TokenCitaRPT, TokenCitaRQT, ActCitaRPT, ActCitaRQT, ValidarTokenCitaRPT, 
  ValidarTokenCitaRQT, ActTokenCitaRPT, ActTokenCitaRQT, AnularCitaRPT, AnularCitaRQT, ImpriCitaRPT, ImpriCitaRQT,
  CitaPermisoRPT, CitaPermisoRQT, CitasPermiso, CitaLContenedorRPT, CitaLContenedorRQT, CitasContenedor,
  CitasCFechaRPT, CitasCFechaRQT, CitasCHoras, CitasCHorasRPT, CitasCHorasRQT,TipoContenedor, TipoContenedores,
   InsertarCitaDetalleRPT, InsertarCitaDetalleRQT, InsertarCitaRPT, InsertarCitaRQT } from '../models/Cita';
import { DireccRQT, DireccRPT } from '../models/Direcc';
import { AutEntregaPrec,AutEntregaPrecRPT, AutEntregaPrecRQT,LiquidacionBRPT, LiquidacionBRQT, LiquidacionCont, ValidaEdiPrecRPT,
ValidaEdiPrecRQT, ActualizaPrecRPT, ActualizaPrecRQT, ValidaFacturarARPT, ValidaFacturarARQT, ValidarTerceroRPT, ValidarTerceroRQT,
ClienteTrans,ClienteTransConsRPT,ClienteTransConsRQT,RegClienteTransRPT, RegClienteTransRQT, MensajeRPT,MensajeRQT,VisualizarLiqRPT,
VisualizarLiqRQT,RegLiquidacionRPT, RegLiquidacionRQT } from '../models/Liquidacion';

import { ListaTareaRQT,ListaTareaRPT,GenerarSolicitudRQT,GenerarSolicitudRPT,ConsultarSolicitudRPT,ConsultarSolicitudRQT, SolicitudServicio, EstSolServicio, 
  EstadoSolServicio,ConsultarVolanteSolicitudRQT,ConsultarVolanteSolicitudRPT,ImprimirSolicitudRPT,ImprimirSolicitudRQT,AnularSolServRPT,
AnularSolServRQT }
from '../models/SolicitudServicio';

import { Base64RPT,Base64RQT } from '../models/Base64';

import { ConsultaPendientesRPT,ConsultaPendientesRQT, PagoProcesar, PagosProcesarRPT, PagosProcesarRQT }from '../models/Pagos';


import { DetRepStockRealRQT } from  '../models/det_repstockreal'
import { DetRepStockRealRPT } from  '../models/det_repstockreal'
import { RepStockRealVacRPT } from  '../models/det_repstockreal'
import { RepStockRealVacRQT } from  '../models/det_repstockreal'


import { ZipRPT,ZipRQT } from '../models/ConvertirZip';


import { RepStockImpRQT } from "../models/rep_stockimpRQT";
import { RepStockImpRPT } from "../models/rep_stockimpRPT";

import { DetRepStockEstRQT, DetRepStockCliRQT } from "../models/det_repstockcli";
import { DetRepStockEstRPT, DetRepStockCliRPT } from "../models/det_repstockcli";
import { DetRepStockCliExpRPT } from "../models/det_repstockcli";


import { RepStockExpRQT } from "../models/rep_stockexpRQT";
import { RepStockExpRPT } from "../models/rep_stockexpRPT";


import { GrabarDireccRQT,GrabarDireccRPT } from '../models/GrabarDirecc';

import { ConsultaLevanteRPT,ConsultaLevanteRQT, DetConsLevante,EstadoSolPermiso,ConsultaSolPermisoRPT,ConsultaSolPermisoRQT,
SolicitudPermiso,RegistrarSolPermisoRPT,RegistrarSolPermisoRQT,ConsultaLevanteMasivoRPT,ConsultaLevanteMasivoRQT,
ConsultaSolPerEstRPT,ConsultaSolPerEstRQT,SolPerArchivoRPT,SolPerArchivoRQT,RegistrarObsPagoRPT,RegistrarObsPagoRQT, 
FormatoExcel,PermisoListarRPT,PermisoListarRQT,PermisoImprimirRPT,PermisoImprimirRQT } 
from "../models/Permiso";


import { RepEriRPT } from "../models/rep_eriRPT";
import { RepEriRQT } from "../models/rep_eriRQT";
import { RepOcupabilidad } from "../models/rep_ocupabilidad";
import { RepFillRate } from "../models/rep_fillrate";
import { SolicitudInscrip } from '../models/solicinsc';
import { RespSolicitud } from '../models/resp_solicinsc';
import { Entidades, Transp } from '../models/entidad';
import { entidad } from '../models/entidad';
import { entid } from '../models/entidad';
import { ArchivoDescarga,StringArchivoDescarga } from '../models/Archivo';
import { ResourceLoader } from "@angular/compiler";
import { HttpResponse } from "selenium-webdriver/http";
import { MenuPaginaRPS } from "app/models/PaginasMenu";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders(
      {
        "Content-Type": "application/json"
      }
    );

  getStockImp(repstockrqt: RepStockImpRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockimp`;    
    return this.http
      .post<RepStockImpRPT>(
        url_api, repstockrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getStockImpCli(detrepstockclirqt: DetRepStockCliRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockimpclien`;    
    return this.http
      .post<DetRepStockCliRPT>(
        url_api, detrepstockclirqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getStockReal(repstockrealrqt: DetRepStockRealRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockvac`;    
    return this.http
      .post<DetRepStockRealRPT>(
        url_api, repstockrealrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getSolicitudServicio(consultasolrqt: ConsultarSolicitudRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarsolicitud`;    
    return this.http
      .post<ConsultarSolicitudRPT>(
        url_api, consultasolrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getSolicitudPermiso(consultasolperrqt: ConsultaSolPermisoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarsolicitudpermiso`;    
    return this.http
      .post<ConsultaSolPermisoRPT>(
        url_api, consultasolperrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getPermisosListar(perlistrqt: PermisoListarRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/permisoslistar`;    
    return this.http
      .post<PermisoListarRPT>(
        url_api, perlistrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  
  getSolicitudPermisoxEstado(consultasolperestrqt: ConsultaSolPerEstRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarsolicitudpermisoxestado`;    
    return this.http
      .post<ConsultaSolPerEstRPT>(
        url_api, consultasolperestrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  
  RegistrarSolicitudPermiso(regsolperrqt: RegistrarSolPermisoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/registrarsolicitudpermiso`;    
    return this.http
      .post<RegistrarSolPermisoRPT>(
        url_api, regsolperrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  RegistrarObsPago(regobspagrqt: RegistrarObsPagoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/registratobservacionpago`;    
    return this.http
      .post<RegistrarObsPagoRPT>(
        url_api, regobspagrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  
  ImprimirSolicitudServicio(imprimirsolrqt: ImprimirSolicitudRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/imprimirsolicitudservicio`;    
    return this.http
      .post<ImprimirSolicitudRPT>(
        url_api, imprimirsolrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  ImprimirPermiso(impperrqt: PermisoImprimirRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/permisosimprimir`;    
    return this.http
      .post<PermisoImprimirRPT>(
        url_api, impperrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  
  ImprimirSolicitudPermiso(imprimirsolperrqt: SolPerArchivoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarsolicitudpermisoarchivo`;    
    return this.http
      .post<SolPerArchivoRPT>(
        url_api, imprimirsolperrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getEstadosSolPermiso(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/estadosolicitudpermiso`;    
    return this.http
      .post<EstadoSolPermiso>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  AnularSolicitudServicio(anularsolrqt: AnularSolServRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/anularsolicitud`;    
    return this.http
      .post<AnularSolServRPT>(
        url_api, anularsolrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getAutorizacionPersonal(autentregaprecrqt: AutEntregaPrecRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultaautorizacionpersonal`;    
    return this.http
      .post<AutEntregaPrecRPT>(
        url_api, autentregaprecrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getMensajeLiquidacion(menslrqt: MensajeRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/mensajeliquidacion`;    
    return this.http
      .post<MensajeRPT>(
        url_api, menslrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  getPendientesCancelar(conspencanrqt: ConsultaPendientesRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/pendientesacancelar`;    
    return this.http
      .post<ConsultaPendientesRPT>(
        url_api, conspencanrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getLiquidacion(liquidacionbrqt: LiquidacionBRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/liquidacionbuscar`;    
    return this.http
      .post<LiquidacionBRPT>(
        url_api, liquidacionbrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getLevante(levanterqt: ConsultaLevanteRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultalevante`;    
    return this.http
      .post<ConsultaLevanteRPT>(
        url_api, levanterqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getLevanteMasivo(levantemasrqt: ConsultaLevanteMasivoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultalevantemasivo`;    
    return this.http
      .post<ConsultaLevanteMasivoRPT>(
        url_api, levantemasrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  
  getVisLiquidacion(visliquirqt: VisualizarLiqRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/visualizarliquidacion`;    
    return this.http
      .post<VisualizarLiqRPT>(
        url_api, visliquirqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  
  RegLiquidacion(regliquirqt: RegLiquidacionRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/registrarliquidacion`;    
    return this.http
      .post<RegLiquidacionRPT>(
        url_api, regliquirqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  getCitas(citasrqt: CitasRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarcita`;    
    return this.http
      .post<Citas>(
        url_api, citasrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getCitasPermiso(citaperqt: CitaPermisoRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/consultarcitapermiso`;    
    return this.http
      .post<CitasPermiso>(
        url_api, citaperqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getCitasLContenedores(citacontrqt: CitaLContenedorRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/citaslistarcontenedores`;    
    return this.http
      .post<CitasContenedor>(
        url_api, citacontrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  InsertarCita(inscitarqt: InsertarCitaRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/insertarcita`;    
    return this.http
      .post<InsertarCitaRPT>(
        url_api, inscitarqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  InsertarCitaDetalle(inscitadetrqt: InsertarCitaDetalleRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/insertarcitadetalle`;    
    return this.http
      .post<InsertarCitaDetalleRPT>(
        url_api, inscitadetrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  InsertarClienteTransportista(regclitransrqt: RegClienteTransRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/registrarclientetransportista`;    
    return this.http
      .post<RegClienteTransRPT>(
        url_api, regclitransrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  generarTokenCita(tokencitarqt: TokenCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/generarTokenCita`;    
    return this.http
      .post<TokenCitaRPT>(
        url_api, tokencitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  
  ImprimirCita(impcitarqt: ImpriCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/imprimircita`;    
    return this.http
      .post<ImpriCitaRPT>(
        url_api, impcitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  validarTokenCita(valtokencitarqt: ValidarTokenCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/validarTokenCita`;    
    return this.http
      .post<ValidarTokenCitaRPT>(
        url_api, valtokencitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  ValidaEdiPrec(valediprecrqt: ValidaEdiPrecRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/validaedicionprecintos`;    
    return this.http
      .post<ValidaEdiPrecRPT>(
        url_api, valediprecrqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  ValidarFacturarA(valfactarqt: ValidaFacturarARQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/validarfacturara`;    
    return this.http
      .post<ValidaFacturarARPT>(
        url_api, valfactarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  
  ValidarTercero(valtercrqt: ValidarTerceroRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/validartercero`;    
    return this.http
      .post<ValidarTerceroRPT>(
        url_api, valtercrqt, { headers: this.headers })
      .pipe(map(data => data));      
  }
    
  ActualizaPrecinto(actprecintorqt: ActualizaPrecRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/actualizaprecintos`;    
    return this.http
      .post<ActualizaPrecRPT>(
        url_api, actprecintorqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  
  actualizarTokenCita(acttokencitarqt: ActTokenCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/actualizarTokenCita`;    
    return this.http
      .post<ActTokenCitaRPT>(
        url_api, acttokencitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  ActualizarCita(actcitarqt: ActCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/actualizarcita`;    
    return this.http
      .post<ActCitaRPT>(
        url_api, actcitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }

  AnularCita(anucitarqt: AnularCitaRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/anularcita`;    
    return this.http
      .post<AnularCitaRPT>(
        url_api, anucitarqt, { headers: this.headers })
      .pipe(map(data => data));      
  }


  getStockRealDet(detrepstockrealrqt: RepStockRealVacRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockvactipo`;    
    return this.http
      .post<RepStockRealVacRPT>(
        url_api, detrepstockrealrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getClienteTransportista(clitransrqt: ClienteTransConsRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/clientetransportistaconsultar`;    
    return this.http
      .post<ClienteTransConsRPT>(
        url_api, clitransrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

   
  getStockExpCli(detrepstockclirqt: DetRepStockCliRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockimpclienexp`;    
    return this.http
      .post<DetRepStockCliExpRPT>(
        url_api, detrepstockclirqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getDetStockEst(detrepstockestrqt: DetRepStockEstRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockimpdia`;    
    return this.http
      .post<DetRepStockEstRPT>(
        url_api, detrepstockestrqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getDetStockEstExp(detrepstockestrqt: DetRepStockEstRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockexpdia`;    
    return this.http
      .post<DetRepStockCliExpRPT>(
        url_api, detrepstockestrqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getStockExp(repstockrqt: RepStockExpRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockexp`;    
    return this.http
      .post<RepStockExpRPT>(
        url_api, repstockrqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  SolicitudInsc(solicitudInsc: SolicitudInscrip ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/solicitodregistro`;    
    return this.http
      .post<RespSolicitud>(
        url_api, solicitudInsc, { headers: this.headers })
      .pipe(map(data => data));
  }

  RegDireccionamiento(reqgrabarDirecc: GrabarDireccRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/generardireccionamiento`;    
    return this.http
      .post<GrabarDireccRPT>(
        url_api, reqgrabarDirecc, { headers: this.headers })
      .pipe(map(data => data));      
  }

  ConvertirZip(reqZip: ZipRQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/convertirzip`;    
    return this.http
      .post<ZipRPT>(
        url_api, reqZip, { headers: this.headers })
      .pipe(map(data => data));      
  }

  RegistrarBase64(reqgrabarBase64: Base64RQT): Observable<any> 
  {
    const url_api =`/ContransAPI/api/guardarbase64`;    
    return this.http
      .post<Base64RPT>(
        url_api, reqgrabarBase64, { headers: this.headers })
      .pipe(map(data => data));      
  }

  getOcupabilidad(repstockrqt: RepStockImpRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/ocupabilidad`;    
    return this.http
      .post<RepOcupabilidad>(
        url_api, repstockrqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getListaEntidades(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/entidadlist`;    
    return this.http
      .post<Entidades>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  
  getListaTransportistas(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/transportistanavis`;    
    return this.http
      .post<Transp>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getListaDespachador(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/despachadorlista`;    
    return this.http
      .post<Despachadores>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getListaAgenciaAduana(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/agencialistar`;    
    return this.http
      .post<AgenciaAduanera>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  getListaNaves(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/navelist`;    
    return this.http
      .post<Entidades>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  getListaNaviera(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/listvacnaviera`;    
    return this.http
      .post<Entidades>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  getStockVacios(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/listvacnaviera`;    
    return this.http
      .post<Entidades>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
  
  getListaProductos(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/productoslist`;    
    return this.http
      .post<Productos>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  search(filter: {nombre: string} = {nombre: ''}, page = 1): Observable<Entidades> {
    const url_api =`/ContransAPI/api/entidadlist`;   

    return this.http
    .post<Entidades>(
      url_api, { headers: this.headers })
    .pipe(
      tap((response: Entidades) => {
        //response.results = response.results
        response.Data = response.Data
          .map(enti => new entid(enti.Entidad, enti.Nombre))
          //map(enti => Data )
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(enti => enti.Nombre.toLowerCase().includes(filter.nombre.toLowerCase()))

        return response;
      })
      );
  }


  
  getEri(reperirqt: RepEriRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/eri`;    
    return this.http
      .post<RepEriRPT>(
        url_api, reperirqt, { headers: this.headers })
      .pipe(map(data => data));
  }

  getFillRate(repstockrqt: RepStockImpRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/fillrate`;    
    return this.http
      .post<RepFillRate>(
        url_api, repstockrqt, { headers: this.headers })
      .pipe(map(data => data));
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }

  getFacturas(objFacturas : FacturasRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/facturarpt`;    
    return this.http.post<FacturasRPT>(
      url_api, objFacturas, { headers: this.headers }).pipe(map(data => data));
  }

  getTemperatura(objTemperatura : TemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultartemperatura`;    
    return this.http.post<TemperaturaRPT>(
      url_api, objTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  getTemperaturaDetalle(objTemperaturaDetalle : TemperaturaDetalleRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultareeferfecha`;    
    console.log(objTemperaturaDetalle);
    //console.log(this.http.post<TemperaturaDetalleRPT>(
     // url_api, objTemperaturaDetalle, { headers: this.headers }).pipe(map(data => data) ))
    return this.http.post<TemperaturaDetalleRPT>(
      url_api, objTemperaturaDetalle, { headers: this.headers }).pipe(map(data => data) );
      
  }

  getCartaTemperatura(objCartaTemperatura : CartaTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultacartatemperatura`;    
    return this.http.post<CartaTemperaturaRPT>(
      url_api, objCartaTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  getDetalleCartaTemperatura(objDetalleCartaTemperatura : CartaDetalleTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperaturapt`;    
    return this.http.post<CartaDetalleTemperaturaRPT>(
      url_api, objDetalleCartaTemperatura, { headers: this.headers }).pipe(map(data => data));
  }
  getDetalleCartaNuevoTemperatura(objDetalleCartaNuevoTemperatura : BuscarNuevoCartaDetalleTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/MostrarDatosBookingCartaTemperatura`;    
    return this.http.post<BuscarNuevoCartaDetalleTemperaturaRPT>(
      url_api, objDetalleCartaNuevoTemperatura, { headers: this.headers }).pipe(map(data => data));
  }
  getDetalleCartaTemperatura2(objDetalleCartaTemperatura2 : CartaDetalleTemperatura2RQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/MostrarContenedorBookingCartaTemperatura`;    
    return this.http.post<CartaDetalleTemperatura2RPT>(
      url_api, objDetalleCartaTemperatura2, { headers: this.headers }).pipe(map(data => data));
  }
  AnularCartaTemperatura(objAnularCerrarCartaTemperatura : AnularCerrarCartaTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperaturaanular`;    
    return this.http.post<AnularCerrarCartaTemperaturaRPT>(
      url_api, objAnularCerrarCartaTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  CerrarCartaTemperatura(objAnularCerrarCartaTemperatura : AnularCerrarCartaTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperaturacerrar`;    
    return this.http.post<AnularCerrarCartaTemperaturaRPT>(
      url_api, objAnularCerrarCartaTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  ActualizarCartaTemperatura(objActualizarCartaDetalleTemperatura : ActualizarCartaDetalleTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperaturaactualizar`;    
    return this.http.post<ActualizarCartaDetalleTemperaturaRPT>(
      url_api, objActualizarCartaDetalleTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  NuevoCartaTemperatura(objNuevoCartaDetalleTemperatura : NuevoCartaDetalleTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperaturaregistrar`;    
    return this.http.post<NuevoCartaDetalleTemperaturaRPT>(
      url_api, objNuevoCartaDetalleTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  BuscarCartaTemperatura(objBuscarCartaDetalleTemperatura : BuscarCartaDetalleTemperaturaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/validarbooking`;    
    return this.http.post<BuscarCartaDetalleTemperaturaRPT>(
      url_api, objBuscarCartaDetalleTemperatura, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaRefrendoExpo(objConsultaRefrendoExpo : ConsultaRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/refrendoconsultar`;    
    return this.http.post<ConsultaRefrendoExpoRPT>(
      url_api, objConsultaRefrendoExpo, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaPagosServicio(objConsultaPagosServicioRQT : ConsultaPagosServicioRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultaservicio`;    
    return this.http.post<ConsultaPagosServicioRPT>(
      url_api, objConsultaPagosServicioRQT, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaBookingRefrendoExpo(objConsultaBookingRefrendoExpo : ConsultaBookingRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultarbooking`;    
    return this.http.post<ConsultaBookingRefrendoExpoRPT>(
      url_api, objConsultaBookingRefrendoExpo, { headers: this.headers }).pipe(map(data => data));
  }

  ImprimirRefrendoExpo(objImprimirRefrendoExpo : ImprimirRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/imprimirrefrendo`;    
    return this.http.post<ImprimirRefrendoExpoRPT>(
      url_api, objImprimirRefrendoExpo, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaIDBookingRefrendoExpo(objConsultaIDBookingRefrendoExpoRQT : ConsultaIDBookingRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/refrendoconsultarid`;    
    return this.http.post<ConsultaIDBookingRefrendoExpoRPT>(
      url_api, objConsultaIDBookingRefrendoExpoRQT, { headers: this.headers }).pipe(map(data => data));
  }

  GenerarRefrendoExpo(objGenerarRefrendoExpo : GenerarRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/generarrefrendo`;    
    return this.http.post<GenerarRefrendoExpoRPT>(
      url_api, objGenerarRefrendoExpo, { headers: this.headers }).pipe(map(data => data));
  }

  ActualizarRefrendoExpo(objGenerarRefrendoExpoActualizar : GenerarRefrendoExpoActualizarRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/actualizarrefrendo`;    
    return this.http.post<GenerarRefrendoExpoActualizarRPT>(
      url_api, objGenerarRefrendoExpoActualizar, { headers: this.headers }).pipe(map(data => data));
  }

  AnularRefrendoExpo(objAnularRefrendoExpo : AnularRefrendoExpoRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/anularfrendo`;    
    return this.http.post<AnularRefrendoExpoRPT>(
      url_api, objAnularRefrendoExpo, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaEstadoRefrendoExpo() : Observable<any>
  {
    const url_api =`/ContransAPI/api/refrendoestado`;
    return this.http.get<Array<ListaEstadoRefrendoExpo>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaEstadoPagoCobranza() : Observable<any>
  {
    const url_api =`/ContransAPI/api/estados`;
    return this.http.get<Array<ListaEstadoPagoCobranza>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }
  
  ConsultaModalidadRefrendoExpo() : Observable<any>
  {
    const url_api =`/ContransAPI/api/listarempaque`;
    return this.http.get<Array<ListaModalidadRefrendoExpo>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaRegimenRefrendoExpo() : Observable<any>
  {
    const url_api =`/ContransAPI/api/regimenrefrendo`;
    return this.http.get<Array<ListaRegimenRefrendoExpo>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  ConsultaTarea(objListaTarea : ListaTareaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/tareasolicitud`;    
    return this.http.post<ListaTareaRPT>(
      url_api, objListaTarea, { headers: this.headers }).pipe(map(data => data));
  }

   ConsultaPagoCobranzaDetalle(objConsultaPagoCobranzaDetalle : ListaDetallePagoCobranzaDetalleRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/liquidacionxservicio`;    
    return this.http.post<ListaDetallePagoCobranzaDetalleRPT>(
      url_api, objConsultaPagoCobranzaDetalle, { headers: this.headers }).pipe(map(data => data));
  } 


  getDirecc(objDirecc : DireccRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/facturarpt`;    
    return this.http.post<DireccRPT>(
      url_api, objDirecc, { headers: this.headers }).pipe(map(data => data));
  }

  getunidadnegociolist() : Observable<any>
  {
    const url_api =`/ContransAPI/api/unidadnegociolist`;
    return this.http.get<Array<ListaUnidadNegocio>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  getunidadnegocio() : Observable<any>
  {
    const url_api =`/ContransAPI/api/unidadnegocio`;
    return this.http.get<UniNegocio>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  gettipoconsulta() : Observable<any>
  {
    const url_api =`/ContransAPI/api/tipoconsulta`;
    return this.http.get<UniNegocio>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  
  getaduana() : Observable<any>
  {
    const url_api =`/ContransAPI/api/aduana`;
    return this.http.get<UniNegocio>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  getregimen() : Observable<any>
  {
    const url_api =`/ContransAPI/api/regimen`;
    return this.http.get<UniNegocio>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

   getestadolist() : Observable<any>
  {
    const url_api =`/ContransAPI/api/cartatemperatutraestado`;
    return this.http.get<Array<ListaEstado>>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }
  getunidadnegocioxtipo(objAlmRqt : AlmacenRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/listaralmace`;
    return this.http.post<Almacenes>(
        url_api, objAlmRqt, { headers: this.headers }).pipe(map(data => data));
  }

  getTipoCarga() : Observable<any>
  {
    const url_api =`/ContransAPI/api/listarempaque`;
    return this.http.get<TiposCarga>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }
  
  getEstSolicitudServ() : Observable<any>
  {
    const url_api =`/ContransAPI/api/estadosolicitud`;
    return this.http.get<EstadoSolServicio>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }
  
  getValidarHorayFecha(): Observable<any> 
  {
    const url_api =`/ContransAPI/api/validarhorafecha`;    
    return this.http
      .post<Entidades>(
        url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  ConsultarVolanteSolicitud(objConsultarVolanteSolicitud : ConsultarVolanteSolicitudRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/consultarvolantesolicitud`;    
    return this.http.post<ConsultarVolanteSolicitudRPT>(
      url_api, objConsultarVolanteSolicitud, { headers: this.headers }).pipe(map(data => data));
  }

  GenerarSolicitud(objGenerarSolicitud : GenerarSolicitudRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/generarsolicitud`;    
    return this.http.post<GenerarSolicitudRPT>(
      url_api, objGenerarSolicitud, { headers: this.headers }).pipe(map(data => data));
  }

  getTipoContenedor() : Observable<any>
  {
    const url_api =`/ContransAPI/api/listartipocontenedor`;
    return this.http.get<TipoContenedores>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  getFormatoExcel() : Observable<any>
  {
    const url_api =`/ContransAPI/api/solicitudpermisoformato`;
    return this.http.get<FormatoExcel>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  
  getTiposCita() : Observable<any>
  {
    const url_api =`/ContransAPI/api/listatipocita`;
    return this.http.get<TiposCita>(
        url_api, { headers: this.headers }).pipe(map(data => data));
  }

  

  getCitasConsultarFecha(citacfecharqt : CitasCFechaRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/citasconsultarfecha`;
    return this.http.post<CitasCFechaRPT>(
        url_api, citacfecharqt, { headers: this.headers }).pipe(map(data => data));
  }

  
  getCitasConsultarHoras(citachorarqt : CitasCHorasRQT) : Observable<any>
  {
    const url_api =`/ContransAPI/api/citasconsultarhoras`;
    return this.http.post<CitasCHoras>(
        url_api, citachorarqt, { headers: this.headers }).pipe(map(data => data));
  }


  getArchivoByte(paramUri:string, paramNombre:string, paramTipoArchivo:string) : Observable<any>{
    const url_api =`/ContransAPI/api/dercargarbase64`;

    let objArchivo : ArchivoDescarga =  {
      FilePath : paramUri.replace(/\\\\/g, "\\"),
      FileName : paramNombre,
      DocumentType : paramTipoArchivo
    };

    let resul = this.http.post<string>(
        url_api, objArchivo, { headers: this.headers}).pipe(map(data => data));

    return resul; 
  }

  ImprimirPDF(paramUsuario:number, paramIdCT:string, paramIDRol:number) : Observable<any>{
    const url_api =`/ContransAPI/api/imprimircartatemperatura`;
    let objArchivo : StringArchivoDescarga =  {
      Usuario : paramUsuario,
      IdCT : paramIdCT.toString(),
      IDRol : paramIDRol
    };
    console.log(objArchivo);
    let resul = this.http.post<string>(
        url_api, objArchivo, { headers: this.headers}).pipe(map(data => data));
    return resul; 
  }
  
  getretiroestado(paramIDUSer:string, paramIDRol:string, paramContenedor:string) : Observable<any>
  {
    const url_api =`/ContransAPI/api/retiroestado`; 
    
    let objRequesta = {
      IDUSer : paramIDUSer,
      IDRol : paramIDRol,
      Contenedor : paramContenedor
    }
    return this.http.post(
      url_api, objRequesta, { headers: this.headers }).pipe(map(data => data));
  }

  getMenu(paramIDUSer:string, paramIDRol:string) : Observable<any>{
    const url_api =`/ContransAPI/api/menu`; 
    let objRequesta = {
      CodUsuario : paramIDUSer,
      CodRol : paramIDRol
    }

    return this.http.post<MenuPaginaRPS>(url_api, objRequesta, {headers: this.headers}).pipe(map(data=>data));
  }

  getGraficos(paramIDUSer:string, paramIDRol:string) : Observable<any>{
    const url_api =`/ContransAPI/api/dashboardsusuario`; 
    let objRequesta = {
      CodUsuario : paramIDUSer,
      CodRol : paramIDRol
    }

    return this.http.post<any>(url_api, objRequesta, {headers: this.headers}).pipe(map(data=>data));
  }

  ProcesarPagosOnLine(procpagrqt: PagosProcesarRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/procesarpagos`;    
    return this.http
      .post<PagosProcesarRPT>(
        url_api, procpagrqt, { headers: this.headers })
      .pipe(map(data => data));
  }


  setGraficos(DatosGrafico :any) : Observable<any>{
    const url_api =`/ContransAPI/api/dashboardsactualizar`; 
    return this.http.post<any>(url_api, DatosGrafico, {headers: this.headers}).pipe(map(data=>data));
  }

  setOrdenGraficos (DatosOrdenGrafico : any) : Observable<any> {
    const url_api = `/ContransAPI/api/dashboardsorden`;
    return this.http.post<any>(url_api, DatosOrdenGrafico, {headers: this.headers}).pipe(map(data=>data));
  }



}
