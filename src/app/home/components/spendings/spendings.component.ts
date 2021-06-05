import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Spending } from 'src/app/shared/models/Spending.model';
import { ModalSheetImportComponent } from '../modal-sheet-import/modal-sheet-import.component';
import { ModalSpendingsComponent } from '../modal-spendings/modal-spendings.component';

const ELEMENT_DATA_SPENDINGS: Spending[] = [
  { id: '1', description: 'Hydrogen', importance: 60000 },
  { id: '2', description: 'Helium', importance: 3000 },
  { id: '3', description: 'Lithium', importance: 3000 },
  { id: '4', description: 'Beryllium', importance: 3000 },
  { id: '5', description: 'Boron', importance: 3000 },
  { id: '6', description: 'Carbon', importance: 3000 },
];
const ELEMENT_DATA_OUTGOINGS: Spending[] = [
  { id: '7', description: 'Carbon', importance: 3000 },
  { id: '8', description: 'Nitrogen', importance: 3000 },
  { id: '9', description: 'Oxygen', importance: 3000 },
];
const ELEMENT_DATA_INCOMES: Spending[] = [
  { id: '10', description: 'Hydrogen', importance: 3000 },
  { id: '11', description: 'Helium', importance: 3000 },
  { id: '12', description: 'Lithium', importance: 3000 },
  { id: '13', description: 'Beryllium', importance: 3000 },
  { id: '14', description: 'Boron', importance: 3000 },
  { id: '15', description: 'Carbon', importance: 3000 },
  { id: '16', description: 'Nitrogen', importance: 3000 },
  { id: '17', description: 'Oxygen', importance: 3000 },
  { id: '18', description: 'Fluorine', importance: 3000 },
  { id: '19', description: 'Neon', importance: 3000 },
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

  public fixedSpendings: Spending[] = ELEMENT_DATA_SPENDINGS;
  public outgoings: Spending[] = ELEMENT_DATA_OUTGOINGS;
  public incomes: Spending[] = ELEMENT_DATA_INCOMES;


  constructor(
    private modal: MatDialog,
  ) { }

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

  openSpendingModal() {
    this.modal.open(ModalSpendingsComponent, {
      width: '450px'
    });
  }

  openSheetImport() {
    this.modal.open(ModalSheetImportComponent, {
      width: '450px'
    });
  }

}
