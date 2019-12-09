import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })

  export class Usuario {

    headers: HttpHeaders = new HttpHeaders(
        {
          "Content-Type": "application/json"
        }
      );

    constructor(private http: HttpClient) {}

    obtUsuario(params : UsuarioRequest) : Observable<any>
    {
      const url_api =`/ContransAPI/api/obtUsuario`;    
      return this.http.post<UsuarioResponse>(
        url_api, params, { headers: this.headers }).pipe(map(data => data));
    }

    actualizarDatos(params : UsuarioRequest) : Observable<any>
    {
      const url_api =`/ContransAPI/api/actualizarDatos`;    
      return this.http.post<UsuarioResponse>(
        url_api, params, { headers: this.headers }).pipe(map(data => data));
    }

    cambiarClave(params : UsuarioRequest) : Observable<any>
    {
      const url_api =`/ContransAPI/api/xxxxxxxxxxx`;    
      return this.http.post<UsuarioResponse>(
        url_api, params, { headers: this.headers }).pipe(map(data => data));
    }


  }

  export class UsuarioRequest {
    IDUSer : number;
    Cargo : string;
    Telefono : string;
    Celular : string;
    Email : string;
    RolEmpUsuaCodigoDefault : number;    
 }

  export class UsuarioResponse {
    UsuaCodigo : number;
    UsuaNombres : string;
    UsuarioApellido : string;
    UsuaNumDoc : string;
    UsuaCargo : string;
    UsuaTelf : string;
    UsuaCelular : string;
    UsuaEmail : string;
  }

