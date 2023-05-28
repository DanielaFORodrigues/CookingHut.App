import { User } from "./user";

export interface RecipeComment {
  id: number,
  recipeId: number
  userId: number,
  user: User,
  comment: string,
  datePost: Date,
}
