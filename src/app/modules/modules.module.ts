import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    ModulesRoutingModule,
    CommonModule,
    HttpClientModule,    
    FormsModule,
  ],
  providers: [
  ]
})
export class ModulesModule { }
