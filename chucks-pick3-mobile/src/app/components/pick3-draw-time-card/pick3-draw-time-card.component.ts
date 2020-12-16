import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';

@Component({
  selector: 'pick3-draw-time-card',
  templateUrl: './pick3-draw-time-card.component.html',
  styleUrls: ['./pick3-draw-time-card.component.scss'],
})
export class Pick3DrawTimeCardComponent implements OnInit, OnDestroy {
  @Input() data: Pick3DrawTimeCard;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.data = null;
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

  public getDrawingTimeCardState(): string | string[] | Set<string> | { [klass: string]: any; }  {
    const pick3DrawTimeCardStateEnum = this.data.getState();
    let cssClass: string | string[] | Set<string> | { [klass: string]: any; };

    console.log("getDrawingTimeCardState() start.");
    switch (pick3DrawTimeCardStateEnum) {
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET: //gray
        cssClass = this.toggleDrawingTimeCardStateCssClass('not-drawn-yet', true);
        break;
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS: //yellow
        cssClass = this.toggleDrawingTimeCardStateCssClass('not-drawn-yet-with-generated-picks', true);
        break;
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN: //gray
        cssClass = this.toggleDrawingTimeCardStateCssClass('drawn', true);
        break;
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS://black
        cssClass = this.toggleDrawingTimeCardStateCssClass('drawn-with-generated-picks-with-no-winners', true);
        break;
      case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS://green
        cssClass = this.toggleDrawingTimeCardStateCssClass('drawn-with-generated-picks-with-winners', true);
        break;
      default:
        cssClass = this.toggleDrawingTimeCardStateCssClass('not-drawn-yet', true);//gray
    }

    console.log("getDrawingTimeCardState() end.");
    return cssClass;
  }

  private toggleDrawingTimeCardStateCssClass(attributeName: string, booleanValue: boolean): any {
    const drawingTimeCardStateCssClass = {
      'not-drawn-yet': false,
      'not-drawn-yet-with-generated-picks': false,
      'drawn': false,
      'drawn-with-generated-picks-with-no-winners': false,
      'drawn-with-generated-picks-with-winners': false,
      'selected': false
    };
    //console.log('drawingTimeCardStateCssClass: ' + drawingTimeCardStateCssClass, drawingTimeCardStateCssClass);

    if (this.data.getSelected()) {
      this.toggleCssClass(drawingTimeCardStateCssClass, 'selected', true);
    }

    this.toggleCssClass(drawingTimeCardStateCssClass, attributeName, booleanValue);
    //console.log('attribute name: ' + attributeName + ', booleanValue: ' + booleanValue + ', drawingTimeCardStateCssClass: ' + drawingTimeCardStateCssClass, drawingTimeCardStateCssClass);

    return drawingTimeCardStateCssClass;
  }

  private toggleCssClass(drawingTimeCardStateCssClass: any, attributeName: string, booleanValue: boolean): any {
    for(let property in drawingTimeCardStateCssClass){
      if (drawingTimeCardStateCssClass.hasOwnProperty(property)) {
        if (property === attributeName) {
          drawingTimeCardStateCssClass[property] = booleanValue;
          break;
        }
      }
    }
    
    return drawingTimeCardStateCssClass;
  }
}
