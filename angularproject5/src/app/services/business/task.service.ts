import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../infra/authentication.service';


// variable global

const headers = new HttpHeaders({ 'Content-Type': 'application/json'});


@Injectable()
export class TaskService {


    private urlserver = 'http://localhost:8080';

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


    getTasks() {

        // add jwt token to header
        // headers.append('Authorization', this.authenticationService.getToken());

       //  console.log('********   getTasks token = ' + this.authenticationService.getToken());


        return this.http.get<any>(this.urlserver + '/tasks',  { headers: headers, observe: 'response' }).pipe(
            tap(
                tasksResponse => {
                    console.log(`********   springLoginResponse = ${JSON.stringify(tasksResponse)}`);
                }
            )
        );
    }


 
}
