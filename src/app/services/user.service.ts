import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '../models/login';
import { User } from '../models/user';
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

  getLogin(userLogin: Login) {
    return this.httpClient.post<Login>('https://localhost:44313/CookingHut/User/Login', userLogin);
  }

  register(userRegistry: User): Observable<User> {
    return this.httpClient.post<User>('https://localhost:44313/CookingHut/User', userRegistry);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>('https://localhost:44313/CookingHut/User', user);
  }

  block(userId: number, shouldBlock: boolean): Observable<User> {
    return this.httpClient.put<User>(`https://localhost:44313/CookingHut/User/${userId}/${shouldBlock}`, null);
  }

  delete(id: number) {
    return this.httpClient.delete('https://localhost:44313/CookingHut/User/' + id);
  }

}
