import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawTimeCard} from '../models/pick3-draw-time-card';

@Injectable({
  providedIn: 'root'
})
export class DrawDateService {
  private pick3DrawDateSource = new Subject<Pick3DrawTimeCard>();
  public currentDrawDateCard: Pick3DrawTimeCard = null;
  constructor() { }

  public getPick3DrawDateCard$() {
    return this.pick3DrawDateSource.asObservable();
  }

  public setCurrentDrawDateCard(someDrawDateCard: Pick3DrawTimeCard) {
    this.currentDrawDateCard = someDrawDateCard;
    this.pick3DrawDateSource.next(this.currentDrawDateCard);
  }

  public getCurrentDrawDateCard(): Pick3DrawTimeCard {
    return this.currentDrawDateCard;
  }
}
