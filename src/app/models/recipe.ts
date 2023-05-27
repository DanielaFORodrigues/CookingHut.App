import { Time } from "@angular/common";

export interface Recipe {
  id: number,
  name: string;
  description: string,
  ingredients: string,
  executionTime: string,
  difficulty: number,
  userId: number,
  creationDate: Date,
  categoryId:number,
  image: string,
  isApproved: boolean
}

