import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
    @Input() slideNumber: number;
    @Input() data: Pick3DrawDateCard;
    @Input() defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    constructor(private cardContextService: CardContextService) {

    }

    ngOnInit(): void {
        this.cardContextService.addContext({
            slideNumber: this.slideNumber,
            data: this.data,
            defaultDrawDateTime: this.defaultDrawDateTime
        });
    }

    ngOnDestroy(): void {

    }

}
