import { Component } from '@angular/core';
import { Pick3DrawingDateCard } from "../domains/pick3-drawing-date-card";
import {Pick3DrawingDateCardDomain} from "../domains/pick3-drawing-date-card.domain";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 7,
    speed: 400
  };
  pick3DrawDateDecks: Array<Pick3DrawingDateCard> = [
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
    new Pick3DrawingDateCardDomain(),
  ];

  constructor() {}

}
