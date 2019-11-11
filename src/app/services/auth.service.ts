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

  

  /////////////////////////////////////////////////////////////////////////
  // ACA ES EL METODO A UTILIZAR

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

  /////////////////////////////////////////////////////////////////////////

  // setUser(user: UserInterfaceRPT): void {
  //   let user_string = JSON.stringify(user);
  //   localStorage.setItem("currentUser", user_string);
  // }

  // setToken(token): void {
  //   localStorage.setItem("accessToken", token);
  // }

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

  // logoutUser() {
  //   let accessToken = localStorage.getItem("accessToken");
  //   const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("currentUser");
  //   return this.htttp.post<UserInterfaceRPT>(url_api, { headers: this.headers });
  // }
}
