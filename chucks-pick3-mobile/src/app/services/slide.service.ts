import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SlideService {

  public slideSource = new Subject<number>();

  constructor() {}

  passSlideNumber(number: number) {
    this.slideSource.next(number);
  }

  getSlideNumber(): Subject<any> {
    return this.slideSource;
  }
}
