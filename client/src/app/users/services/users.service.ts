import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserModel from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  static formLink(page: number, pattern: string): string {
    return pattern ?  `/api/users/page/${page || 0}/${pattern}` : page ? `/api/users/page/${page}` : `/api/users/page`;
  }

  get(page, pattern): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(UsersService.formLink(page, pattern));
  }

  delete(id): Observable<any> {
    return this.http.delete(`/api/users/${id}`);
  }

  create(user): Observable<any>  {
    return this.http.post<UserModel[]>(`/api/users`, user);
  }
}
