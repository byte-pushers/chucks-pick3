import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";

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

    constructor(private cardContextService: CardContextService) {
        console.log('CardComponent(): constructor.');
    }

    ngOnInit(): void {
        this.cardContextService.addContext({
            slideNumber: this.slideNumber,
            data: this.data,
            defaultDrawDateTime: this.defaultDrawDateTime,
            drawTimes: this.drawTimes
        });
    }

    ngOnDestroy(): void {

    }

}
