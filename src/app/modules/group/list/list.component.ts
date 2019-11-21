import { Component, OnInit } from '@angular/core';
import { DestroyUtils } from '../../../utils/DestroyUtils';
import { GroupService } from '../../../service/group.service';
import { ErrorHandlerService } from '../../../service/error-handler.service';
import { Group } from '../../../model/group';
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

  constructor(public groupService:GroupService,
              public errroHandlerService:ErrorHandlerService) { 
    super();
  }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.queryTerms.isSearching = true;

    this.subscription = this.groupService.getAll(this.queryTerms).subscribe(
      data=>{
        this.dataTable = data;
        this.queryTerms.isSearching = false;
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  delete(group:Group) {
    this.subscription = this.groupService.delete(group).subscribe(
      data=>{
        this.loadGroups();
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

}
