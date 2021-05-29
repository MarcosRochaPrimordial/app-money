import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss']
})
export class ListPeriodsComponent implements OnInit {

  active = 1;
  periods = [
    { name: 'Hydrogen', startDate: new Date(), endDate: new Date(), budget: 185600 },
    { name: 'Helium', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Lithium', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Beryllium', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Boron', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Carbon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Nitrogen', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Oxygen', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Fluorine', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
    { name: 'Neon', startDate: new Date(), endDate: new Date(), budget: 20000 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
