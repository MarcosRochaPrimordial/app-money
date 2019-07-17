import { Injectable } from '@angular/core';
import { CategoryRepositoryService } from '../repositories/category-repository.service';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private categoryRepository: CategoryRepositoryService
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  saveCategory(category: Category) {
    try {
      this.categoryRepository.save(category);
      return null;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  deleteCategory(id: string) {
    try {
      this.categoryRepository.delete(id);
      return null;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
