import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { EnumTexts } from 'src/app/utils/pipes/enum_texts';

@Component({
  selector: 'app-listRecipes',
  templateUrl: './listRecipes.component.html',
  styleUrls: ['./listRecipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  @Input() pageTitle: string = "";
  @Input() pageType: string = "category";

  enumTextsUtil: EnumTexts = new EnumTexts();

  recipes!: Recipe[] | null;
  category!: Category | null;

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.pageType === "category") {
      this.loadCategoryPage();
    }
  }

  loadCategoryPage() {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];

      if (!categoryId) {
        this.router.navigate(['home']);
      }

      this.getCategory(categoryId);

      this.recipeService.getAll("category", categoryId).subscribe(response => {
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['home']);
      });
    });
  }

  getTitle() {
    return this.pageTitle;
  }

  getCategory(categoryId: number) {
    this.categoryService.getById(categoryId).subscribe(response => {
      this.category = response;

      this.pageTitle = `Receitas de ${this.category.name}`
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

}
