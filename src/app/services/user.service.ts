import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '../models/login';
import { User } from '../models/user';
import { UserRegistry } from '../models/UserRegistry';
;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://localhost:44313/CookingHut/User');
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>('https://localhost:44313/CookingHut/User/' + id);
  }

  getLogin(userLogin: Login): Observable<Login> {
    return this.httpClient.post<Login>('https://localhost:44313/CookingHut/User/Login', userLogin);
  }

  register(userRegistry: UserRegistry): Observable<UserRegistry> {
    return this.httpClient.post<UserRegistry>('https://localhost:44313/CookingHut/User/Create', userRegistry);
  }

  save(user: User): Observable<User> {
    return this.httpClient.post<User>('https://localhost:44313/CookingHut/User', user);
  }

  delete(id: number) {
    return this.httpClient.delete('https://localhost:44313/CookingHut/User/' + id);
  }

}
