import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawTimeCard} from '../models/pick3-draw-time-card';

@Injectable({
  providedIn: 'root'
})
export class DrawDateService {
  public pick3DrawDateSource = new Subject<Pick3DrawTimeCard>();
  constructor() { }

  public getPick3DrawDateCard$() {
    return this.pick3DrawDateSource.asObservable();
  }

  public dispatchCurrentDrawDateCardEvent(someDrawDateCard: Pick3DrawTimeCard) {
    this.pick3DrawDateSource.next(someDrawDateCard);
  }
}
