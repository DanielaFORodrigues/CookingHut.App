import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  ingredientsCount: number = 1;

  form = new FormGroup({
    id: new FormControl(0),
    creationDate: new FormControl(new Date()),
    userId: new FormControl(this.userContext.getCurrentSession()?.id),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    executionTime: new FormControl('',[Validators.required]),
    difficulty: new FormControl(0,[Validators.min(0), Validators.required]),
    categoryId: new FormControl(0,[Validators.min(0), Validators.required]),
    ingredient1: new FormControl('',[Validators.required]),
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

    document.getElementById("btnRemoveIngredient")?.setAttribute("disabled", "true");
  }

  createRecipe() {
      this.recipe = this.form.value;
      this.recipe.categoryId = Number(this.recipe.categoryId);
      this.recipe.difficulty = Number(this.recipe.difficulty);

      this.recipeService.create(this.recipe).subscribe(response => {
        alert("Receita Publicada Com Sucesso!");
      this.form.reset;
      this.ingredientsCount = 1;
      });

  }

  addNewIngredient() {
    const name =  `ingredient${++this.ingredientsCount}`;
    const newInput = document.createElement('input');
    newInput.type = "text";
    newInput.id = name;
    newInput.name = name;
    newInput.className ="form-control";
    newInput.setAttribute("formControlName", name);
    newInput.setAttribute("required", "true");

    document.getElementById("ingredientsDiv")?.appendChild(newInput);
    document.getElementById("btnRemoveIngredient")?.removeAttribute("disabled");

    const formGroup = this.form as FormGroup;
    formGroup.addControl(name, new FormControl('', [Validators.required]));
  }

  removeNewIngredient(){

    if (this.ingredientsCount === 1) {
        return;
    }

    const elementName = `ingredient${this.ingredientsCount--}`;
    const elementToRemove = document.getElementById(elementName);

    if (elementToRemove) {
      document.getElementById("ingredientsDiv")?.removeChild(elementToRemove);

      const formGroup = this.form as FormGroup;
      formGroup.removeControl(elementName);

       if (this.ingredientsCount == 1) {
        document.getElementById("btnRemoveIngredient")?.setAttribute("disabled", "true");
       }
    }
  }
}

