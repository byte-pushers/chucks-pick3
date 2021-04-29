import {Component, OnDestroy, OnInit} from "@angular/core";
import {CardContextService} from "../services/card-context.service";
import {Pick3DrawDateCard} from "../models/pick3-draw-date-card";
import {Pick3DrawTimeEnum} from "../models/pick3-draw-time.enum";
import {Pick3DrawDateCardDomain} from "../models/pick3-draw-date-card.domain";

@Component({
    selector: 'pick3-draw-time-info-section',
    templateUrl: './pick3-draw-time-info-section.page.html',
    styleUrls: ['./pick3-draw-time-info-section.page.scss'],
})
export class Pick3DrawTimeInfoSectionPage implements OnInit, OnDestroy {
    public slideNumber: number;
    public data= Pick3DrawDateCardDomain.DEFAULT_CONFIG;
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;

    constructor(private cardContextService: CardContextService) {

    }

    ngOnInit(): void {
        this.cardContextService.context$.subscribe(context => {
            this.slideNumber = context.slideNumber;
            this.data = new Pick3DrawDateCardDomain(context.data);
            this.defaultDrawDateTime = context.defaultDrawDateTime;
        });
    }

    ngOnDestroy(): void {

    }
}
