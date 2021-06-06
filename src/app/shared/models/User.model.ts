import { Period } from "./Period.model";

export interface User {
    id?: string;
    googleId: string;
    email: string;
    name: string;
    language: string;
    currency: string;
    photoUrl: string;
    periods?: Period[];
}