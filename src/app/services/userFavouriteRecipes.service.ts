import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserContextService } from '../utils/contexts/usercontext.service';
import { UserFavouriteRecipe } from '../models/userFavouriteRecipe';

@Injectable({
  providedIn: 'root'
})
export class UserFavouriteRecipesService {

  constructor(
    private httpClient: HttpClient,
    private userContext: UserContextService) {}

  private getCurrentUserId(): number {
    return this.userContext.getCurrentSession()!.id;
  }

  addRecipeToFavourite(recipeId: number): Observable<UserFavouriteRecipe> {
    const userFavouriteRecipe = {
      recipeId: recipeId,
      userId: this.getCurrentUserId()
    };
    return this.httpClient.post<UserFavouriteRecipe>('https://localhost:44313/CookingHut/UserFavouriteRecipes', userFavouriteRecipe);
  }

  isFavouriteRecipe(recipeId: number): Observable<UserFavouriteRecipe> {
    return this.httpClient.get<UserFavouriteRecipe>(`https://localhost:44313/CookingHut/UserFavouriteRecipes?recipeId=${recipeId}&userId=${this.getCurrentUserId()}`);
  }

  removeRecipeFromFavourites(recipeId: number): Observable<UserFavouriteRecipe> {
    return this.httpClient.delete<UserFavouriteRecipe>(`https://localhost:44313/CookingHut/UserFavouriteRecipes?recipeId=${recipeId}&userId=${this.getCurrentUserId()}`);
  }
}
