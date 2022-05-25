import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { Pick3StateLottery } from '../../models/pick3-state-lottery';
import { CardContextService } from '../../services/card-context.service';
import { DrawTimeService } from '../../services/draw-time.service';
import { IonicToastNotificationService } from '../../services/ionic-toast-notification.service';
import { NumberUtilityService } from '../../services/numberUtility.service';
import { NavigationEnum } from '../../models/navigate.enum';
import { DrawStateService } from '../../services/draw-state.service';

@Component({
  selector: 'app-view-picks-card',
  templateUrl: './view-picks-card.component.html',
  styleUrls: ['./view-picks-card.component.scss'],
})
export class ViewPicksCardComponent implements OnInit, OnDestroy {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  private componentState;
  public generatedNumbers: any;
  viewPicksArray: any[];

  constructor(private cardContextService: CardContextService, private toastService: IonicToastNotificationService, private drawTimeService: DrawTimeService, private numbers: NumberUtilityService, private drawStateService: DrawStateService) {}

  ngOnInit() {
    if (this.drawTimeService.getCurrentDrawTimeCard() != null || undefined) {
      const numbersThatWereGenerated = this.drawTimeService.getCurrentDrawTimeCard().getPick3DrawTimeArray();
      this.viewPicksArray = numbersThatWereGenerated;
      this.checkforSingleDigits(this.viewPicksArray);
    } else {
      this.toastService.presentToast('Results Not Available', 'Please generate numbers and come back later.', 'results-not-available');
    }
    this.componentState = 'initializing';
    this.componentState = 'initialized';
  }

  private checkforSingleDigits(arrayTobeChecked) {
    arrayTobeChecked.forEach((array) => {
      if (array.toString().length < 3) {
        const index = arrayTobeChecked.indexOf(array);
        const numberReplacement = this.numbers.padLeft(array, 3);
        this.viewPicksArray.splice(index, 1, numberReplacement);
      }
    });
  }
  ngOnDestroy() {
    this.enableViewPicksButtonOnCard(this.drawTimeService.getCurrentDrawTimeCard().pick3DrawCardId);
  }

  /* istanbul ignore next */
  public switchDrawDateButtons(drawDateButtonString: any) {
    const drawDateButtonValue = NavigationEnum.retrieveNavigation(drawDateButtonString);
    this.drawStateService.generateNavigationChoice = drawDateButtonValue;
    this.drawStateService.viewNavigationChoice = drawDateButtonValue;
  }

  /* istanbul ignore next */
  private enableViewPicksButtonOnCard(slideNumber) {
    if (slideNumber === 7) {
      this.switchDrawDateButtons('gotoViewPicks');
    }
  }
}
