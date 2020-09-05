import { Component } from '@angular/core';
import { Pick3DrawDateCard } from "../domains/pick3-draw-date-card";
import { Pick3DrawDateCardDomain } from "../domains/pick3-draw-date-card.domain";

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
  pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
    new Pick3DrawDateCardDomain(),
  ];

  constructor() {}

}
