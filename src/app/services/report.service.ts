import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";
import { FacturasRPT, FacturasRQT, ListaUnidadNegocio } from '../models/Factura';


import { RepStockImpRQT } from "../models/rep_stockimpRQT";
import { RepStockImpRPT } from "../models/rep_stockimpRPT";


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
}
