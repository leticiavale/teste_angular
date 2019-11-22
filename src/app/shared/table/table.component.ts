import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DataTable } from '../model/data-table';
import { QueryTerms } from '../model/query-terms';
import { ColClassService } from 'src/app/utils/col-class.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('pageModel', { static: false }) private pageModel: NgModel;

  @Input() dataTable:DataTable;
  @Input() queryTerms:QueryTerms;

  @Output() newButtonAction = new EventEmitter();
  @Output() searchFunction = new EventEmitter();

  @Input() noNewButton:boolean;

  private _noPage:boolean = false;

  @Input('noPage') 
  get noPage(): boolean {
    return this._noPage;
  }
  set noPage(value: boolean) {
    this._noPage = "" + value !== "false";
  }

  keywordSearchTimeOut:any;

  pageNumber:number = 1;

  constructor(private col:ColClassService) { }

  ngOnInit() {
  }

  initialize() {
  }

  changePageNumber() {
    if (this.pageNumber <= 0) {
      this.pageNumber = 1;
      this.pageModel.reset(this.pageNumber);
    }

    if (this.pageNumber > this.dataTable.totalPages) {
      this.pageNumber = this.dataTable.totalPages;

      this.pageModel.reset(this.pageNumber);
    }

    if (this.pageNumber > 0 && (this.pageNumber-1) != this.dataTable.pageable.pageNumber) {
      this.queryTerms.pageable.pageNumber = this.pageNumber - 1;
      this.searchFunction.emit();
    }
  }

  rowInitCount() {
    let init = 0;
    
    if (this.dataTable.totalElements > 0) {
      init = (this.dataTable.pageable.pageSize*this.dataTable.pageable.pageNumber)+1;
    }

    return init;
  }

  rowEndCount() {
    let end = this.dataTable.pageable.pageSize*(this.dataTable.pageable.pageNumber+1);

    if (end > this.dataTable.totalElements) {
      end = this.dataTable.totalElements;
    }

    return end;
  }

  changePageSize() {    
    this.searchFunction.emit();
  }

  addPageNumber(incremental:number) {
    this.pageNumber = +this.pageNumber + +incremental;

    this.changePageNumber();
  }

  countTimeToSearchKeyword() {
    let thisTable = this;

    clearTimeout(this.keywordSearchTimeOut);

    this.keywordSearchTimeOut = setTimeout(function(){      
      thisTable.search();
    }, 500);
  }

  search() {    
    this.searchFunction.emit();
  }

  callNewAction() {
    this.newButtonAction.emit();
  }
}
