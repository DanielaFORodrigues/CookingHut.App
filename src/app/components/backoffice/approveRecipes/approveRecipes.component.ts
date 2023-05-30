import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }


  ngOnInit() {
  }



}
