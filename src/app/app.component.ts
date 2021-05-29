import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public logged = false;
  private subscription = new Subscription();

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.auth.login.subscribe(logged => this.logged = logged)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
