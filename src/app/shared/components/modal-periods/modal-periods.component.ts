import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-modal-periods',
  templateUrl: './modal-periods.component.html',
  styleUrls: ['./modal-periods.component.scss']
})
export class ModalPeriodsComponent implements OnInit {

  periodId = null;
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalPeriodsComponent>,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      importance: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  get description() {
    return this.form.get('description');
  }

  get importance() {
    return this.form.get('importance');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  savePeriod() {
    this.dialogRef.close();
  }

}
