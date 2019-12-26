import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";
import { map, tap} from 'rxjs/operators';
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../models/Factura';


import { RepStockImpRQT } from "../models/rep_stockimpRQT";
import { RepStockImpRPT } from "../models/rep_stockimpRPT";
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

  SolicitudInsc(solicitudInsc: SolicitudInscrip ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/solicitodregistro`;    
    return this.http
      .post<RespSolicitud>(
        url_api, solicitudInsc, { headers: this.headers })
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

}
