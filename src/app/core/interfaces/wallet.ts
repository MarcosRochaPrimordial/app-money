import { User } from './user';

export interface Wallet {
    id?: string;
    description: string;
    isCredit: boolean;
    limit: number;
    flipDate: number;
    overdueDate: number;
    user: User;
}
