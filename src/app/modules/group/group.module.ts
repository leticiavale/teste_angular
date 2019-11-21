import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { GroupRoutingModule } from './group-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    HttpClientModule,    
    FormsModule,
    SharedModule
  ],
  providers: []
})
export class GroupModule { }
