import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Group } from '../model/group';
import { QueryTerms } from '../shared/model/query-terms';
import { DataTable } from '../shared/model/data-table';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  API = this.httpService.API + "group";

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

  get(id:number):Observable<Group> {
    let url = this.API+"/"+id;

    return this.httpService.get(url);
  }

  create(group:Group):Observable<Group> {
    let url = this.API;

    return this.httpService.post(url,group);
  }

  update(group:Group):Observable<Group> {
    let url = this.API+"/"+group.id;

    return this.httpService.put(url,group);
  }

  delete(group:Group) {
    if(!group || !group.id || group.id == 0) {
      return null;
    }

    let url = this.API+"/"+group.id;

    return this.httpService.delete(url);
  }

}
