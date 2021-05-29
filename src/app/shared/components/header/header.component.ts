import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RetractableService } from '../../services/retractable.service';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public retract = false;

  constructor(
    private retractableService: RetractableService,
  ) { }

  ngOnInit(): void {
    this.retractableService.retractable.subscribe(retract => {
      this.retract = retract;
    });
  }

  expandRetract() {
    this.retractableService.retract(!this.retract);
  }
}
