import {Component, OnInit, ViewChild} from '@angular/core';
import { Pick3DrawDateCard } from '../../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain } from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {IonSlides, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {I18nService} from '../../services/i18n.service';
import {CardContextService} from "../../services/card-context.service";
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";
import {Pick3DrawTimeCardStateEnum} from "../../models/pick3-draw-time-card-state.enum";
import {Pick3DrawTime} from "../../models/pick3-draw-time";
import {DrawTimeService} from "../../services/draw-time.service";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import {Pick3StateLottery} from "../../models/pick3-state-lottery";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('pick3DrawDateCards') ionSlides: IonSlides;
  default = {
    drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
  };
  slideOpts = {
    initialSlide: 2,
    speed: 400
  };
  pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG)
/*    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG),
    new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG)*/
  ];
  private drawTimes: Array<Pick3DrawTimeCard> = [
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.morning',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
      icon: 'morning-icon',
      dateTime: new Date().setHours(7, 15, 0, 0)
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.day',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY,
      icon: 'day-icon',
      dateTime: new Date().setHours(11, 45, 0, 0)
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.evening',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING,
      icon: 'evening-icon',
      dateTime: new Date().setHours(17, 15, 0, 0)
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.night',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT,
      icon: 'night-icon',
      dateTime: new Date().setHours(21, 30, 0, 0)
    })
  ];
  pick3StateLottery: Pick3StateLottery;
  constructor(private cardContextService: CardContextService,
              private popoverController: PopoverController,
              public translateService: TranslateService,
              private drawTimeService: DrawTimeService,
              private pick3WebScrappingService: Pick3WebScrapingProviderService) {
    console.log("HomePage() constructor.");
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    translateService.setDefaultLang('en-US');
  }

  ngOnInit() {
    registerLocaleData(localeEsMx, 'es-MX');
    registerLocaleData(localeEnUS, 'en-US');
    const currentHour = new Date().getHours();
    this.drawTimes.forEach(drawTime => {
      const drawTimeHour = drawTime.getDateTime().getHours();
      drawTime.setPick3DrawTime(this.getDrawTime(drawTime.getDateTime()));

      if (currentHour >=  drawTimeHour && drawTimeHour <= currentHour) {
        this.drawTimeService.setCurrentDrawTimeCard(drawTime);
      }
    });
    this.randomlyMockDrawTimeCardStates(this.pick3DrawDateDecks.length);
    this.cardContextService.addContext({
      slideNumber: this.pick3DrawDateDecks.length,
      data: this.pick3DrawDateDecks[this.pick3DrawDateDecks.length-1],
      defaultDrawDateTime: this.default.drawDateTime,
      drawTimes: this.drawTimes
    });
  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    return await popover.present();
  }

  public initializePick3DrawDateCard(event: any): void {
    this.ionSlides.getActiveIndex().then(activeIndex => {
      console.log(`HomePage.initializePick3DrawDateCard() - Active Index: IonSlides[${activeIndex}]`);
      this.randomlyMockDrawTimeCardStates(activeIndex + 1);
      this.cardContextService.addContext({
        slideNumber: activeIndex + 1,
        data: this.pick3DrawDateDecks[activeIndex],
        defaultDrawDateTime: this.default.drawDateTime,
        drawTimes: this.drawTimes
      });
    });

    this.ionSlides.getPreviousIndex().then(previousIndex => {
      console.log(`HomePage.initializePick3DrawDateCard() - Previous Index: IonSlides[${previousIndex}]`);
    });
  }

  private getDrawTime(someDateTime: Date): Pick3DrawTime {
    return this.pick3StateLottery.getDrawingTime(someDateTime);
  }

  private randomlyMockDrawTimeCardStates(slideNumber: number): void {
    this.drawTimes.forEach(drawTime => {
      drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
      drawTime.setPick3DrawCardId(slideNumber);
    });
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const item = Math.floor(Math.random() * Object.keys(anEnum).length);
    const i2 = Object.keys(anEnum)[item];
    return anEnum[i2];
  }
}
