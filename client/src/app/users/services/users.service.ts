import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserModel from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  get(page, searchPattern): Observable<UserModel & {total: number}[]> {
    let url;
    if (searchPattern) {
      url = `/api/users/page/${page | 0}/${searchPattern}`;
    } else {
      url = page ? `/api/users/page/${page}` : `/api/users/page`;
    }
    return this.http.get<UserModel & {total: number}[]>(url)
  }

  delete(id) {
    return this.http.delete(`/api/users/${id}`)
  }

  create(user) {
    return this.http.post<UserModel[]>(`/api/users`, user)
  }
}
