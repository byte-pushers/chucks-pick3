import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";

@Component({
  selector: 'pick3-draw-time-card',
  templateUrl: './pick3-draw-time-card.component.html',
  styleUrls: ['./pick3-draw-time-card.component.scss'],
})
export class Pick3DrawTimeCardComponent implements OnInit {
  @Input() data: Pick3DrawTimeCard;

  constructor() { }

  ngOnInit() {

  }

}
