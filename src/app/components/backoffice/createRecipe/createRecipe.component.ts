import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-createRecipe',
  templateUrl: './createRecipe.component.html',
  styleUrls: ['./createRecipe.component.css'],
  providers: [MessageService]
})
export class CreateRecipeComponent implements OnInit {
  recipe!: any;
  categories: Category[] = [];

  form = new FormGroup({
    id: new FormControl(0),
    creationDate: new FormControl(new Date()),
    userId: new FormControl(this.userContext.getCurrentSession()?.id),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    executionTime: new FormControl('',[Validators.required]),
    difficulty: new FormControl(0,[Validators.min(0), Validators.required]),
    categoryId: new FormControl(0,[Validators.min(0), Validators.required]),
  });

  constructor(
    private userContext: UserContextService,
    private categoryService: CategoryService,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });

    this.form.controls['categoryId'].setValue(-1, {onlySelf: true});
    this.form.controls['difficulty'].setValue(-1, {onlySelf: true});
  }

  createRecipe() {
      this.recipe = this.form.value;
      this.recipe.categoryId = Number(this.recipe.categoryId);
      this.recipe.difficulty = Number(this.recipe.difficulty);

      this.recipeService.create(this.recipe).subscribe(response => {
        alert("Receita Publicada Com Sucesso!");
      this.form.reset;
      });

  }

}

