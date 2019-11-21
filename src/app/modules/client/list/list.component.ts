import { Component, OnInit } from '@angular/core';
import { DestroyUtils } from '../../../utils/DestroyUtils';
import { ClientService } from '../../../service/client.service';
import { ErrorHandlerService } from '../../../service/error-handler.service';
import { Client } from '../../../model/client';
import { Status } from '../../../utils/enum/status';
import { DataTable } from '../../../shared/model/data-table';
import { QueryTerms } from '../../../shared/model/query-terms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends DestroyUtils implements OnInit {

  statusActive = Status.ACTIVE;

  keyword = "";

  dataTable:DataTable = new DataTable();
  queryTerms:QueryTerms = new QueryTerms();

  constructor(public clientService:ClientService,
              public errroHandlerService:ErrorHandlerService) { 
    super();
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.queryTerms.isSearching = true;

    this.subscription = this.clientService.getAll(this.queryTerms).subscribe(
      data=>{
        this.dataTable = data;
        this.queryTerms.isSearching = false;
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  delete(client:Client) {
    this.subscription = this.clientService.delete(client).subscribe(
      data=>{
        this.loadClients();
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  getPhones(client:Client) {
    if (!client.phones) {
      return "";
    }

    return client.phones.map(function(elem){
        return elem.phoneNumber;
    }).join(" | ");
  }

}
