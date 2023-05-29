import { Location } from '@angular/common'
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
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { EnumTexts } from 'src/app/utils/pipes/enum_texts';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeComment } from 'src/app/models/recipeComment';
import { UserFavouriteRecipesService } from 'src/app/services/userFavouriteRecipes.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-viewRecipe',
  templateUrl: './viewRecipe.component.html',
  styleUrls: ['./viewRecipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  rating: number = 3.5;
  numRatings: number = 10;

  comment!: any;

  form = new FormGroup({
    comment: new FormControl('',[Validators.required])
  });

  enumTextsUtil: EnumTexts = new EnumTexts();

  recipeUserName!: string;
  recipe!: Recipe | null;
  category!: Category | null;
  recipeIngredients!: RecipeIngredient[] | null;
  recipeDescription!: string[] | null;
  comments: RecipeComment[] = [];

  isFavouriteRecipe: boolean = false;

  constructor(
    private location: Location,
    private userContext: UserContextService,
    private recipeService: RecipeService,
    private userService: UserService,
    private categoryService: CategoryService,
    private recipeIngredientsService: RecipeIngredientService,
    private userFavouriteRecipesService: UserFavouriteRecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const recipeId = params['id'];

      if (!recipeId) {
        this.router.navigate(['home']);
      }

      this.loadAllRecipeComments(recipeId);
      this.isFavourite(recipeId);

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

  isUserLogged() {
    return this.userContext.isLogged();
  }

  getCurrentUsername() {
    if (!this.userContext.isLogged()) {
      return "";
    }

    return this.userContext.getCurrentSession()?.name;
  }

  loadAllRecipeComments(recipeId: number) {
    this.recipeService.getAllComments(recipeId).subscribe(response => {
      this.comments = response;
    });
  }

  hasComments() {
    if (!this.comments) {
      return false;
    }

    return this.comments.length > 0;
  }

  addComment() {
    const userId = this.userContext.getCurrentSession()?.id;

    this.comment = this.form.value;
    this.comment.userId = userId!;
    this.comment.recipeId = this.recipe!.id;

    this.recipeService.createComment(this.comment).subscribe(response => {
      alert("Comentário Publicado Com Sucesso!");
      window.location.reload();
    });
  }

  goBackAction() {
    this.location.back();
  }

  addToFavourites(recipeId: number) {
    this.userFavouriteRecipesService.addRecipeToFavourite(recipeId).subscribe(response => {
      alert("Receita Adicionada aos Favoritos");
      window.location.reload();
    });
  }

  removeFromFavourites(recipeId: number) {
    this.userFavouriteRecipesService.removeRecipeFromFavourites(recipeId).subscribe(response => {
      alert("Receita Removida dos Favoritos");
      window.location.reload();
    });
  }

  isFavourite(recipeId: number) {
    if (!this.isUserLogged()) {
      this.isFavouriteRecipe = false;
    }

    this.userFavouriteRecipesService.isFavouriteRecipe(recipeId).subscribe(response => {
      this.isFavouriteRecipe = true;
    }),
    (error: HttpErrorResponse) => {
      this.isFavouriteRecipe = false;
    };
  }

  hasRating(value: number) {
    return value <= this.rating;
  }

  rateRecipe(value: number) {
    if (!this.isUserLogged()) {
      this.router.navigate(['login']);
    }
    else {
      alert("votou " + value);
    }
  }

}
