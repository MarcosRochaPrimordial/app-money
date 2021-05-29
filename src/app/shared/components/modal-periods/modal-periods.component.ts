import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<ModalPeriodsComponent>
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      importance: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    this.importance?.valueChanges.subscribe(value => {
      value = value.replace(/\D/g, '').replace(/^(\d*)(\d{2})/g, "$1,$2");
      this.importance?.setValue(`R$ ${value}`, { emitEvent: false });
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
