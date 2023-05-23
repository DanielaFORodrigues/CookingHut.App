import { Injectable } from '@angular/core';
import { RecipeIngredient } from '../models/recipeIngredient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientService {

  constructor(private httpClient: HttpClient) {}

  getByRecipeId(recipeId: number): Observable<RecipeIngredient[]> {
    return this.httpClient.get<RecipeIngredient[]>('https://localhost:44313/CookingHut/RecipeIngredient/' + recipeId);
  }

}
