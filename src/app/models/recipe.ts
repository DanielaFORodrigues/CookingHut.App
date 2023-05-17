import { Time } from "@angular/common";

export interface Recipe {
  id: number,
  name: string;
  description: string,
  ingredients: string,
  category: string,
  executionTime: Time,
  difficulty: string,
  user: string,
  creationDate: Date,
  categoryId:number,

}

