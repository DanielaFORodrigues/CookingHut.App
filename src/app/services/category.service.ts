import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('https://localhost:44313/CookingHut/Category');
  }

  getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>('https://localhost:44313/CookingHut/Category/' + id);
  }

  create(newCategory: Category): Observable<Category> {
    return this.httpClient.post<Category>('https://localhost:44313/CookingHut/Category', newCategory);
  }

}
