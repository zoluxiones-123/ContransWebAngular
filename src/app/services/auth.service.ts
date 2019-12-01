import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";

import { UserInterfaceRQT } from "../models/user-interfaceRQT";
import { UserInterfaceRPT } from "../models/user-interfaceRPT";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders(
      {
        "Content-Type": "application/json"
      }
    );

  loginuser(usuario: string, password: string): Observable<any> {
    const url_api =`/ContransAPI/api/login/${usuario}/${password}/wddwdw/dwwddw/asasas`;
    return this.http
      .get<UserInterfaceRPT>(
        url_api, 
        { headers: this.headers }
        )
      .pipe(map(data => data));
  }

  getIp()
  {
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      localStorage.setItem("DireccionIP", data.ip);
    })
  }

  loginusuario(login: LoginRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/loginSeg`;
    return this.http
      .post<UserInterfaceRPT>(
        url_api, login, { headers: this.headers })
      .pipe(map(data => data));
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserInterfaceRPT {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterfaceRPT = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  recuperarContrasena(login: LoginRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/recuperarContrasena`;
    return this.http
      .post<UserInterfaceRPT>(
        url_api, login, { headers: this.headers })
      .pipe(map(data => data));
  }



}
