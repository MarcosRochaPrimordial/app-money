import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToggleState } from '../interfaces/toggleState';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidenavService {

  private sidenavSubject: Subject<ToggleState> = new Subject<ToggleState>();
  sidenavState = this.sidenavSubject.asObservable();

  constructor() { }

  setState(sidenavState: boolean) {
    this.sidenavSubject.next({show: sidenavState} as ToggleState);
  }
}
