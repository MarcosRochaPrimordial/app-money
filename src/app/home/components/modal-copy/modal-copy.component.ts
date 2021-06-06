import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
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
    @Inject(MAT_DIALOG_DATA) public data: Spending,
    public currencyService: CurrencyService,
    public dialogRef: MatDialogRef<ModalCopyComponent>,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.form = this.fb.group({
      importance: [this.currencyService.transform(this.data.importance)],
      description: [this.data.description],
      periods: this.fb.array([]),
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

  get periodsForm() {
    return this.form.get('periods') as FormArray;
  }

  completeCopy() {
    this.periodSelect._value?.forEach((period: any) => {
      this.periodsForm.push(this.fb.group({
        id: period.id,
        importance: period.importance,
        endDate: period.endDate,
        startDate: period.startDate,
        name: period.name,
      }));
    });
    console.log(this.periodsForm);
  }
}
