import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Period } from 'src/app/shared/models/Period.model';

@Injectable({
  providedIn: 'root'
})
export class ActualPeriodService {

  private periodSubject = new BehaviorSubject<Period>({} as Period);
  public period = this.periodSubject.asObservable();

  constructor() { }

  selectPeriod(period: Period) {
    this.periodSubject.next(period);
  }
}
