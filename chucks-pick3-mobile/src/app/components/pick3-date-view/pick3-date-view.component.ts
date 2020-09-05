import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawingDateCard} from "../../domains/pick3-drawing-date-card";

@Component({
  selector: 'pick3-date-view',
  templateUrl: './pick3-date-view.component.html',
  styleUrls: ['./pick3-date-view.component.scss'],
})
export class Pick3DateViewComponent implements OnInit {
  @Input() slideNumber: number;
  @Input() data: Pick3DrawingDateCard;

  constructor() { }

  ngOnInit() {}

}
