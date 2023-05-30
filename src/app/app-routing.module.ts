import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from './utils/guards/can-activate-guard.service';
import { UserComponent } from './components/backoffice/user/user.component';
import { CategoryComponent } from './components/backoffice/category/category.component';
import { IngredientComponent } from './components/backoffice/ingredient/ingredient.component';
import { LoginComponent } from './components/backoffice/login/login.component';
import { UserRegistryComponent } from './components/backoffice/userRegistry/userRegistry.component';

import { ViewRecipeComponent } from './components/backoffice/viewRecipe/viewRecipe.component';
import { ListRecipesComponent } from './components/backoffice/listRecipes/listRecipes.component';
import { HomePageComponent } from './components/homePage/homePage.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'viewRecipe', component: ViewRecipeComponent },
  { path: 'registo', component: UserRegistryComponent },
  { path: 'listRecipes', component: ListRecipesComponent },
  { path: 'user', canActivate: [CanActivateGuardService], component: UserComponent },
  { path: 'category', canActivate: [CanActivateGuardService], component: CategoryComponent },
  { path: 'ingredient', canActivate: [CanActivateGuardService], component: IngredientComponent },
  { path: 'Ingredient', canActivate: [CanActivateGuardService], component: IngredientComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 // { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
