import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawTimeCard} from '../models/pick3-draw-time-card';

@Injectable({
    providedIn: 'root'
})
export class DrawTimeService {
    private pick3DrawTimeSource = new Subject<Pick3DrawTimeCard>();
    public currentDrawTimeCard: Pick3DrawTimeCard = null;
    public viewPicksArray =  [] ;

    constructor() {
    }

    public getPick3DrawTime$() {
        return this.pick3DrawTimeSource.asObservable();
    }

    public setCurrentDrawTimeCard(someDrawTimeCard: Pick3DrawTimeCard) {
        this.currentDrawTimeCard = someDrawTimeCard;
        this.pick3DrawTimeSource.next(this.currentDrawTimeCard);
    }

    public getCurrentDrawTimeCard(): Pick3DrawTimeCard {
        return this.currentDrawTimeCard;
    }
}
