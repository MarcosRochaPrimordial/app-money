import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ActualPeriodService } from 'src/app/core/services/actual-period.service';
import { PeriodService } from 'src/app/core/services/period.service';
import { SpendingService } from 'src/app/core/services/spending.service';
import { Period } from 'src/app/shared/models/Period.model';
import { Spending } from 'src/app/shared/models/Spending.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-modal-copy',
  templateUrl: './modal-copy.component.html',
  styleUrls: ['./modal-copy.component.scss']
})
export class ModalCopyComponent implements OnInit {

  @ViewChild('periodSelect', { static: false }) periodSelect!: MatSelectionList;

  form: FormGroup = this.fb.group({});
  periods: Period[] = [];

  constructor(
    private fb: FormBuilder,
    private periodService: PeriodService,
    private spendingService: SpendingService,
    private actualPeriod: ActualPeriodService,
    @Inject(MAT_DIALOG_DATA) public data: Spending,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalCopyComponent>,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    this.actualPeriod.period.subscribe(period => {
      this.periodService
        .getPeriodsAfterDate(period.endDate, 12)
        .subscribe(periods => {
          this.periods = periods;
        });
    });
  }

  initiateForm() {
    this.form = this.fb.group({
      importance: [this.currencyService.transform(this.data.importance)],
      description: [this.data.description],
      paid: [this.data.paid],
      type: [this.data.type],
    });
    this.importance?.disable();
    this.description?.disable();
  }

  get importance() {
    return this.form.get('importance');
  }

  get description() {
    return this.form.get('description');
  }

  completeCopy() {
    const form = this.formatForm();
    this.periodSelect._value?.forEach((period: any) => {
      this.spendingService.createSpending(form, period.id);
    });
    this.dialogRef.close();
  }

  formatForm() {
    const form = this.form.getRawValue();
    return {
      ...form,
      importance: parseInt(form.importance.replace(',', '')),
    } as Spending;
  }
}
