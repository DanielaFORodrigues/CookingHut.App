/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserFavouriteRecipesService } from './userFavouriteRecipes.service';

describe('Service: UserFavouriteRecipes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFavouriteRecipesService]
    });
  });

  it('should ...', inject([UserFavouriteRecipesService], (service: UserFavouriteRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
