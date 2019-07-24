import { Component, OnInit } from '@angular/core';
import { ToggleSidenavService } from 'src/app/core/services/toggle-sidenav.service';
import { ToggleState } from 'src/app/core/interfaces/toggleState';
import { Router } from '@angular/router';
import { AuthAppService } from 'src/app/core/services/auth-app.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  expand: boolean = false;

  constructor(
    private toggleSidenavService: ToggleSidenavService,
    private authService: AuthAppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toggleSidenavService.sidenavState.subscribe((toggle: ToggleState) => {
      this.expand = toggle.show;
    });
  }

  exitAndClean() {
    this.authService.logoff();
  }

  wallets() {
    this.router.navigate(['wallet']);
  }

  categories() {
    this.router.navigate(['category']);
  }

  collapse() {
    this.toggleSidenavService.setState(false);
  }

}
