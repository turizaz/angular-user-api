import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import {CreateComponent} from './create/create.component';


const routes: Routes = [
  {path: 'users', component: ListComponent},
  {path: 'users/page/:page', component: ListComponent},
  {path: 'users/page', component: ListComponent},
  {path: 'users/create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
