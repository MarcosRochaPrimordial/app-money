import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyFormatService } from 'src/app/core/services/currency-format.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Category } from 'src/app/core/interfaces/category';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { User } from 'src/app/core/interfaces/user';
import * as moment from 'moment';
import { Expense } from 'src/app/core/interfaces/expense';
import { MatSnackBar } from '@angular/material';
import { Drop } from 'src/app/core/interfaces/drop';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

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
  drops: Drop[] = [
    {
      showName: 'x1',
      quote: 1
    },
    {
      showName: 'x2',
      quote: 2
    },
    {
      showName: 'x3',
      quote: 3
    },
    {
      showName: 'x4',
      quote: 4
    },
    {
      showName: 'x5',
      quote: 5
    },
    {
      showName: 'x6',
      quote: 6
    },
    {
      showName: 'x7',
      quote: 7
    },
    {
      showName: 'x8',
      quote: 8
    },
    {
      showName: 'x9',
      quote: 9
    },
    {
      showName: 'x10',
      quote: 10
    },
    {
      showName: 'x11',
      quote: 11
    },
    {
      showName: 'x12',
      quote: 12
    }
  ];

  categoriesSubscribe: Subscription;
  walletSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;

    this.register = this.fb.group({
      isGain: [false],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
      value: [null, [Validators.required]],
      drops: [this.drops[0].quote, [Validators.required]],
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

  get dropsForm() {
    return this.register.controls.drops;
  }

  get walletForm() {
    return this.register.controls.wallet;
  }

  get categoryForm() {
    return this.register.controls.category;
  }

  expenseTypeShower() {
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
    for (let i = 1; i <= this.dropsForm.value; i++) {
      const expense: Expense = this.register.value;
      expense.value = CurrencyFormatService.unformat(this.valueForm.value);
      expense.date = moment(this.dateForm.value).add(i - 1, 'month').toDate();
      expense.drop = i;
      const result = this.expenseService.save(expense, this.user);
      if (result) {
        this.snackbar.open('Aconteceu um erro inesperado.', 'Ok', {
          duration: 0
        });
      } else {
        this.router.navigate(['home']);
        this.snackbar.open('Expense registrado com sucesso!', 'Ok', {
          duration: 5000
        });
      }
    }
  }

  changeExpenseType() {
    if (this.isGainForm.value) {
      this.walletForm.setValidators([]);
      this.categoryForm.setValidators([]);
    } else {
      this.walletForm.setValidators([Validators.required]);
      this.categoryForm.setValidators([Validators.required]);
    }
    this.register.updateValueAndValidity();
  }

  verifyForm(): boolean {
    if (!this.isGainForm.value) {
      return this.register.invalid;
    } else {
      return !(this.dateForm.value
        && this.valueForm.value
        && this.dropsForm.value
        && this.descriptionForm.value);
    }
  }

  ngOnDestroy() {
    this.walletSubscribe.unsubscribe();
    this.categoriesSubscribe.unsubscribe();
  }

}
