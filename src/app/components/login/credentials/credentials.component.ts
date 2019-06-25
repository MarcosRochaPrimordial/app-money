import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  credentialsForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.credentialsForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.credentialsForm.controls.email;
  }

  get password() {
    return this.credentialsForm.controls.password;
  }

  onSubmit() {
    this.user = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(this.user, this.onEmailOrPasswordWrong);
  }

  onEmailOrPasswordWrong = () => {
    this.snack.open('Email/Senha incorreto.', 'Ok', {
      duration: 5000
    });
  }

}
