import { Component } from '@angular/core';
import { UserContextService } from '../utils/contexts/usercontext.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CookingHutApp';

  categories: Category[] = [];

  form = new FormGroup({
    searchText: new FormControl('',[Validators.required])
  });

  constructor(
    private userContext: UserContextService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });
  }

  isUserLogged() {
    return this.userContext.isLogged();
  }

  logout() {
    this.userContext.clean();

    this.router.navigate(['home']);
  }

  getUserNameToDisplay() {
    return this.userContext.getCurrentSession()?.name;
  }

  searchRecipes() {
    this.router.navigate(
      ['/listRecipes'],
      { queryParams: { searchText: this.form.value.searchText } }
    );
  }
}
