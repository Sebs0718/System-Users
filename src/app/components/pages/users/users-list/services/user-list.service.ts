import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserList } from '../interfaces/user-list.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private apiUrl = 'http://localhost:3000/api/sistemUsers';

    constructor(private http: HttpClient) { }

    getUsers():Observable<any>{
      return this.http.get<UserList[]>(`${this.apiUrl}/users/get-all`);
    }

    deleteUser(id: number):Observable<any>{
      return this.http.delete<any>(`${this.apiUrl}/user/${id}`);
    }

}
