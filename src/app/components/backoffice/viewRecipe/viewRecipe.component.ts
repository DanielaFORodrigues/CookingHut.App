import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-viewRecipe',
  templateUrl: './viewRecipe.component.html',
  styleUrls: ['./viewRecipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  viewRecipe() {


  }
}
