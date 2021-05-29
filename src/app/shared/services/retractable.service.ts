import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetractableService {

  private retractableSubject = new BehaviorSubject<boolean>(false);
  public retractable = this.retractableSubject.asObservable();

  constructor() { }

  retract(retract: boolean) {
    this.retractableSubject.next(retract);
  }
}
