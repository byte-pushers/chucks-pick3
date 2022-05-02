import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pick3DrawTimeCard } from '../models/pick3-draw-time-card';

@Injectable({
  providedIn: 'root',
})
export class GeneratePicksService {
  public generatePicksDrawDateSource = new Subject<Pick3DrawTimeCard>();

  constructor() {}

  public getGeneratePicksDrawDateCard$() {
    return this.generatePicksDrawDateSource.asObservable();
  }

  public dispatchGeneratePicksDrawDateCardEvent(someDrawDateCard: Pick3DrawTimeCard) {
    this.generatePicksDrawDateSource.next(someDrawDateCard);
  }
}
