import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';

const EXPORT_COMPONENTS = [
  TableComponent
];

@NgModule({
  declarations: [
    EXPORT_COMPONENTS
  ],
  imports: [
    CommonModule,    
    FormsModule
  ],
  exports: [
    EXPORT_COMPONENTS
  ],
  providers: []
})
export class SharedModule { }
