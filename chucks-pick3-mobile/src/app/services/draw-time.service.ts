import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawDateCardDomain} from '../models/pick3-draw-date-card.domain';
import {Pick3DrawDateCard} from '../models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from '../models/pick3-draw-time-card';

@Injectable({
    providedIn: 'root'
})
export class DrawTimeService {
    private pick3DrawTimeSource = new Subject<Pick3DrawTimeCard>();

    pick3DrawTime$ = this.pick3DrawTimeSource.asObservable();

    public currentDrawTime = null;

    constructor() {
    }

    public collectDrawTime(drawTime: Pick3DrawTimeCard) {
      this.currentDrawTime = drawTime;
    }

    public updateCurrentDrawTime(drawTime: Pick3DrawTimeCard) {
        this.pick3DrawTimeSource.next(drawTime);
    }
}
