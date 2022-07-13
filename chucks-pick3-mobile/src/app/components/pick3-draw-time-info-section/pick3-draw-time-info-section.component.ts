import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pick3DrawTimeCard } from '../../models/pick3-draw-time-card';
import { Pick3WebScrapingProviderService } from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import { Pick3StateLottery } from '../../models/pick3-state-lottery';
import { DrawTimeService } from '../../services/draw-time.service';
import { AppService } from '../../app.service';
import { DrawDateService } from '../../services/draw-date.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationEnum } from '../../models/navigate.enum';
import { DrawStateService } from '../../services/draw-state.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pick3-draw-time-info-section',
  templateUrl: 'pick3-draw-time-info-section.component.html',
  styleUrls: ['pick3-draw-time-info-section.component.scss'],
})
export class Pick3DrawTimeInfoSectionComponent implements OnInit, OnDestroy {
  private static counter = 0;
  public id: number = -1;
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  private drawTimeSubscription: Subscription;
  private routerUrl;

  constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService, private drawTimeService: DrawTimeService, private drawStateService: DrawStateService, private drawDateService: DrawDateService, private router: Router, private appService: AppService) {
    this.routerUrl = this.router.url;
    /* istanbul ignore if */
    if (this.routerUrl === '/home') {
      this.id = ++Pick3DrawTimeInfoSectionComponent.counter;
      console.log('Pick3DrawTimeInfoSectionComponent() constructor. id: ' + this.id);
      console.log('******BEFORE******' + this.drawTimes);
      this.drawTimes = this.appService.getPick3DrawTimeCards(this.id);
      console.log('******AFTER******' + this.drawTimes);
    }

    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
  }

  ngOnInit(): void {
    const currentHour = new Date().getHours();

    /* istanbul ignore next */
    this.drawTimes.some((drawTime) => {
      const drawTimeHour = drawTime.getDateTime().getHours();
      drawTime.setPick3DrawTime(this.appService.getDrawTime(drawTime.getDateTime()));

      if (currentHour < drawTimeHour || currentHour >= 22) {
        this.selectDrawingTimeCard(drawTime);
        return true;
      }

      return false;
    });
    /* istanbul ignore next */
    this.drawTimeSubscription = this.drawTimeService.getPick3DrawTime$().subscribe((currentPick3DrawTimeCard: Pick3DrawTimeCard) => {
      if (currentPick3DrawTimeCard && currentPick3DrawTimeCard.getPick3DrawCardId() === this.id) {
        this.drawTimes.forEach((drawTime) => {
          drawTime.setPick3DrawCardId(this.id);
          drawTime.setPick3DrawTime(currentPick3DrawTimeCard.getPick3DrawTime());
          drawTime.setDateTime(currentPick3DrawTimeCard.getDateTime());
          drawTime.setState(currentPick3DrawTimeCard.getState());
          drawTime.setSelected(currentPick3DrawTimeCard.getSelected());
        }, this);

        this.selectDrawingTimeCard(currentPick3DrawTimeCard);
      }
    });
  }

  /* istanbul ignore next */
  ngOnDestroy(): void {
    console.log(`Pick3DrawTimeInfoSection.ngOnDestroy: id: ${this.id}`);
    this.drawTimeSubscription?.unsubscribe();

    if (this.routerUrl === '/home') {
      Pick3DrawTimeInfoSectionComponent.counter--;
      console.log(`Pick3DrawTimeInfoSection.ngOnDestroy: counter: ${Pick3DrawTimeInfoSectionComponent.counter}`);
    }
  }

  /* istanbul ignore next */
  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    this.drawTimes.forEach((drawTime) => {
      if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(false);
      } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(true);
        // pick3DrawTimeCard.showCountDownToDrawing = false;
        this.checkForGeneratedArray(pick3DrawTimeCard);
        this.drawDateService.dispatchCurrentDrawDateCardEvent(pick3DrawTimeCard);
      }
    });
  }

  /* istanbul ignore next */
  private checkForGeneratedArray(pick3DrawTimeCard) {
    if (pick3DrawTimeCard.getPick3DrawTimeArray() === null) {
      this.switchDrawDateButtons('viewPicksDisabled');
    } else {
      this.switchDrawDateButtons('viewPicksEnabled');
    }
  }

  /* istanbul ignore next */
  private switchDrawDateButtons(drawTimeButtonString: string) {
    const drawDateButtonValue = NavigationEnum.retrieveNavigation(drawTimeButtonString);
    this.drawStateService.generateNavigationChoice = drawDateButtonValue;
    this.drawStateService.viewNavigationChoice = drawDateButtonValue;
  }
}
