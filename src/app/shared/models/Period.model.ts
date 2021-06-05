export interface Period {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    importance: number;
    checked?: boolean;
}