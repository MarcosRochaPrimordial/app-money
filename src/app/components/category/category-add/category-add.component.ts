import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoryAddComponent>,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryFormGroup = this.fb.group({
      description: [null, [Validators.required]]
    });
  }

  get descriptionForm() {
    return this.categoryFormGroup.controls.description;
  }

  saveCategory() {
    const category = this.categoryFormGroup.value;
    const result = this.categoryService.saveCategory(category);
    if (result) {
      this.snackbar.open('Aconteceu um erro inesperado', 'Ok', {
        duration: 0
      });
    } else {
      this.dialogRef.close();
      this.snackbar.open('Categoria salva com sucesso!', 'Ok', {
        duration: 5000
      });
    }
  }

}
