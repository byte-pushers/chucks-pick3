import {Component, OnInit, ViewChild} from '@angular/core';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {IonSlides, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {DrawTimeService} from '../../services/draw-time.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    prevActiveIndex = 7;
    @ViewChild('pick3DrawDateCards') ionSlides: IonSlides;
    default = {
        drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
    };
    slideOpts = {
        initialSlide: 7,
        speed: 400
    };

    pick3StateLottery: Pick3StateLottery;

    constructor(private cardContextService: CardContextService,
                private popoverController: PopoverController,
                public translateService: TranslateService,
                private drawTimeService: DrawTimeService,
                private drawDateService: DrawDateService,
                private appService: AppService,
                private pick3WebScrappingService: Pick3WebScrapingProviderService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        translateService.setDefaultLang('en-US');
    }

    ngOnInit() {
        /* registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');
        const currentHour = new Date().getHours();
        const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
        const drawTimes = this.appService.getPick3DrawTimes();
        drawTimes.forEach(drawTime => {
            const drawTimeHour = drawTime.getDateTime().getHours();
            /* drawTime.setPick3DrawCardId(this.appService.getPick3DrawDateDecks().length);* * /
            drawTime.setPick3DrawTime(this.getDrawTime(drawTime.getDateTime()));
            if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
                console.log(`HomePage.ngOnInit() method:about fire event[pick3DrawTimeSource]: drawTime: ${drawTime}`, drawTime);
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
        this.randomlyMockDrawTimeCardStates(pick3DrawDateDecks.length);
        this.cardContextService.addContext({
            slideNumber: pick3DrawDateDecks.length,
            data: pick3DrawDateDecks[pick3DrawDateDecks.length - 1],
            defaultDrawDateTime: this.default.drawDateTime,
            // currentDrawDateTime: this.drawTimeService.getCurrentDrawTimeCard().getDrawTime(),
            drawTimes: drawTimes
        });
        console.log(pick3DrawDateDecks.length); */
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
        let slideDirection = null;
        this.ionSlides.getActiveIndex().then(activeIndex => {
            if (activeIndex < this.prevActiveIndex){
                this.prevActiveIndex = activeIndex;
                slideDirection = -1;
            } else if (activeIndex >= this.prevActiveIndex){
                this.prevActiveIndex = activeIndex;
                slideDirection =  1;
            }
            // TODO Determine if we are swiping left(activeIndex -1) or right (activeIndex +1) on slides
            /* console.log(`HomePage.initializePick3DrawDateCard() - Active Index: IonSlides[${activeIndex}]`);*/
            // const nextPick3DrawDate = this.pick3DrawDateDecks[activeIndex];
            const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
      /*      console.log(`HomePage.initializePick3DrawDateCard() method activeIndex:${activeIndex}, (${activeIndex} + 1) = ${activeIndex + 1}`);*/
            this.randomlyMockDrawTimeCardStates(activeIndex, slideDirection);
            this.cardContextService.addContext({
                slideNumber: activeIndex + 1,
                data: pick3DrawDateDecks[activeIndex],
                defaultDrawDateTime: this.default.drawDateTime,
                // currentDrawDateTime: this.drawTimeService.getCurrentDrawTimeCard().getDrawTime(),
                drawTimes: this.appService.getPick3DrawTimes()
            });
        });

        this.ionSlides.getPreviousIndex().then(previousIndex => {
            /* console.log(`HomePage.initializePick3DrawDateCard() - Previous Index: IonSlides[${previousIndex}]`);*/
        });
    }

    checkActiveIndex(activeIndex) {
        let slideDirection = null;
        if (activeIndex < this.prevActiveIndex) {
                this.prevActiveIndex = activeIndex;
                return slideDirection = -1;
            } else if (activeIndex >= this.prevActiveIndex) {
                this.prevActiveIndex = activeIndex;
                return  slideDirection = 1;
            }
    }

    /* private getDrawTime(someDateTime: Date): Pick3DrawTime {
         return this.pick3StateLottery.getDrawingTime(someDateTime);
     }*/
    private randomlyMockDrawTimeCardStates(slideNumber: number, slide1Direction: number): void {
        if (slideNumber === 6 || slideNumber === 7) {
            slide1Direction = 0;
        } else if (slideNumber === 0 || slideNumber === 1) {
            slideNumber = 1;
            slide1Direction = 0;
        }
        // Date that could be used for the checking the current, past and future slides
        const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
        const drawTimes = this.appService.getPick3DrawTimes();
        drawTimes.forEach(drawTime => {
           /* console.log(pick3DrawDateDecks[slideNumber + slide1Direction]);*/
            drawTime.setDateTime(pick3DrawDateDecks[slideNumber + slide1Direction].getDrawDate());
            drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
            drawTime.setPick3DrawCardId(slideNumber);
            /*console.log(`HomePage.ngOnInit() method:about fire event[pick3DrawTimeSource]: drawTime: ${drawTime}`, drawTime);*/
            this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            this.drawDateService.setCurrentDrawDateCard(drawTime);
        });
    }

    private randomEnum<T>(anEnum: T): T[keyof T] {
        const item = Math.floor(Math.random() * Object.keys(anEnum).length);
        const i2 = Object.keys(anEnum)[item];
        return anEnum[i2];
    }
}
