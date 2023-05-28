import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';
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

  categories: Category[] = [];
  recipes!: Recipe[] | null;
  category!: Category | null;

  constructor(
    private userContext: UserContextService,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAllCategories();

    if (this.pageType === "category") {
      this.loadCategoryPage();
    }
    else if(this.pageType === "owner") {
      this.loadOwnRecipes();
    }
    else if(this.pageType === "favourites") {
      this.loadFavouriteRecipes();
    }
    else {
      this.router.navigate(['home']);
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

        this.pageTitle = `Receitas de ${this.category!.name}`
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['home']);
      });
    });
  }

  loadOwnRecipes() {
    this.activatedRoute.queryParams.subscribe(params => {
      const session = this.userContext.getCurrentSession();

      if (session == null) {
        this.router.navigate(['home']);
      }

      this.recipeService.getAll("owner", session!.id).subscribe(response => {
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['home']);
      });
    });
  }

  loadFavouriteRecipes() {
    this.activatedRoute.queryParams.subscribe(params => {
      const session = this.userContext.getCurrentSession();

      if (session == null) {
        this.router.navigate(['home']);
      }

      this.recipeService.getAll("favourites", session!.id).subscribe(response => {
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

}
