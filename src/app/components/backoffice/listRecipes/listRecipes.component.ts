import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listRecipes',
  templateUrl: './listRecipes.component.html',
  styleUrls: ['./listRecipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  @Input() pageTitle: string = "Receitas de catagoria X";

  constructor() { }

  ngOnInit() {
  }

  getTitle() {
    return this.pageTitle;
  }

}
