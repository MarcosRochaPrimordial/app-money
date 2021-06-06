import { DocumentReference } from "@angular/fire/firestore";
import { User } from "./User.model";

export interface Period {
    id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    importance: number;
    user: DocumentReference<User>;
}