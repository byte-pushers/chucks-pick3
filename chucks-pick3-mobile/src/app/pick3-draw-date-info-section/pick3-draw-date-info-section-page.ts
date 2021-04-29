import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../services/card-context.service';
import {Pick3DrawDateCard} from '../models/pick3-draw-date-card';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../models/pick3-draw-date-card.domain';
import {Pick3DrawDateCardProperties} from '../models/pick3-draw-date-card.properties';
import {DrawStateService} from '../services/draw-state.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['./pick3-draw-date-info-section.page.scss'],
})
export class Pick3DrawDateInfoSectionPage implements OnInit, OnDestroy {
    public slideNumber: number;
    public data: Pick3DrawDateCardProperties = Pick3DrawDateCardDomain.DEFAULT_CONFIG;
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public showCountDownToDrawing: boolean = false;

    constructor(private cardContextService: CardContextService,
                public drawStateService: DrawStateService,
                public translateService: TranslateService) {

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
