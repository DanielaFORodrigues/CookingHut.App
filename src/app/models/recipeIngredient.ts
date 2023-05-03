import { Recipe } from "./recipe";
import { Ingredient } from "./ingredient";

export interface RecipeIngredient {
  id:number,
  recipeId: number,
  ingredientId: number,
  quantity:number,
  unit:number,
}
