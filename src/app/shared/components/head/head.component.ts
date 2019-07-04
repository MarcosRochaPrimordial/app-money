import { Component, OnInit } from '@angular/core';
import { ToggleSidenavService } from 'src/app/core/services/toggle-sidenav.service';
import { ToggleState } from 'src/app/core/interfaces/toggleState';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  sidenavState: boolean = false;

  constructor(
    private toggleSidenavService: ToggleSidenavService
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

}
