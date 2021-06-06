import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodRepositoryService } from 'src/app/core/repositories/period-repository.service';
import { Period, PeriodBase } from '../../models/Period.model';
import { CurrencyService } from '../../services/currency.service';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-modal-periods',
  templateUrl: './modal-periods.component.html',
  styleUrls: ['./modal-periods.component.scss']
})
export class ModalPeriodsComponent implements OnInit {

  periodId: string = '';
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private periodRepository: PeriodRepositoryService,
    private userStorage: UserStorageService,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalPeriodsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Period,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    if (!!this.data) {
      this.periodId = this.data.id!;
      this.form.patchValue(this.data);
    }
  }

  initiateForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      importance: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
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
    if (!this.periodId) {
      this.periodRepository.createPeriod(form, this.userStorage.user.id!);
    } else {
      this.periodRepository.updatePeriod(form);
    }
    this.dialogRef.close();
  }

  formatForm(): Period {
    const form = this.form.getRawValue();
    return {
      ...form,
      importance: parseInt(form.importance.toString().replace(',', '.')),
    }
  }

}
