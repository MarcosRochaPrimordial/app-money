import { Period } from "./Period.model";

export interface Spending {
    id: string;
    description: string;
    importance: number;
    period: Period;
}