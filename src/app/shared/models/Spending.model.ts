import { DocumentReference } from "@angular/fire/firestore";
import { Period } from "./Period.model";

export interface Spending {
    id?: string;
    description: string;
    importance: number;
    paid: boolean;
    period: DocumentReference<Period>;
    type: string;
}