import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
// variable global


/*

// variable global
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



const httpOptions1 = {
    headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }).append('Access-Control-Expose-Headers', 'X-Custom-header')
};
*/


@Injectable()
export class AuthenticationService {



  private headersRequest = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlserver = 'http://localhost:8080';

  private jwtToken: string = null;

  private roles: Array<any> = [];

  constructor(private http: HttpClient) { }


  adminshow = false;



  login(user) {
    console.log('********   user user  = ' + user);

    return this.http.post<any>(this.urlserver + '/login', user, { headers: this.headersRequest, observe: 'response' }).pipe(
      tap(
        springLoginResponse => {
          console.log(`********   springLoginResponse = ${JSON.stringify(springLoginResponse)}`);
          // return springLoginResponse.headers.get('Authorization');
        }
      ),
      catchError(e => throwError(e))

    );
  }


  logout(): any {
    this.deleteToken();
  }



  saveToken(jwtToken: string): void {
    this.jwtToken = jwtToken;

    localStorage.setItem('LoggedInUser', jwtToken);

    const jwtHelper = new JwtHelperService();

    console.log('saveToken jwtToken Bearer removed: ' + this.jwtToken.replace('Bearer ', ''));

    this.roles = jwtHelper.decodeToken(this.jwtToken.replace('Bearer ', '')).roles;

    for (const r of this.roles) {
      console.log('saveToken role authority' + r.authority);
    }

  }



  loadToken() {
    this.jwtToken = localStorage.getItem('LoggedInUser');
    console.log('this jwtToken in loadToken : ' + this.jwtToken);
  }



  isAdmin() {
    for (const r of this.roles) {
      if (r.authority === 'ADMIN') {
        console.log('isAdmin **********' + r.authority);
        this.adminshow = true;
        return true;
      }
      console.log('not admin **********' + r.authority);

    }

    this.adminshow = false;
    return false;

  }




  deleteToken() {
    this.jwtToken = null;
    this.roles = [];
    localStorage.removeItem('LoggedInUser');
    console.log('this jwtToken in deleteToken : jwtToken' + this.jwtToken);
  }



  getTasks() {

    if (this.jwtToken === null) { this.loadToken(); }

    if (this.headersRequest.get('Authorization') == null) {
      console.log('add Aithorization header ' + this.jwtToken);
      this.headersRequest.append('Authorization', this.jwtToken);
    }

    return this.http.get(this.urlserver + '/tasks', { headers: new HttpHeaders({ 'Authorization': this.jwtToken }) });
  }

}



// https://github.com/mrin9/Angular-SpringBoot-REST-JWT/tree/master/webui/src/app
// https://github.com/ipassynk/angular-springboot-jwt/blob/master/src/app/services/authentication.service.ts
