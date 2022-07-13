import { Component, OnDestroy, ViewChild } from "@angular/core";
import { Pick3DrawTimeEnum } from "../../models/pick3-draw-time.enum";
import { LanguagePopoverComponent } from "../../components/language-popover/language-popover.component";
import { IonSlides, PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CardContextService } from "../../services/card-context.service";
import { Pick3WebScrapingProviderService } from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import { Pick3StateLottery } from "../../models/pick3-state-lottery";
import { AppService } from "../../app.service";
import { DrawDateService } from "../../services/draw-date.service";
import { Router } from "@angular/router";
import { DrawStateService } from "../../services/draw-state.service";
import { NavigationEnum } from "../../models/navigate.enum";
import Swiper, { Navigation, Pagination, SwiperOptions } from "swiper";
import { DrawTimeService } from "../../services/draw-time.service";
import { SlideService } from "../../services/slide.service";
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnDestroy {
  @ViewChild("pick3Cards") pick3Cards: SwiperComponent;
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    initialSlide: 7,
    speed: 400
  };
  public prevActiveIndex: number = 7;
  private cardContext = this.cardContextService.context$;
  public slidesLoaded = false;

  default = {
    drawDateTime: Pick3DrawTimeEnum.MORNING
  };

  pick3StateLottery: Pick3StateLottery;

  constructor(private cardContextService: CardContextService,
              private popoverController: PopoverController,
              public translateService: TranslateService,
              private drawDateService: DrawDateService,
              private drawTimeService: DrawTimeService,
              private drawStateService: DrawStateService,
              private appService: AppService,
              private router: Router,
              private slideService: SlideService,
              private pick3WebScrappingService: Pick3WebScrapingProviderService) {
    this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery("TX");
    translateService.setDefaultLang("en-US");
    this.slideService.getSlideNumber().subscribe((data) =>
      this.pick3Cards.swiperRef.slideTo(data, 400)
    );
  }
  /* istanbul ignore next */
  ngOnDestroy() {
    console.log('destrying home');
    this.cardContext = null;
  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true
    });
    /* istanbul ignore next */
    popover.style.cssText = "--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;";
    /* istanbul ignore next */
    return await popover.present();
  }

  /* istanbul ignore next */
  public initializePick3DrawDateCards(swiper): void {
    let count;
    if (swiper.activeIndex === 7) {
      count = swiper.length;
      this.slidesLoaded = true;
      this.initializePick3DrawDateCard(event);
    }
  }

  /* istanbul ignore next */
  public initializePick3DrawDateCard(swiper): void {
    if (swiper != undefined || null) {
      console.log(swiper.activeIndex);
      let activeIndex;
      activeIndex = swiper.activeIndex;
      if (this.slidesLoaded) {
        this.storeId();
        activeIndex = swiper.activeIndex;
        const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
        if (activeIndex <= 7) {
          this.cardContextService.addContext({
            slideNumber: activeIndex + 1,
            data: pick3DrawDateDecks[activeIndex],
            defaultDrawDateTime: this.default.drawDateTime,
            drawTimes: this.appService.getPick3DrawTimeCards(activeIndex + 1)
          });
        }
      }
    }
  }

  /* istanbul ignore next */
  public storeId() {
    let activeIndex;
    if (this.pick3Cards.swiperRef.activeIndex) {
      activeIndex = this.pick3Cards.swiperRef.activeIndex;
      /* istanbul ignore else */
      if (activeIndex !== this.prevActiveIndex) {
        this.appService.pick3CardId = activeIndex + 1;
        this.passIdToGenerate(activeIndex + 1);
      }
    }
  }

  public passIdToGenerate(slideNumber) {
    /* istanbul ignore next */
    if (slideNumber >= 6 || slideNumber === 7) {
      this.appService.dispatchCurrentDrawCardIdEvent(slideNumber);
    }
  }
}
