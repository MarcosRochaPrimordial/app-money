import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public logged = false;
  private subscription = new Subscription();

  constructor(
    public auth: AuthService
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
