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

    private card1: Pick3DrawDateCard;
    private card2: Pick3DrawDateCard;
    private card3: Pick3DrawDateCard;
    private card4: Pick3DrawDateCard;
    private card5: Pick3DrawDateCard;
    private card6: Pick3DrawDateCard;
    private card7: Pick3DrawDateCard;
    private pick3DrawDateDecks: Array<Pick3DrawDateCard> = [];
    private pick3DrawTimeCards: Array<Pick3DrawTimeCard> = [];

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private drawTimeService: DrawTimeService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.init();
    }

    private init() {
        this.card1 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 1,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(1)
            }
        });
        this.card2 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 2,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(2)
            }
        });
        this.card3 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 3,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(3)
            }
        });
        this.card4 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 4,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(4)
            }
        });
        this.card5 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 5,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(5)
            }
        });
        this.card6 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 6,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(6)
            }
        });
        this.card7 = new Pick3DrawDateCardDomain({
            ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
                slideNumber: 7,
                backgroundImageUrl: this.getBackgroundImageUrl(),
                drawState: this.getDrawState(),
                drawDate: this.getSlideDate(7)
            }
        });
        this.pick3DrawDateDecks = [
            this.card1,
            this.card2,
            this.card3,
            this.card4,
            this.card5,
            this.card6,
            this.card7
        ];
        this.pick3DrawTimeCards = [
            new Pick3DrawTimeCardDomain({
                title: 'draw.time.enum.morning',
                drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
                icon: 'morning-icon',
                dateTime: new Date().setHours(7, 15, 0, 0),
                showCountDownToDrawing: false
            }),
            new Pick3DrawTimeCardDomain({
                title: 'draw.time.enum.day',
                drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY,
                icon: 'day-icon',
                dateTime: new Date().setHours(11, 45, 0, 0),
                showCountDownToDrawing: false
            }),
            new Pick3DrawTimeCardDomain({
                title: 'draw.time.enum.evening',
                drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING,
                icon: 'evening-icon',
                dateTime: new Date().setHours(17, 15, 0, 0),
                showCountDownToDrawing: false
            }),
            new Pick3DrawTimeCardDomain({
                title: 'draw.time.enum.night',
                drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT,
                icon: 'night-icon',
                dateTime: new Date().setHours(21, 30, 0, 0),
                showCountDownToDrawing: false
            })
        ];
    }

    public getPick3DrawTimeCards(slideNumber?: number): Pick3DrawTimeCard[] {
        const pick3DrawTimes = this.pick3DrawTimeCards.map(drawTime => new Pick3DrawTimeCardDomain(drawTime));

        // const currentHour = new Date().getHours();
        pick3DrawTimes.forEach((drawTime, drawTimeIndex) => {
            const drawTimeHour = drawTime.getDateTime().getHours();
            const currentHour = new Date().getHours();
            const someDrawTime = this.getDrawTime(drawTime.getDateTime());

            if (slideNumber) {
                const slideDate = this.getSlideDate(slideNumber);

                someDrawTime.getDateTime().setDate(slideDate.getDate());
                someDrawTime.getDateTime().setMonth(slideDate.getMonth());
                someDrawTime.getDateTime().setFullYear(slideDate.getFullYear());

                drawTime.setPick3DrawCardId(slideNumber);
            }

            drawTime.setPick3DrawTime(someDrawTime);


            /*if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
            console.log(`AppService.init() method:about fire event[pick3DrawTimeSource]: drawTime: ${drawTime}`, drawTime);
            this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }*/
        });

        return pick3DrawTimes;
    }

    public getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(pick3DrawTime: Pick3DrawTime): Pick3DrawTimeCard {
        const pick3DrawTimeCards = this.pick3DrawTimeCards.map(drawTime => new Pick3DrawTimeCardDomain(drawTime));

        // const currentHour = new Date().getHours();
        const pick3DrawTimeCard = pick3DrawTimeCards.find(pick3DrawTimeCard =>
            Pick3DrawTimeEnum.getPropertyKey(pick3DrawTimeCard.getDrawTime()) === Pick3DrawTimeEnum.getPropertyKey(pick3DrawTime.getType()) &&
            pick3DrawTimeCard.getDateTime().getHours() === pick3DrawTime.getDateTime().getHours() &&
            pick3DrawTimeCard.getDateTime().getMinutes() === pick3DrawTime.getDateTime().getMinutes() &&
            pick3DrawTimeCard.getDateTime().getSeconds() === pick3DrawTime.getDateTime().getSeconds());

        pick3DrawTimeCard.setPick3DrawTime(pick3DrawTime);

        return pick3DrawTimeCard;
    }

    public getPick3DrawDateDecks(): Pick3DrawDateCard[] {
        return this.pick3DrawDateDecks;
    }

    public getSlideDate(slideNumber): Date {
        const slideDate: Date = new Date();

        switch (slideNumber) {
            case 7:
                break;
            case 6:
                slideDate.setDate(slideDate.getDate() - 1);
                break;
            case 5:
                slideDate.setDate(slideDate.getDate() - 2);
                break;
            case 4:
                slideDate.setDate(slideDate.getDate() - 3);
                break;
            case 3:
                slideDate.setDate(slideDate.getDate() - 4);
                break;
            case 2:
                slideDate.setDate(slideDate.getDate() - 5);
                break;
            case 1:
                slideDate.setDate(slideDate.getDate() - 6);
                break;
            default:
                throw `SlideNumber: '${slideNumber}' not supported.`;
        }

        return slideDate;
    }

    public getPick3DrawDateCard(cardNumber: number): Pick3DrawDateCard {
        return this.pick3DrawDateDecks.find(pick3DrawDateDeck => pick3DrawDateDeck.slideNumber === (cardNumber));
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

    public retrievePick3DrawTime(currentSlideNumber): Pick3DrawTimeCard {
        const date = this.getSlideDate(currentSlideNumber);
        const drawTime = this.getDrawTime(date);
        const pick3DrawTime = this.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(drawTime);

        return pick3DrawTime;
    }

    public retrievePick3DrawDate(currentSlideNumber, currentDrawTime): Pick3DrawTimeCard {
        const pick3DrawDateCard = this.getPick3DrawDateCard(currentSlideNumber);
        const drawTime = this.getDrawTime(currentDrawTime);
        const pick3DrawTime = this.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime(drawTime);
        return pick3DrawTime;
    }

}
