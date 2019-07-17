import { Component, OnInit } from '@angular/core';
import { ToggleSidenavService } from 'src/app/core/services/toggle-sidenav.service';
import { ToggleState } from 'src/app/core/interfaces/toggleState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  sidenavState: boolean = false;

  constructor(
    private toggleSidenavService: ToggleSidenavService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toggleSidenavService.sidenavState.subscribe((toggle: ToggleState) => {
      this.sidenavState = toggle.show;
    });
  }

  toggleSidenav() {
    this.sidenavState = !this.sidenavState;
    this.toggleSidenavService.setState(this.sidenavState);
  }

  back() {
    window.history.back();
  }

}
