import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pick3DrawTimeCard } from '../models/pick3-draw-time-card';
import { Pick3DrawDateCard } from '../models/pick3-draw-date-card';
import { Pick3DrawTime } from '../models/pick3-draw-time';

@Injectable({
  providedIn: 'root',
})
export class SelectPicksService {
  public selectedPick3DrawDateChange: Subject<Pick3DrawDateCard> = new Subject<Pick3DrawDateCard>();
  public selectedPick3DrawTimeChange: Subject<Pick3DrawTime> = new Subject<Pick3DrawTime>();
  public selectedPick3DrawDateCard: Pick3DrawDateCard;
  public selectedPick3DrawTimeCard: Pick3DrawTimeCard;

  constructor() {}

  public setSelectedPick3DrawDateCard(somePick3DrawDateCard: Pick3DrawDateCard) {
    this.selectedPick3DrawDateCard = somePick3DrawDateCard;
  }

  public setSelectedPick3DrawTimeCard(somePick3DrawTimeCard: Pick3DrawTimeCard) {
    this.selectedPick3DrawTimeCard = somePick3DrawTimeCard;
  }

  public getSelectedPick3DrawTimeCard() {
    return this.selectedPick3DrawTimeCard;
  }

  public getSelectedPick3DrawDateCard() {
    return this.selectedPick3DrawDateCard;
  }
}
