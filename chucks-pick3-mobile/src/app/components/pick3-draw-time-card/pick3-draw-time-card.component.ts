import {Component, Input, OnInit} from '@angular/core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";

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

  public getSelectedState(): {'not-selected': boolean, selected: boolean} {
    let selectedStateCssClass = {
      'not-selected': true,
      'selected': false
    };

    if (this.data.getSelected()) {
      selectedStateCssClass = {
        'not-selected': false,
        'selected': true
      };
    }

    return selectedStateCssClass;
  }

  public getDrawingTimeCardState(): { }  {
    const pick3DrawTimeCardStateEnum = this.data.getState();
    
    switch (pick3DrawTimeCardStateEnum) {
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET: //gray
        return this.toggleDrawingTimeCardStateCssClass('not-drawn-yet', true);
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS: //yellow
        return this.toggleDrawingTimeCardStateCssClass('not-drawn-yet-with-generated-picks', true);
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN: //gray
        return this.toggleDrawingTimeCardStateCssClass('drawn', true);
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS://black
        return this.toggleDrawingTimeCardStateCssClass('drawn-with-generated-picks-with-no-winners', true);
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS://green
        return this.toggleDrawingTimeCardStateCssClass('drawn-with-generated-picks-with-winners', true);
      default:
        return this.toggleDrawingTimeCardStateCssClass('not-drawn-yet', true);//gray
    }
  }

  private toggleDrawingTimeCardStateCssClass(attributeName: string, booleanValue: boolean): any {
    let drawingTimeCardStateCssClass = {
      'not-drawn-yet': true,
      'not-drawn-yet-with-generated-picks': false,
      'drawn': false,
      'drawn-with-generated-picks-with-no-winners': false,
      'drawn-with-generated-picks-with-winners': false,
      'selected': false
    };

    if (this.data.getSelected()) {
      this.toggleCssClass(drawingTimeCardStateCssClass, 'selected', true);
    }

    return this.toggleCssClass(drawingTimeCardStateCssClass, attributeName, booleanValue);
  }

  private toggleCssClass(drawingTimeCardStateCssClass: any, attributeName: string, booleanValue: boolean): any {
    for(let property in drawingTimeCardStateCssClass){
      if (drawingTimeCardStateCssClass.hasOwnProperty(property)) {
        if (property === attributeName) {
          drawingTimeCardStateCssClass[property] = booleanValue;
        } else if (property !== 'selected') {
          drawingTimeCardStateCssClass[property] = false;
        }
      }
    }
    
    return drawingTimeCardStateCssClass;
  }
}
