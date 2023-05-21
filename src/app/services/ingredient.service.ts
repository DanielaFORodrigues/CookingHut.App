import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>('https://localhost:44313/CookingHut/Ingredient');
  }

}
