import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUserService } from './logged-user.service';
import { QueryTerms } from '../shared/model/query-terms';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token = null;

  public API = environment.apiPrefix;
  public headers;

  constructor(private httpClient:HttpClient, 
            private loggedUserService:LoggedUserService) {

    this.loggedUserService.loggedUser.subscribe(
      data=>{
        this.token = data;
        this.headers = new HttpHeaders().set('Content-Type','application/json')
                                        .append('Authorization',this.token);
      }
    );

  }

  get(url:string):Observable<any>{
    if (this.token) {
      return this.httpClient.get<any>(url,{'headers':this.headers});
    }
  }

  post(url:string,object?:Object):Observable<any>{    
    if (this.token) {
      return this.httpClient.post<any>(url,object?object:"{}",{'headers':this.headers});
    }
  }

  put(url:string,object?:Object):Observable<any>{
    if (this.token) {
      return this.httpClient.put<any>(url,object?object:"{}",{'headers':this.headers});
    }
  }

  delete(url:string):Observable<any>{
    if (this.token) {
      return this.httpClient.delete<any>(url,{'headers':this.headers});
    }
  }

  fillParamsQueryTerms(params:string, queryTerms:QueryTerms):string {
    if (queryTerms && queryTerms.pageable) {
      params += (params==""?"?":"&")+"page="+queryTerms.pageable.pageNumber+"&pageSize="+queryTerms.pageable.pageSize;
    } else { 
      params += (params==""?"?":"&")+"page=0&pageSize=99999";
    }

    if (queryTerms && queryTerms.keyword) {
      params += (params==""?"?":"&")+"keyword="+queryTerms.keyword;
    }

    if (queryTerms && queryTerms.showInactiveRegisters) {
      params += (params==""?"?":"&")+"showInactiveRegisters="+queryTerms.showInactiveRegisters;
    }

    return params;
  }

}
