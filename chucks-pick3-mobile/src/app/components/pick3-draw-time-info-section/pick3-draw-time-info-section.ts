import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {DrawTimeService} from '../../services/draw-time.service';
import {Subscription} from 'rxjs';
import {AppService} from "../../app.service";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSection implements OnInit {
    private static counter = 0;
    private readonly id: number;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService,
                private drawTimeService: DrawTimeService,
                private appService: AppService) {
        /*console.log("Pick3DrawTimeInfoSection() constructor.");*/
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.id = ++Pick3DrawTimeInfoSection.counter;
        this.drawTimes = this.appService.getDrawTimes().map(drawTime => ({...drawTime}));
    }

    ngOnInit(): void {
        this.cardContextService.context$.subscribe(context => {
            if (context) {
                console.log(this.drawTimes);
                this.drawTimes.splice(0, this.drawTimes.length, ...context.drawTimes);
                console.log('Test' + this.drawTimes);
            }
        });
    }

    /* ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }*/

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
           /* console.log(drawTime.getPick3DrawTime());*/
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                this.drawTimeService.setCurrentDrawTimeCard(drawTime);
            }
        });
    }

}
