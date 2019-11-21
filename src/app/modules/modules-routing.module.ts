import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  { 
    path: '', 
    component: ModulesComponent,
    children: [
      { path: '', redirectTo: 'group', pathMatch: 'full' },
      { path: 'group', loadChildren: './group/group.module#GroupModule', canActivate:[AuthGuardService]},
      { path: 'client', loadChildren: './client/client.module#ClientModule', canActivate:[AuthGuardService]},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
