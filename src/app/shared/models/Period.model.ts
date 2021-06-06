import { Spending } from "./Spending.model";

export interface Period {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    importance: number;
    spendings?: Spending[];
}