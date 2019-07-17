import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/interfaces/category';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CategoryAddComponent } from '../category-add/category-add.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string) {
    const result = this.categoryService.deleteCategory(id);
    if (result) {
      this.snackbar.open('Aconteceu um erro inesperado', 'Ok', {
        duration: 0
      });
    } else {
      this.snackbar.open('Categoria deletada com sucesso!', 'Ok', {
        duration: 5000
      });
    }
  }

  addCategory() {
    this.dialog.open(CategoryAddComponent, {
      width: '600px',
      height: '340px',
      data: {}
    });
  }

}
