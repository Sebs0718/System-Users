import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { UsersListComponent } from './components/pages/users/users-list/users-list.component';
import { UserCreateComponent } from './components/pages/users/user-create/user-create.component';
import { UserEditComponent } from './components/pages/users/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
