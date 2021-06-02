import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss']
})
export class SpendingsComponent implements OnInit {

  @ViewChild('fixed_spendings', { static: true }) fixed_spendings!: ElementRef;
  @ViewChild('outgoings', { static: true }) outgoings!: ElementRef;
  @ViewChild('incomes', { static: true }) incomes!: ElementRef;
  @ViewChild('fixed_spendings_button', { static: true }) fixed_spendings_button!: ElementRef;
  @ViewChild('outgoings_button', { static: true }) outgoings_button!: ElementRef;
  @ViewChild('incomes_button', { static: true }) incomes_button!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.fixed_spendings.nativeElement.style.display = "block";
    this.fixed_spendings_button.nativeElement.className += " active";
  }

  openTab(evt: any, tab: string) {
    this.fixed_spendings.nativeElement.style.display = "none";
    this.outgoings.nativeElement.style.display = "none";
    this.incomes.nativeElement.style.display = "none";

    this.fixed_spendings_button.nativeElement.className = this.fixed_spendings_button.nativeElement.className.replace(" active", "");
    this.outgoings_button.nativeElement.className = this.outgoings_button.nativeElement.className.replace(" active", "");
    this.incomes_button.nativeElement.className = this.incomes_button.nativeElement.className.replace(" active", "");

    switch (tab) {
      case 'fixed_spendings':
        this.fixed_spendings.nativeElement.style.display = "block";
        break;
      case 'outgoings':
        this.outgoings.nativeElement.style.display = "block";
        break;
      case 'incomes':
        this.incomes.nativeElement.style.display = "block";
        break;
    }
    evt.currentTarget.className += " active";
  }

}
