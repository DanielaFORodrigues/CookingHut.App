import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category!: any;
  categories: Category[] = [];

  form = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  constructor(
    private categoryService: CategoryService,
    private userContext: UserContextService,
    private router: Router) { }

  ngOnInit() {
    const session = this.userContext.getCurrentSession();

    if (session == null || session.isAdministrator == false) {
      this.router.navigate(['home']);
    }

    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
    });
  }

  createCategory() {
    this.category = this.form.value;

    if (this.checkCategoryExists(this.category!.name) == false) {
      this.categoryService.create(this.category).subscribe(response => {
        alert("Categoria Criada Com Sucesso!");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert("Não Foi Possível Efectuar a Operação!");
      });
    }
    else {
      alert("A Categoria Já Existe!");
    }
  }

  checkCategoryExists(categoryToFind: string): boolean {
    const categoryIndex = this.categories.findIndex(u => u.name.toLowerCase() == categoryToFind.toLowerCase());

      if (categoryIndex > -1) {
        return true;
      }

    return false;
  }

}
