import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {DrawTimeService} from '../../services/draw-time.service';
import {Subscription} from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSection implements OnInit {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    private subscription: Subscription;
    private componentState;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService,
                private drawTimeService: DrawTimeService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.componentState = 'instantiated';

    }

    ngOnInit(): void {
        this.componentState = 'initializing';
        this.cardContextService.context$.subscribe(context => {
            this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);

            if (this.componentState === 'initializing') {
                const currentDrawingTime = this.drawTimeService.getCurrentDrawTimeCard();
                this.selectDrawingTimeCard(currentDrawingTime);
            }
        });
        this.componentState = 'initialized';
    }

 /*   ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }*/

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
    }
}
