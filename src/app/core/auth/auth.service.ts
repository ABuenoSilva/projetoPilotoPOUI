import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RequestProtheusService } from "../requests/requests-protheus.service";

type userStruct = {
  userCode: string;
  userName: string;
  userRoles: [{
    roleCode: string
  }];
}

@Injectable()
export class AuthService {
  private isLogged = true; //false;
  private loggedUser: userStruct = { userCode: '', userName: '', userRoles: [{roleCode:''}]};
  constructor(private router: Router, private requestsProtheusService: RequestProtheusService){}

  async authenticate(login: string, password: string): Promise<boolean> {

    this.isLogged = false;

    return new Promise<boolean>((resolve, reject) => {
      this.requestsProtheusService.doLogin(login, password)
        .subscribe({
          next: retorno => {
            console.log(retorno);
            if (retorno['_messages'][0]['code'] === '200') {
              this.isLogged = true;
              this.loggedUser = {
                userCode: retorno.userCode,
                userName: retorno.userName,
                userRoles: retorno.userRoles
              }
            } else {
              throw new Error("Houve um erro inesperado");
            }
            resolve(this.isLogged);
          },
          error: error => {
            console.log(error);
          }
        });
    });

  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }

  getUserCode(): string {
    return this.loggedUser.userCode;
  }

  getUserName(): string {
    return this.loggedUser.userName;
  }

  getUserRoles() {
    return this.loggedUser.userRoles;
  }

  logout() {
    this.isLogged = false;
    this.loggedUser = { userCode: '', userName: '', userRoles: [{roleCode:''}]};
    //Roteamento "dummy" para o caso de já estar na home e forçar o refresh
    this.router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/']));

  }
}
