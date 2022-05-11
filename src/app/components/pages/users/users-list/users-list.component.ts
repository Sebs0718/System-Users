import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserListService } from './services/user-list.service';
import { UserList } from './interfaces/user-list.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users!: UserList[];

  public Titulo:string = 'Usuarios';

  constructor( private userSvc: UserListService, public router: Router ) { }

  ngOnInit(): void {
    this.userSvc.getUsers()
    .pipe(
      tap( res => this.users = res)
    )
    .subscribe();
  }

  onClickEdit(id: number) {
    this.router.navigate([`/user/edit/${id}`])
  }

  onClickDelete(id: number) {
    this.userSvc.deleteUser(id)
    .pipe(
      tap( res => this.userSvc.getUsers()
        .pipe(
          tap( res => this.users = res)
        )
        .subscribe()
      )
    )
    .subscribe();
  }

}
