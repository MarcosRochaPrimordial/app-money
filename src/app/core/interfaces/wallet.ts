import { User } from './user';

export interface Wallet {
    description: string;
    isCredit: boolean;
    limit: number;
    flipDate: number;
    overdueDate: number;
    user: User;
}
