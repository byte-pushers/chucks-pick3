import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawTimeCard} from "../models/pick3-draw-time-card";

@Injectable({
    providedIn: 'root'
})
export class SlideTransitionService {
    private slideNumberSource = new Subject<number>();
    public currentSlideNumber: number = null;
    public currentPick3DrawTime: Pick3DrawTimeCard = null;

    constructor() {
    }

    public getSlideNumber$() {
        return this.slideNumberSource.asObservable();
    }

    public setTransitionalPick3DrawTimeCard(somePick3drawTime: Pick3DrawTimeCard) {
        this.currentPick3DrawTime = somePick3drawTime;
    }

    public dispatchCurrentSlideNumberEvent(someSlideNumber: number) {
        this.currentSlideNumber = someSlideNumber;
        this.slideNumberSource.next(someSlideNumber);
    }
}
