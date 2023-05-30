import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';
import { EnumTexts } from 'src/app/utils/pipes/enum_texts';

@Component({
  selector: 'app-approveRecipes',
  templateUrl: './approveRecipes.component.html',
  styleUrls: ['./approveRecipes.component.css']
})
export class ApproveRecipesComponent implements OnInit {
  @Input() pageTitle: string = "";
  @Input() pageType: string = "category";

  enumTextsUtil: EnumTexts = new EnumTexts();

  categories: Category[] = [];
  recipes!: Recipe[] | null;
  category!: Category | null;

  constructor(
    private userContext: UserContextService,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private router: Router ) { }


  ngOnInit() {
    this.loadAllCategories();

    const session = this.userContext.getCurrentSession();

    if (session == null) {
      this.router.navigate(['home']);
    }

    this.recipeService.getAll("approval", session!.id).subscribe(response => {
      this.recipes = response;
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

  loadAllCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });
  }

  getCategoryName(id: number) {
    return this.categories.find(cat => cat.id == id)?.name;
  }

  deleteRecipe(recipeId: number) {
    this.recipeService.delete(recipeId).subscribe(response => {
      alert("Receita Eliminada Com Sucesso!");
      window.location.reload();
    });
  }

  approveRecipe(recipeId: number) {
    this.recipeService.approve(recipeId).subscribe(response => {
      alert("Receita Aprovada Com Sucesso!");
      window.location.reload();
    });
  }

}
