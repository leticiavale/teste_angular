import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Client } from '../model/client';
import { QueryTerms } from '../shared/model/query-terms';
import { DataTable } from '../shared/model/data-table';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  API = this.httpService.API + "client";

  constructor(private httpService:HttpService) {
  }

  getAll(queryTerms?:QueryTerms, showInactiveRegisters?:Boolean):Observable<DataTable> {
    let url = this.API;
    let params = "";

    if (showInactiveRegisters) {
      params += "?showInactiveRegisters=true";
    }

    url = url + this.httpService.fillParamsQueryTerms(params,queryTerms);

    return this.httpService.get(url);
  }

  get(id:number):Observable<Client> {
    let url = this.API+"/"+id;

    return this.httpService.get(url);
  }

  create(client:Client):Observable<Client> {
    let url = this.API;

    return this.httpService.post(url,client);
  }

  update(client:Client):Observable<Client> {
    let url = this.API+"/"+client.id;

    return this.httpService.put(url,client);
  }

  delete(client:Client) {
    if(!client || !client.id || client.id == 0) {
      return null;
    }

    let url = this.API+"/"+client.id;

    return this.httpService.delete(url);
  }

}
