import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { RecipeIngredient } from 'src/app/models/recipeIngredient';
import { CategoryService } from 'src/app/services/category.service';
import { ImageUploadService } from 'src/app/services/imageUpload.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

class ImageSnippet {
  savedImageName: string | null = null;

  constructor(public src: string, public file: File) {}
}

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

  selectedImageFile: ImageSnippet | null;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userContext: UserContextService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private imageUploadService: ImageUploadService)
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
        recipeIngredients: this.formBuilder.array([])
      });

      this.selectedImageFile = null;
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

  get recipeIngredients() : FormArray {
    return this.form.controls["recipeIngredients"] as FormArray;
  }

  createRecipe() {
      if (!this.selectedImageFile || !this.selectedImageFile.savedImageName) {
        alert("Faça upload da imagem da receita");
        return;
      }

      this.recipe = this.form.value;

      this.recipe.categoryId = Number(this.recipe.categoryId);
      this.recipe.difficulty = Number(this.recipe.difficulty);
      this.recipe.image = this.selectedImageFile.savedImageName;

      this.recipe.recipeIngredients.forEach(function (ingredient: RecipeIngredient) {
        ingredient.ingredientId = Number(ingredient.ingredientId);
        ingredient.quantity = Number(ingredient.quantity);
        ingredient.unit = Number(ingredient.unit);
    });

      this.recipeService.create(this.recipe).subscribe(response => {
        alert("Receita Publicada Com Sucesso!");
        window.location.reload();
      });

  }

  addNewIngredient() {
    this.ingredientsCount++;

    const ingredientForm = this.formBuilder.group({
      ingredientId: [0, [Validators.min(0), Validators.required]],
      quantity: [null, [Validators.min(0), Validators.required, Validators.pattern("^[1-9][0-9]*")]],
      unit: [0, [Validators.min(0), Validators.required]],
    });
    this.recipeIngredients.push(ingredientForm);
    ingredientForm.controls['ingredientId'].setValue(-1, {onlySelf: true});
    ingredientForm.controls['unit'].setValue(-1, {onlySelf: true});

    document.getElementById("btnRemoveIngredient")?.removeAttribute("disabled");
  }

  removeNewIngredient(){
    if (this.ingredientsCount === 1) {
        return;
    }

    this.recipeIngredients.removeAt(--this.ingredientsCount);

    if (this.ingredientsCount == 1) {
      document.getElementById("btnRemoveIngredient")?.setAttribute("disabled", "true");
    }
  }

  processImageFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedImageFile = new ImageSnippet(event.target.result, file);

      this.imageUploadService.uploadImage(this.selectedImageFile.file).subscribe( response => {

        this.selectedImageFile!.savedImageName = response;
      },
      (error: HttpErrorResponse) => {
        this.selectedImageFile!.savedImageName = null;
      });
    });

    reader.readAsDataURL(file);
  }
}

