import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredient!: any;
  ingredients: Ingredient[] = [];

  form = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  constructor(
    private ingredientService: IngredientService,
    private userContext: UserContextService,
    private router: Router) { }

  ngOnInit() {
    const session = this.userContext.getCurrentSession();

    if (session == null || session.isAdministrator == false) {
      this.router.navigate(['home']);
    }

    this.loadAllIngredients();
  }

  loadAllIngredients() {
    this.ingredientService.getAll().subscribe(response => {
      this.ingredients = response;
    });
  }

  createIngredient() {
    this.ingredient = this.form.value;

    if (this.checkIngredientExists(this.ingredient!.name) == false) {
      this.ingredientService.create(this.ingredient).subscribe(response => {
        alert("Ingrediente Criado Com Sucesso!");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert("Não Foi Possível Efectuar a Operação!");
      });
    }
    else {
      alert("O Ingrediente Já Existe!");
    }
  }

  checkIngredientExists(ingredientToFind: string): boolean {
    const ingredientIndex = this.ingredients.findIndex(u => u.name.toLowerCase() == ingredientToFind.toLowerCase());

      if (ingredientIndex > -1) {
        return true;
      }

    return false;
  }

}
