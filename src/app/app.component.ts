import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ToggleState } from './core/interfaces/toggleState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  show: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loginState.subscribe((loginState: ToggleState) => {
      this.show = loginState.show;
    });
  }
}
