import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app-component/app.component";
import { CategoryComponent } from "./components/backoffice/category/category.component";
import { IngredientComponent } from "./components/backoffice/ingredient/ingredient.component";
import { LoginComponent } from "./components/backoffice/login/login.component";
import { RatingComponent } from "./components/backoffice/rating/rating.component";
import { RecipeComponent } from "./components/backoffice/recipe/recipe.component";
import { RecipeIngredientComponent } from "./components/backoffice/recipeIngredient/recipeIngredient.component";
import { UserComponent } from "./components/backoffice/user/user.component";

// Primeng Modules
import { ToastModule } from 'primeng/toast';
import { UserRegistryComponent } from "./components/backoffice/userRegistry/userRegistry.component";


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    IngredientComponent,
    LoginComponent,
    RatingComponent,
    RecipeComponent,
    RecipeIngredientComponent,
    UserRegistryComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Primeng Modules
    ToastModule,


    AppRoutingModule // sempre em último
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
