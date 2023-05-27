import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-listRecipes',
  templateUrl: './listRecipes.component.html',
  styleUrls: ['./listRecipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  @Input() pageTitle: string = "Receitas de catagoria X";
  @Input() pageType: string = "category";

  recipes!: Recipe[] | null;

  constructor(
    private recipeService: RecipeService,
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

}
