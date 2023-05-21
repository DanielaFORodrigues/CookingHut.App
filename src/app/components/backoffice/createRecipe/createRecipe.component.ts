import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';
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
  ingredientsList: Ingredient[] = [];

  ingredientsCount: number = 0;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userContext: UserContextService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService)
    {
      this.form = new FormGroup({
        id: new FormControl(0),
        creationDate: new FormControl(new Date()),
        userId: new FormControl(this.userContext.getCurrentSession()?.id),
        name: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        executionTime: new FormControl('',[Validators.required]),
        difficulty: new FormControl(0,[Validators.min(0), Validators.required]),
        categoryId: new FormControl(0,[Validators.min(0), Validators.required]),
        ingredients: this.formBuilder.array([])
      });

    }

  ngOnInit() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });

    this.ingredientService.getAll().subscribe(response => {
      this.ingredientsList = response;
    });

    this.form.controls['categoryId'].setValue(-1, {onlySelf: true});
    this.form.controls['difficulty'].setValue(-1, {onlySelf: true});

    this.addNewIngredient();
    document.getElementById("btnRemoveIngredient")?.setAttribute("disabled", "true");
  }

  get ingredients() : FormArray {
    return this.form.controls["ingredients"] as FormArray;
  }

  createRecipe() {
      this.recipe = this.form.value;
      alert(JSON.stringify(this.recipe));

      this.recipe.categoryId = Number(this.recipe.categoryId);
      this.recipe.difficulty = Number(this.recipe.difficulty);

      this.recipeService.create(this.recipe).subscribe(response => {
        alert("Receita Publicada Com Sucesso!");
        window.location.reload();
      });

  }

  addNewIngredient() {
    this.ingredientsCount++;

    const ingredientForm = this.formBuilder.group({
      name: [0,[Validators.min(0), Validators.required]],
    });
    this.ingredients.push(ingredientForm);
    ingredientForm.controls['name'].setValue(-1, {onlySelf: true});

    document.getElementById("btnRemoveIngredient")?.removeAttribute("disabled");
  }

  removeNewIngredient(){
    if (this.ingredientsCount === 1) {
        return;
    }

    this.ingredients.removeAt(--this.ingredientsCount);

    if (this.ingredientsCount == 1) {
      document.getElementById("btnRemoveIngredient")?.setAttribute("disabled", "true");
    }
  }
}

