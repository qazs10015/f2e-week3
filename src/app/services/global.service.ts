import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  loadingBar$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  openLoadingBar() {
    this.loadingBar$.next(true);
  }

  closeLoadBar() {
    this.loadingBar$.next(false);
  }
}
