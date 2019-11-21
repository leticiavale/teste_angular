import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { DataTable } from '../shared/model/data-table';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public API = environment.apiPrefix+"login";
  public headers = new HttpHeaders().set('Content-Type','application-json');

  constructor(private httpClient:HttpClient,
    private loggedUserService:LoggedUserService,) {
  }

  login(user:User):Observable<HttpResponse<Object>> {
    let url = this.API;
    let response:Observable<HttpResponse<Object>>;

    response = this.httpClient.post<HttpResponse<Object>>(url,user,{headers:this.headers,observe: 'response'});

    response.subscribe(
      data=> {
        if (data != null && data.status == 200) {
          this.loggedUserService.setLoggedUserFromToken(data.headers.get('Authorization'));
        }
      }
    )

    return response;
  }

}
