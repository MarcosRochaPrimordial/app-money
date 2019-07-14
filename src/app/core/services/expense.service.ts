import { Injectable } from '@angular/core';
import { WalletRepositoryService } from '../repositories/wallet-repository.service';
import { CategoryRepositoryService } from '../repositories/category-repository.service';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Wallet } from '../interfaces/wallet';
import { User } from '../interfaces/user';
import { Expense } from '../interfaces/expense';
import { ExpenseRepositoryService } from '../repositories/expense-repository.service';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private walletRepository: WalletRepositoryService,
    private categoryRepository: CategoryRepositoryService,
    private expenseRepository: ExpenseRepositoryService,
    private userRepository: UserRepositoryService,
    private userService: UserService
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  getAllWallets(user: User): Observable<Wallet[]> {
    return this.walletRepository.getAllWallets(user);
  }

  save(expense: Expense, user: User) {
    try {
      this.expenseRepository.save(expense);
      if (!expense.isGain && (!expense.wallet || (expense.wallet && !expense.wallet.isCredit))) {
        user.account -= expense.value;
        this.userRepository.updateUser(user);
        this.userService.user = user;
      } else if (expense.isGain) {
        user.account += expense.value;
        this.userRepository.updateUser(user);
        this.userService.user = user;
      }

      return null;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
