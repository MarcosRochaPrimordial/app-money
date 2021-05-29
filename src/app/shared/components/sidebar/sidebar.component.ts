import { Component, OnInit } from '@angular/core';
import { RetractableService } from '../../services/retractable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public retract = false;

  constructor(
    private retractableService: RetractableService,
  ) { }

  ngOnInit(): void {
    this.retractableService.retractable.subscribe(retract => {
      this.retract = retract;
    });
  }

}
