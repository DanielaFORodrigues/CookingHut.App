import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) {}


  create(createRecipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>('https://localhost:44313/CookingHut/Recipe', createRecipe);
  }

  getById(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>('https://localhost:44313/CookingHut/Recipe/' + id);
  }

  getAll(type: string, id: number): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`https://localhost:44313/CookingHut/Recipe?type=${type}&id=${id}`);
  }

}
