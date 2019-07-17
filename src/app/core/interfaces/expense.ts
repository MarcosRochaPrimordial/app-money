import { Category } from './category';
import { Wallet } from './wallet';
import { User } from './user';

export interface Expense {
    id: string;
    category: Category;
    date: Date;
    drop: number;
    drops?: number;
    description: string;
    isGain: boolean;
    value: number;
    wallet: Wallet;
    user: User;
}

export interface ExpenseBase {
    id: string;
    category: Category;
    date: firebase.firestore.Timestamp;
    drop: number;
    drops?: number;
    description: string;
    isGain: boolean;
    value: number;
    wallet: Wallet;
    user: User;
}
