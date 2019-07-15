import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ToggleState } from './core/interfaces/toggleState';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './shared/adapters/date.adapter';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AppComponent implements OnInit {

  show: boolean = false;

  constructor(
    private authService: AuthService,
    private update: SwUpdate
  ) {
    this.update.available.subscribe(event => {
      update.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {
    this.authService.loginState.subscribe((loginState: ToggleState) => {
      this.show = loginState.show;
    });
  }
}
