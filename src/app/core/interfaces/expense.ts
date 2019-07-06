import { Category } from './category';
import { Wallet } from './wallet';
import { User } from './user';

export interface Expense {
    category: Category;
    date: Date;
    description: string;
    isGain: boolean;
    value: number;
    wallet: Wallet;
    user: User;
}

export interface ExpenseBase {
    category: Category;
    date: firebase.firestore.Timestamp;
    description: string;
    isGain: boolean;
    value: number;
    wallet: Wallet;
    user: User;
}
