import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaCreate } from '../interfaces/area-create.interface';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  private apiUrl = 'http://localhost:3000/api/sistemUsers';

  constructor(private http: HttpClient) { }

  getAreas():Observable<any>{
    return this.http.get<AreaCreate[]>(`${this.apiUrl}/area/get-areas`);
  }

  postUser(data: object):Observable<any>{
    const body = data;
    return this.http.post<any>(`${this.apiUrl}/users/save`, body);
  }
}
