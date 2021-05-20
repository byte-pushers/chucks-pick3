import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
    @Input() slideNumber: number;
    @Input() data: Pick3DrawDateCard;
    @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    private drawTimes: Array<Pick3DrawTimeCard> = [
        new Pick3DrawTimeCardDomain({
            title: 'draw.time.enum.morning',
            drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
            icon: 'morning-icon',
            dateTime: new Date().setHours(10, 15, 0, 0)
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
                private pick3WebScrappingService: Pick3WebScrapingProviderService) {
        console.log('CardComponent(): constructor.');
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    ngOnInit(): void {
        this.drawTimes.forEach(drawTime => {
            drawTime.setPick3DrawTime(this.getDrawTime(drawTime.getDateTime()));
        });
this.randomlyMockDrawTimeCardStates();
        this.cardContextService.addContext({
            slideNumber: this.slideNumber,
            data: this.data,
            defaultDrawDateTime: this.defaultDrawDateTime,
            drawTimes: this.drawTimes
        });
    }

    ngOnDestroy(): void {

    }
    private getDrawTime(someDateTime: Date): Pick3DrawTime {
        return this.pick3StateLottery.getDrawingTime(someDateTime);
    }
    private randomlyMockDrawTimeCardStates(): void {
        // console.log("randomlyMockDrawTimeCardStates() start.");
        this.drawTimes.forEach(drawTime => {
            drawTime.setState(this.randomEnum(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum));
            drawTime.setPick3DrawCardId(this.slideNumber);

            if (drawTime.getDrawTime() === Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY) {
                // drawTime.setState(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
            }
        });

        // console.log("randomlyMockDrawTimeCardStates() end.");
    }

    private randomEnum<T>(anEnum: T): T[keyof T] {
        const item = Math.floor(Math.random() * Object.keys(anEnum).length);
        const i2 = Object.keys(anEnum)[item];
        return anEnum[i2];
    }

}
