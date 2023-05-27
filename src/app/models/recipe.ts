import { Time } from "@angular/common";
import { User } from "./user";

export interface Recipe {
  id: number,
  name: string;
  description: string,
  ingredients: string,
  executionTime: string,
  difficulty: number,
  userId: number,
  user: User,
  creationDate: Date,
  categoryId:number,
  image: string,
  isApproved: boolean
}

