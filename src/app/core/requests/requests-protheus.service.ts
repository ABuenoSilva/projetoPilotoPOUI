import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ProtheusLoginSucess } from "./requests.model";

@Injectable(
  {providedIn: 'root'}
)
export class RequestProtheusService  {

  private urlBase: string = 'http://127.0.0.1:8060/api';

  constructor(private http: HttpClient) { }

  doLogin(login: string, pwd: string) {

    let headers = new HttpHeaders();
    headers = headers.append('user-code', login);
    headers = headers.append('user-pwd', pwd);

    return this.http.post<ProtheusLoginSucess>(`${this.urlBase}/pousers/login`, null, { headers: headers });

  }
}
