import { Injectable } from '@angular/core';
import { WalletRepositoryService } from '../repositories/wallet-repository.service';
import { CategoryRepositoryService } from '../repositories/category-repository.service';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Wallet } from '../interfaces/wallet';
import { User } from '../interfaces/user';
import { Expense } from '../interfaces/expense';
import { ExpenseRepositoryService } from '../repositories/expense-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private walletRepository: WalletRepositoryService,
    private categoryRepository: CategoryRepositoryService,
    private expenseService: ExpenseRepositoryService
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  getAllWallets(user: User): Observable<Wallet[]> {
    return this.walletRepository.getAllWallets(user);
  }

  save(expense: Expense) {
    this.expenseService.save(expense);
  }
}
