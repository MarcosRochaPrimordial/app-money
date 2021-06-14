import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  public dialog!: MatDialogRef<ConfirmComponent>;

  constructor(
    private modal: MatDialog,
    private translateService: TranslateService,
  ) { }

  public confirm() {
    this.dialog = this.modal.open(ConfirmComponent, {
      width: '450px',
      data: {
        title: this.translateService.translate('are_you_sure_dot'),
        message: this.translateService.translate('all_data_will_be_deleted'),
        labelBtnLeft: this.translateService.translate('yes'),
        labelBtnRight: this.translateService.translate('no'),
      }
    });
  }

}
