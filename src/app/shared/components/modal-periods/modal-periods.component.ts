import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodService } from 'src/app/core/services/period.service';
import { Period } from '../../models/Period.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-modal-periods',
  templateUrl: './modal-periods.component.html',
  styleUrls: ['./modal-periods.component.scss']
})
export class ModalPeriodsComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private periodService: PeriodService,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalPeriodsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Period,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    if (!!this.data) {
      this.form.patchValue(this.data);
    }
  }

  initiateForm() {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      importance: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    this.importance?.valueChanges.subscribe(value => {
      this.importance?.setValue(this.currencyService.liveTransform(value), { emitEvent: false });
    });
  }

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
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
    const form = this.formatForm();
    if (!!this.id?.value) {
      this.periodService.updatePeriod(form);
    } else {
      delete form.id;
      this.periodService.createPeriod(form);
    }
    this.dialogRef.close();
  }

  formatForm(): Period {
    const form = this.form.getRawValue();
    return {
      ...form,
      importance: parseInt(form.importance.toString().replace(',', '')),
    } as Period;
  }

}
