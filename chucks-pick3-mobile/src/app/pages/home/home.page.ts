import {Component, OnInit, ViewChild} from '@angular/core';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {IonSlides, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {I18nService} from '../../services/i18n.service';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {DrawTimeService} from '../../services/draw-time.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import * as BytePushers from 'bytepushers-js-core';


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
        initialSlide: 7,
        speed: 400
    };
    card1 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card2 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card3 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card4 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card5 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card6 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    card7 = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
        this.card1,
        this.card2,
        this.card3,
        this.card4,
        this.card5,
        this.card6,
        this.card7
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
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        translateService.setDefaultLang('en-US');
        this.card7.setDrawDate(new Date());
        this.card6.setDrawDate(this.getSlideDate(2));
        this.card5.setDrawDate(this.getSlideDate(3));
        this.card4.setDrawDate(this.getSlideDate(4));
        this.card3.setDrawDate(this.getSlideDate(5));
        this.card2.setDrawDate(this.getSlideDate(6));
        this.card1.setDrawDate(this.getSlideDate(7));
    }

    ngOnInit() {
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');
        const currentHour = new Date().getHours();
        this.drawTimes.forEach(drawTime => {
            const drawTimeHour = drawTime.getDateTime().getHours();
            drawTime.setPick3DrawTime(this.getDrawTime(drawTime.getDateTime()));
            if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
        this.randomlyMockDrawTimeCardStates(this.pick3DrawDateDecks.length);
        this.cardContextService.addContext({
            slideNumber: this.pick3DrawDateDecks.length,
            data: this.pick3DrawDateDecks[this.pick3DrawDateDecks.length - 1],
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
            /* console.log(`HomePage.initializePick3DrawDateCard() - Active Index: IonSlides[${activeIndex}]`);*/
            this.randomlyMockDrawTimeCardStates(activeIndex + 1);
            this.cardContextService.addContext({
                slideNumber: activeIndex + 1,
                data: this.pick3DrawDateDecks[activeIndex],
                defaultDrawDateTime: this.default.drawDateTime,
                drawTimes: this.drawTimes
            });
        });

        this.ionSlides.getPreviousIndex().then(previousIndex => {
            /* console.log(`HomePage.initializePick3DrawDateCard() - Previous Index: IonSlides[${previousIndex}]`);*/
        });
    }

    private getDrawTime(someDateTime: Date): Pick3DrawTime {
        return this.pick3StateLottery.getDrawingTime(someDateTime);
    }

    private randomlyMockDrawTimeCardStates(slideNumber: number): void {
        // Date that could be used for the checking the current, past and future slides
        this.drawTimes.forEach(drawTime => {
            drawTime.setDateTime(this.pick3DrawDateDecks[slideNumber - 1].getDrawDate());
            drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
            drawTime.setPick3DrawCardId(slideNumber);

            this.drawTimeService.setCurrentDrawTimeCard(drawTime);
        });
    }

    private randomEnum<T>(anEnum: T): T[keyof T] {
        const item = Math.floor(Math.random() * Object.keys(anEnum).length);
        const i2 = Object.keys(anEnum)[item];
        return anEnum[i2];
    }


    private getSlideDate(slideNumber) {
        const today = new Date();
        let slideDate: Date = null;
        if (slideNumber === 1) {
            slideDate = today;
        } else {
            slideDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (slideNumber - 1));
        }

        return slideDate;
    }

}
