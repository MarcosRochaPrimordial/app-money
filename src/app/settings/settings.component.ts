import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { UserStorageService } from '../core/services/user-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private userStorage: UserStorageService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.form = this.fb.group({
      language: [this.userStorage.user.language, Validators.required],
      currency: [this.userStorage.user.currency, Validators.required]
    });
  }

  saveSettings() {
    this.userStorage.currency = this.form.get('currency')?.value;
    this.userStorage.language = this.form.get('language')?.value;
    this.auth.updateUser(this.userStorage.user);
    window.location.reload();
  }

}
