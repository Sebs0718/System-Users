import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaEdit } from './../interfaces/area-edit.interface';
import { StateEdit } from './../interfaces/state-edit.interface';
import { UserEdit } from '../interfaces/user-edit.interface';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  private apiUrl = 'http://localhost:3000/api/sistemUsers';

  constructor(private http: HttpClient) { }

  getAreas():Observable<any>{
    return this.http.get<AreaEdit[]>(`${this.apiUrl}/area/get-areas`);
  }

  getStates():Observable<any>{
    return this.http.get<StateEdit[]>(`${this.apiUrl}/users/get-state`);
  }

  getUser(id: number):Observable<any>{
    return this.http.get<UserEdit[]>(`${this.apiUrl}/user/${id}`);
  }

  putUser(id: number, data: object):Observable<any>{
    const body = data;
    return this.http.put<any>(`${this.apiUrl}/users/update/${id}`, body);
  }

}
