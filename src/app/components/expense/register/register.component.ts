import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyFormatService } from 'src/app/core/services/currency-format.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Category } from 'src/app/core/interfaces/category';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/core/interfaces/user';
import * as moment from 'moment';
import { Expense } from 'src/app/core/interfaces/expense';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  user: User;
  register: FormGroup;
  categories: Category[] = [];
  wallets: Wallet[] = [];

  categoriesSubscribe: Subscription;
  walletSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.cookieService.get('user'));

    this.register = this.fb.group({
      isGain: [false],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
      value: [null, [Validators.required]],
      category: [null, [Validators.required]],
      wallet: [null, [Validators.required]],
      user: [this.user]
    });

    this.categoriesSubscribe = this.expenseService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.walletSubscribe = this.expenseService.getAllWallets(this.user).subscribe((wallets: Wallet[]) => {
      this.wallets = wallets;
    });

    this.dateForm.setValue(moment().toISOString());
  }

  get isGainForm() {
    return this.register.controls.isGain;
  }

  get dateForm() {
    return this.register.controls.date;
  }

  get descriptionForm() {
    return this.register.controls.description;
  }

  get valueForm() {
    return this.register.controls.value;
  }

  expenseShower() {
    if (this.isGainForm.value) {
      return 'Ganho';
    } else {
      return 'Gasto';
    }
  }

  formatCurrency() {
    if (!!this.valueForm.value) {
      this.valueForm.setValue(CurrencyFormatService.format(this.valueForm.value));
    }
  }

  unformatCurrency() {
    if (!!this.valueForm.value) {
      this.valueForm.setValue(CurrencyFormatService.unformat(this.valueForm.value));
    }
  }

  saveExpense() {
    const expense: Expense = this.register.value;
    expense.value = CurrencyFormatService.unformat(this.valueForm.value);
    expense.date = moment(this.dateForm.value).toDate();

    this.expenseService.save(expense);
  }

  ngOnDestroy() {
    this.walletSubscribe.unsubscribe();
    this.categoriesSubscribe.unsubscribe();
  }

}
