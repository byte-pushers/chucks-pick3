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
    private static counter = 0;
    private readonly componentInstanceNumber;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    private subscription: Subscription;
    private componentState;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService,
                private drawTimeService: DrawTimeService) {
        console.log("Pick3DrawTimeInfoSection() constructor.");
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.componentState = 'instantiated';
        this.componentInstanceNumber = Pick3DrawTimeInfoSection.counter++;
    }

    ngOnInit(): void {
        this.componentState = 'initializing';
        this.cardContextService.context$.subscribe(context => {
            console.log('Pick3DrawTimeInfoSection.cardContextService.context$.subscribe() method: context: ', context);
            if (context) {
                console.log(context);
                //if (this.componentInstanceNumber === context.slideNumber) {
                this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
                //}
            }

            if (this.componentState === 'initializing') {
                /*console.log('Pick3DrawTimeInfoSection.cardContextService.context$.subscribe() initializing... ');*/
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
            console.log(drawTime.getPick3DrawTime());
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
    }
}
