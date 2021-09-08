import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Pick3DrawTimeCard} from "../models/pick3-draw-time-card";

@Injectable({
  providedIn: 'root'
})
export class SlideTransitionService {
  private slideNumberSource = new Subject<number>();
  public currentSlideNumber: number = null;
  constructor() { }

  public getSlideNumber$() {
    return this.slideNumberSource.asObservable();
  }

  public dispatchCurrentSlideNumberEvent(someSlideNumber: number) {
    this.currentSlideNumber = someSlideNumber;
    this.slideNumberSource.next(someSlideNumber);
  }
}
