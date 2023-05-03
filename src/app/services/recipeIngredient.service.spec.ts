/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeIngredientService } from './recipeIngredient.service';

describe('Service: RecipeIngredient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeIngredientService]
    });
  });

  it('should ...', inject([RecipeIngredientService], (service: RecipeIngredientService) => {
    expect(service).toBeTruthy();
  }));
});
