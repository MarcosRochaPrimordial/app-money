import { Component, OnInit } from '@angular/core';
import { RetractableService } from 'src/app/shared/services/retractable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  retract = false;

  constructor(
    private retractableService: RetractableService
  ) { }

  ngOnInit(): void {
    this.retractableService.retractable.subscribe(retract => {
      this.retract = retract;
    });
  }

}
