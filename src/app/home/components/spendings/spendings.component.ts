import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Spendings } from 'src/app/shared/models/Spending.model';

const ELEMENT_DATA_SPENDINGS: Spendings[] = [
  { description: 'Hydrogen', importance: 3000 },
  { description: 'Helium', importance: 3000 },
  { description: 'Lithium', importance: 3000 },
  { description: 'Beryllium', importance: 3000 },
  { description: 'Boron', importance: 3000 },
  { description: 'Carbon', importance: 3000 },
];
const ELEMENT_DATA_OUTGOINGS: Spendings[] = [
  { description: 'Carbon', importance: 3000 },
  { description: 'Nitrogen', importance: 3000 },
  { description: 'Oxygen', importance: 3000 },
];
const ELEMENT_DATA_INCOMES: Spendings[] = [
  { description: 'Hydrogen', importance: 3000 },
  { description: 'Helium', importance: 3000 },
  { description: 'Lithium', importance: 3000 },
  { description: 'Beryllium', importance: 3000 },
  { description: 'Boron', importance: 3000 },
  { description: 'Carbon', importance: 3000 },
  { description: 'Nitrogen', importance: 3000 },
  { description: 'Oxygen', importance: 3000 },
  { description: 'Fluorine', importance: 3000 },
  { description: 'Neon', importance: 3000 },
];

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss']
})
export class SpendingsComponent implements OnInit {

  @ViewChild('fixed_spendings_view', { static: true }) fixed_spendings_view!: ElementRef;
  @ViewChild('outgoings_view', { static: true }) outgoings_view!: ElementRef;
  @ViewChild('incomes_view', { static: true }) incomes_view!: ElementRef;
  @ViewChild('fixed_spendings_button', { static: true }) fixed_spendings_button!: ElementRef;
  @ViewChild('outgoings_button', { static: true }) outgoings_button!: ElementRef;
  @ViewChild('incomes_button', { static: true }) incomes_button!: ElementRef;

  public fixedSpendings: Spendings[] = ELEMENT_DATA_SPENDINGS;
  public outgoings: Spendings[] = ELEMENT_DATA_OUTGOINGS;
  public incomes: Spendings[] = ELEMENT_DATA_INCOMES;


  constructor() { }

  ngOnInit(): void {
    this.fixed_spendings_view.nativeElement.style.display = "block";
    this.fixed_spendings_button.nativeElement.className += " active";
  }

  openTab(evt: any, tab: string) {
    this.fixed_spendings_view.nativeElement.style.display = "none";
    this.outgoings_view.nativeElement.style.display = "none";
    this.incomes_view.nativeElement.style.display = "none";

    this.fixed_spendings_button.nativeElement.className = this.fixed_spendings_button.nativeElement.className.replace(" active", "");
    this.outgoings_button.nativeElement.className = this.outgoings_button.nativeElement.className.replace(" active", "");
    this.incomes_button.nativeElement.className = this.incomes_button.nativeElement.className.replace(" active", "");

    switch (tab) {
      case 'fixed_spendings_view':
        this.fixed_spendings_view.nativeElement.style.display = "block";
        break;
      case 'outgoings_view':
        this.outgoings_view.nativeElement.style.display = "block";
        break;
      case 'incomes_view':
        this.incomes_view.nativeElement.style.display = "block";
        break;
    }
    evt.currentTarget.className += " active";
  }

}
