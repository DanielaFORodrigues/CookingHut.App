import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';
import { Constants } from 'src/app/utils/pipes/constant';

@Component({
  selector: 'app-createRecipe',
  templateUrl: './createRecipe.component.html',
  styleUrls: ['./createRecipe.component.css'],
  providers: [MessageService]
})
export class CreateRecipeComponent implements OnInit {
  [x: string]: any;

  recipe!: any;
  categories: Category[] = [];

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    executionTime: new FormControl('',[Validators.required]),
    difficulty: new FormControl('',[Validators.required]),
    user: new FormControl('',[Validators.required]),
    creationDate: new FormControl('',[Validators.required]),
    categoryId: new FormControl('',[Validators.required]),
    ingredients: new FormControl('',[Validators.required]),
  });




  constructor(
    private userContext: UserContextService,
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private router: Router ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });;
  }

  createRecipe() {
      this.recipe= this.form.value;
      this.recipeService.create(this.recipe).subscribe(response => {
     // this.users.push(response);
      this.form.reset;
      });

  }

}

