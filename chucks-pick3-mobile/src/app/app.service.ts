import {Injectable} from '@angular/core';
import {Pick3DrawDateCardDomain} from './models/pick3-draw-date-card.domain';
import {Pick3DrawDateCard} from './models/pick3-draw-date-card';
import {Pick3DrawTimeCard} from './models/pick3-draw-time-card';
import {Pick3DrawTimeCardDomain} from './models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from './models/pick3-draw-time.enum';
import {Pick3WebScrapingProviderService} from './providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from './models/pick3-state-lottery';
import {Pick3DrawTime} from './models/pick3-draw-time';
import {DrawTimeService} from './services/draw-time.service';

@Injectable()

export class AppService {
    private pick3StateLottery: Pick3StateLottery;

    private card1;
    private card2;
    private card3;
    private card4;
    private card5;
    private card6;
    private card7;
    private pick3DrawDateDecks: Array<Pick3DrawDateCard> = [];
    private pick3DrawTimes: Array<Pick3DrawTimeCard> = [];

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private drawTimeService: DrawTimeService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.init();
    }

    private init() {
        this.card1 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 1, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card2 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 2, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card3 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 3, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card4 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 4, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card5 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 5, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card6 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 6, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.card7 = new Pick3DrawDateCardDomain({...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{slideNumber: 7, backgroundImageUrl: this.getBackgroundImageUrl(), drawState: this.getDrawState()}});
        this.pick3DrawDateDecks = [
            this.card1,
            this.card2,
            this.card3,
            this.card4,
            this.card5,
            this.card6,
            this.card7
        ];
        this.pick3DrawTimes = [
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
        const currentHour = new Date().getHours();
        this.pick3DrawTimes.forEach(drawTime => {
            const drawTimeHour = drawTime.getDateTime().getHours();
            const currentHour = new Date().getHours();
            for (let i = this.pick3DrawTimes.length; i <= 7; i++) {
                drawTime.setPick3DrawTime(this.getDrawTime(drawTime.getDateTime()));
                if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
                    console.log(`AppService.init() method:about fire event[pick3DrawTimeSource]: drawTime: ${drawTime}`, drawTime);
                    this.drawTimeService.setCurrentDrawTimeCard(drawTime);
                }
            }
            this.setPick3DrawDates();
        });
    }

    public getPick3DrawTimes(): Pick3DrawTimeCard[] {
        return this.pick3DrawTimes.map(drawTime => new Pick3DrawTimeCardDomain(drawTime));
    }

    public getPick3DrawDateDecks(): Pick3DrawDateCard[] {
        return this.pick3DrawDateDecks;
    }

    public setPick3DrawDates(): void {
        this.card7.setDrawDate(new Date());
        this.card6.setDrawDate(this.getSlideDate(2));
        this.card5.setDrawDate(this.getSlideDate(3));
        this.card4.setDrawDate(this.getSlideDate(4));
        this.card3.setDrawDate(this.getSlideDate(5));
        this.card2.setDrawDate(this.getSlideDate(6));
        this.card1.setDrawDate(this.getSlideDate(7));
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

    public getPick3DrawDateCard(cardNumber: number): Pick3DrawDateCard {
        return this.pick3DrawDateDecks.find(pick3DrawDateDeck => pick3DrawDateDeck.slideNumber === cardNumber);
    }

    public getBackgroundImageUrl(): string {
        return this.pick3StateLottery.getBackgroundImageUrl();
    }

    public getCurrentDrawTime(): Pick3DrawTime {
        return this.pick3StateLottery.getCurrentDrawingTime();
    }

    public getDrawTime(someDateTime: Date): Pick3DrawTime {
        return this.pick3StateLottery.getDrawingTime(someDateTime);
    }

    public getDrawState(): string {
        return this.pick3StateLottery.getState();
    }

    public getDrawingTimeByName(drawTime: string): Pick3DrawTime {
        return this.pick3StateLottery.getDrawingTimeByName(drawTime);
    }

    public winningNumberHasBeenDrawn(pick3DrawTime: Pick3DrawTime): Boolean {
        return this.pick3StateLottery.winningNumberHasBeenDrawn(pick3DrawTime);
    }


}
