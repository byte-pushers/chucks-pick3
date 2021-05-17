import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTime} from "../../models/pick3-draw-time";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import {Pick3StateLottery} from "../../models/pick3-state-lottery";
import {Pick3DrawDateCard} from "../../models/pick3-draw-date-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";
import {DrawStateService} from "../../services/draw-state.service";
import {TranslateService} from "@ngx-translate/core";
import {Pick3DrawTimeCardStateEnum} from "../../models/pick3-draw-time-card-state.enum";

@Component({
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSectionPage implements OnInit, OnDestroy {
    private data: Pick3DrawDateCard;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
    }

    ngOnInit(): void {
        this.cardContextService.context$.subscribe(context => {
            this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
        });
    }

    ngOnDestroy(): void {

    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        const pick3DrawTime: Pick3DrawTime = this.pick3StateLottery.getDrawingTimeByName(Pick3DrawTimeEnum.toString(pick3DrawTimeCard.getDrawTime()).toUpperCase());
        this.data.setIcon(pick3DrawTimeCard.getIcon());
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
            }
        });

        // TODO: Either need to invoke Event or update a Serivce with update Pick3DrawDateCard data.
        // this.setData(this.pick3StateLottery.getStateName(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
        // this.cardContextService.addContext(newContext)
    }
}
