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

}
