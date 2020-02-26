import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";
import { map, tap} from 'rxjs/operators';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../models/Factura';
import { TemperaturaRPT, TemperaturaRQT,TemperaturaDetalleRPT, TemperaturaDetalleRQT } from '../models/Temperatura';
import { DireccRQT, DireccRPT } from '../models/Direcc';
import { Base64RPT,Base64RQT } from '../models/Base64';


import { DetRepStockRealRQT } from  '../models/det_repstockreal'
import { DetRepStockRealRPT } from  '../models/det_repstockreal'
import { RepStockRealVacRPT } from  '../models/det_repstockreal'
import { RepStockRealVacRQT } from  '../models/det_repstockreal'


import { ZipRPT,ZipRQT } from '../models/ConvertirZip';


import { RepStockImpRQT } from "../models/rep_stockimpRQT";
import { RepStockImpRPT } from "../models/rep_stockimpRPT";

import { DetRepStockCliRQT } from "../models/det_repstockcli";
import { DetRepStockCliRPT } from "../models/det_repstockcli";
import { DetRepStockCliExpRPT } from "../models/det_repstockcli";


import { RepStockExpRQT } from "../models/rep_stockexpRQT";
import { RepStockExpRPT } from "../models/rep_stockexpRPT";


import { GrabarDireccRQT,GrabarDireccRPT } from '../models/GrabarDirecc';


import { RepEriRPT } from "../models/rep_eriRPT";
import { RepEriRQT } from "../models/rep_eriRQT";
import { RepOcupabilidad } from "../models/rep_ocupabilidad";
import { RepFillRate } from "../models/rep_fillrate";
import { SolicitudInscrip } from '../models/solicinsc';
import { RespSolicitud } from '../models/resp_solicinsc';
import { Entidades } from '../models/entidad';
import { entidad } from '../models/entidad';
import { entid } from '../models/entidad';
import { ArchivoDescarga } from '../models/Archivo';
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


  getStockRealDet(detrepstockrealrqt: RepStockRealVacRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockvactipo`;    
    return this.http
      .post<RepStockRealVacRPT>(
        url_api, detrepstockrealrqt, { headers: this.headers })
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
      .post<Entidades>(
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

  setGraficos(DatosGrafico :any) : Observable<any>{
    const url_api =`/ContransAPI/api/dashboardsactualizar`; 
    return this.http.post<any>(url_api, DatosGrafico, {headers: this.headers}).pipe(map(data=>data));
  }

  setOrdenGraficos (DatosOrdenGrafico : any) : Observable<any> {
    const url_api = `/ContransAPI/api/dashboardsorden`;
    return this.http.post<any>(url_api, DatosOrdenGrafico, {headers: this.headers}).pipe(map(data=>data));
  }



}
