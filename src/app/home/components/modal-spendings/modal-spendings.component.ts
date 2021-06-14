import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpendingService } from 'src/app/core/services/spending.service';
import { DataTableSpendings } from 'src/app/shared/models/DataTableSpendings.model';
import { Spending } from 'src/app/shared/models/Spending.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-modal-spendings',
  templateUrl: './modal-spendings.component.html',
  styleUrls: ['./modal-spendings.component.scss']
})
export class ModalSpendingsComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private spendingService: SpendingService,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalSpendingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTableSpendings,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    if (!!this.data) {
      this.form.patchValue(this.data.element);
      this.type?.setValue(this.data.type);
    }
  }

  initiateForm() {
    this.form = this.fb.group({
      id: [null],
      type: ['', Validators.required],
      importance: [null, Validators.required],
      description: ['', Validators.required],
    });
    this.importance?.valueChanges.subscribe(value => {
      this.importance?.setValue(this.currencyService.liveTransform(value), { emitEvent: false });
    });
  }

  get id() {
    return this.form.get('id');
  }

  get type() {
    return this.form.get('type');
  }

  get importance() {
    return this.form.get('importance');
  }

  get description() {
    return this.form.get('description');
  }

  saveSpending() {
    const form = this.formatForm();
    if (!!this.id?.value) {
      this.spendingService.updateSpending(form);
    } else {
      delete form.id;
      this.spendingService.createSpending(form, this.data.periodId);
    }
    this.dialogRef.close();
  }

  formatForm(): Spending {
    const form = this.form.getRawValue();
    return {
      ...form,
      paid: false,
      importance: parseInt(form.importance.replace(',', '')),
    } as Spending;
  }

}
