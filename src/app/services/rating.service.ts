import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContextService } from '../utils/contexts/usercontext.service';
import { Rating } from '../models/rating';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private httpClient: HttpClient,
    private userContext: UserContextService) {}

  private getCurrentUserId(): number {
    const userSession = this.userContext.getCurrentSession();
    if (!userSession) {
      return 0;
    }

    return this.userContext.getCurrentSession()!.id;
  }

  rateRecipe(recipeId: number, ratingValue: number): Observable<Rating> {
    const rating = {
      recipeId: recipeId,
      userId: this.getCurrentUserId(),
      ratingValue: ratingValue
    };
    return this.httpClient.post<Rating>('https://localhost:44313/CookingHut/Rating', rating);
  }

  getUserRating(recipeId: number): Observable<Rating> {
    return this.httpClient.get<Rating>(`https://localhost:44313/CookingHut/Rating/${recipeId}/${this.getCurrentUserId()}`);
  }

  getRecipeRatings(recipeId: number): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(`https://localhost:44313/CookingHut/Rating/${recipeId}`);
  }

}
