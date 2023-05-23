import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { RecipeIngredient } from 'src/app/models/recipeIngredient';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeIngredientService } from 'src/app/services/recipeIngredient.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-viewRecipe',
  templateUrl: './viewRecipe.component.html',
  styleUrls: ['./viewRecipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  recipeUserName!: string;
  recipe!: Recipe | null;
  category!: Category | null;
  recipeIngredients!: RecipeIngredient[] | null;
  recipeDescription!: string[] | null;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private categoryService: CategoryService,
    private recipeIngredientsService: RecipeIngredientService,
    private activatedRout: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRout.queryParams.subscribe(params => {
      const recipeId = params['id'];

      if (!recipeId) {
        this.router.navigate(['home']);
      }

      this.recipeService.getById(recipeId).subscribe(response => {
        this.recipe = response;

        this.getRecipeUserName(response.userId);
        this.getCategory(response.categoryId);
        this.getRecipeIngredients(response.id);

        this.recipeDescription = this.recipe.description.split(/\r?\n/);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['home']);
      });
    });
  }

  getRecipeUserName(userId: number) {
    this.userService.getById(userId).subscribe(response => {
      this.recipeUserName = response.name;
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

  getCategory(categoryId: number) {
    this.categoryService.getById(categoryId).subscribe(response => {
      this.category = response;
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

  getRecipeIngredients(recipeId: number) {
    this.recipeIngredientsService.getByRecipeId(recipeId).subscribe(response => {
      this.recipeIngredients = response;
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

}
