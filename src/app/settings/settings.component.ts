import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../core/repositories/user-repository.service';
import { UserStorageService } from '../shared/services/user-storage.service';

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
    private userRepository: UserRepositoryService,
    private router: Router,
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
    this.userRepository.updateUser(this.userStorage.user);
    this.router.navigate(['../']);
  }

}
