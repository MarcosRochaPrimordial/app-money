import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableSpendings } from 'src/app/shared/models/DataTableSpendings.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-modal-spendings',
  templateUrl: './modal-spendings.component.html',
  styleUrls: ['./modal-spendings.component.scss']
})
export class ModalSpendingsComponent implements OnInit {

  spendingId: string = '';
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalSpendingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTableSpendings,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    if (!!this.data) {
      this.spendingId = this.data.element.id;
      this.form.patchValue(this.data.element);
      this.type?.setValue(this.data.type);
    }
  }

  initiateForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      importance: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  get type() {
    return this.form.get('type');
  }

  get importance() {
    return this.form.get('value');
  }

  get description() {
    return this.form.get('description');
  }

  saveSpending() {

  }

}
