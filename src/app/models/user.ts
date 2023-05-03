
import { Recipe } from "./recipe";
export interface User {

  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  birhDate: Date;
  isAdministrator: boolean;
  isBlocked: boolean;
  recipeId: number,
}
