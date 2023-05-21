import { Component } from '@angular/core';
import { UserContextService } from '../utils/contexts/usercontext.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CookingHutApp';

  categories: Category[] = [];

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
}
