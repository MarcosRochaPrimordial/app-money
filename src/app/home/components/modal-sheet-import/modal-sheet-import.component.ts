import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-sheet-import',
  templateUrl: './modal-sheet-import.component.html',
  styleUrls: ['./modal-sheet-import.component.scss']
})
export class ModalSheetImportComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalSheetImportComponent>,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.form = this.fb.group({
      file: [null, Validators.required],
      understand: [false, Validators.requiredTrue]
    });
  }

  importSheet() {

  }

  fileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });
      }
    }
  }

}
