import { Category } from './category';
import { Wallet } from './wallet';

export interface Expense {
    category: Category;
    date: firebase.firestore.Timestamp;
    description: string;
    isGain: boolean;
    value: number;
    wallet: Wallet;
}
