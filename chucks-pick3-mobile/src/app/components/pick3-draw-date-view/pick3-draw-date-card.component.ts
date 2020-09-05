import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawDateCard} from "../../domains/pick3-draw-date-card";

@Component({
  selector: 'pick3-draw-date-card',
  templateUrl: './pick3-draw-date-card.component.html',
  styleUrls: ['./pick3-draw-date-card.component.scss'],
})
export class Pick3DrawDateCardComponent implements OnInit {
  @Input() slideNumber: number;
  @Input() data: Pick3DrawDateCard;

  constructor() { }

  ngOnInit() {}

}
