import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawDateCard} from "../../models/pick3-draw-date-card";
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";

@Component({
  selector: 'pick3-draw-date-card',
  templateUrl: './pick3-draw-date-card.component.html',
  styleUrls: ['./pick3-draw-date-card.component.scss'],
})
export class Pick3DrawDateCardComponent implements OnInit {
  @Input() slideNumber: number;
  @Input() data: Pick3DrawDateCard;
  drawTimes: Array<Pick3DrawTimeCard> = [
    new Pick3DrawTimeCardDomain({title: 'Morning'}),
    new Pick3DrawTimeCardDomain({title: 'Day'}),
    new Pick3DrawTimeCardDomain({title: 'Evening'}),
    new Pick3DrawTimeCardDomain({title: 'Night'})
  ];

  constructor() {

  }

  ngOnInit() {
    this.data.setBackgroundImage('https://blairhouseinn.com/wp-content/uploads/2020/02/Bluebonnets-in-Texas-Hill-Country-1170x475.jpg');
    this.data.setDrawState('Texas');
    this.data.setDrawTime('Evening');
    this.data.setDrawDate(new Date());
  }

}
