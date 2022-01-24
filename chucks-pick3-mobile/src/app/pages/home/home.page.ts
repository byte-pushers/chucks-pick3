import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {IonSlides, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';
import {Router} from '@angular/router';
import {DrawStateService} from '../../services/draw-state.service';
import {NavigationEnum} from '../../models/navigate.enum';
import Swiper, {Navigation, Pagination} from "swiper";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  public prevActiveIndex: number = 7;
  private cardContext = this.cardContextService.context$;
  public slidesLoaded = false;
  public swiper = new Swiper('.swiper', {
    speed: 400,
    slidesPerView: 1,
    initialSlide: 7
  });

  default = {
    drawDateTime: Pick3DrawTimeEnum.MORNING
  };
  slideOpts = {
    initialSlide: 7,
    speed: 400
  };

  pick3StateLottery: Pick3StateLottery;

  constructor(private cardContextService: CardContextService,
              private popoverController: PopoverController,
              public translateService: TranslateService,
              private drawDateService: DrawDateService,
              private drawStateService: DrawStateService,
              private appService: AppService,
              private router: Router,
              private pick3WebScrappingService: Pick3WebScrapingProviderService) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    translateService.setDefaultLang('en-US');
    console.log(`HomePage constructor.`);
  }

  ngOnInit() {
    console.log('AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH' + this.swiper.activeIndex);
  }

  /* istanbul ignore next */
  ngAfterViewInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState && this.router.url === '/home') {
      const currentSlideNumber = this.appService.pick3CardId;
      if (currentSlideNumber) {
        this.next(currentSlideNumber - 1);
      }
    }
  }

  /* istanbul ignore next */
  ngOnDestroy() {
    this.cardContext = null;
  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    /* istanbul ignore next */
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    /* istanbul ignore next */
    return await popover.present();
  }

  /* istanbul ignore next */
  public initializePick3DrawDateCards(event: any): void {
    let count
    if (this.swiper.slides.length) {
      count = this.swiper.slides.length;
      console.log(`HomePage.initializePick3DrawDateCards() method slide count :${count}`);
      this.slidesLoaded = true;
      this.initializePick3DrawDateCard(event);
    }
    ;
  }

  /* istanbul ignore next */
  public initializePick3DrawDateCard(event: any): void {
    let activeIndex;
    if (this.slidesLoaded) {
      this.storeId();
      if (this.swiper.activeIndex){
        activeIndex = this.swiper.activeIndex;
        // TODO Determine if we are swiping left(activeIndex -1) or right (activeIndex +1) on slides
        console.log(`HomePage.initializePick3DrawDateCard() - Active Index: IonSlides[${activeIndex}]`);
        // const nextPick3DrawDate = this.pick3DrawDateDecks[activeIndex];
        const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
        /* console.log(`HomePage.initializePick3DrawDateCard() method activeIndex:${activeIndex}, (${activeIndex} + 1) = ${activeIndex + 1}`);*/

        if (activeIndex <= 6) {
          this.cardContextService.addContext({
            slideNumber: activeIndex + 1,
            data: pick3DrawDateDecks[activeIndex],
            defaultDrawDateTime: this.default.drawDateTime,
            drawTimes: this.appService.getPick3DrawTimeCards(activeIndex + 1)
          });
        } else {
          /*this.cardContextService.addContext({
              slideNumber: 7,
              data: pick3DrawDateDecks[6],
              defaultDrawDateTime: this.default.drawDateTime,
              drawTimes: this.appService.getPick3DrawTimeCards(7)
          });*/
        }
      };
    }
  }

  /* istanbul ignore next */
  private next(index) {
    this.swiper.slideTo(index, this.slideOpts.speed);
  }

  public storeId() {
    let activeIndex;
    if (this.swiper.activeIndex){
      activeIndex = this.swiper.activeIndex;
      /* istanbul ignore else */
      if (activeIndex !== this.prevActiveIndex) {
        this.appService.pick3CardId = (activeIndex + 1);
        console.log(this.appService.pick3CardId);
        this.passIdToGenerate(activeIndex + 1);
      }
    };
  }

  public passIdToGenerate(slideNumber) {
    /* istanbul ignore else */
    if (slideNumber >= 6) {
      this.appService.dispatchCurrentDrawCardIdEvent(slideNumber);
    }
  }
}
