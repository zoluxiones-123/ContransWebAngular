import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { LoginRQT } from "../models/user-LoginRQT";

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

  

  /////////////////////////////////////////////////////////////////////////
  // ACA ES EL METODO A UTILIZAR



  getStockImp(repstockrqt: RepStockImpRQT ): Observable<any> 
  {
    const url_api =`/ContransAPI/api/cntstockimp`;    
    return this.http
      .post<RepStockImpRPT>(
        url_api, repstockrqt, { headers: this.headers })
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

  //getCurrentUser(): UserInterfaceRPT {
  //  let user_string = localStorage.getItem("currentUser");
  //  if (!isNullOrUndefined(user_string)) {
  //    let user: UserInterfaceRPT = JSON.parse(user_string);
  //    return user;
  //  } else {
  //    return null;
  //  }
  //}

  // logoutUser() {
  //   let accessToken = localStorage.getItem("accessToken");
  //   const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("currentUser");
  //   return this.htttp.post<UserInterfaceRPT>(url_api, { headers: this.headers });
  // }
}
