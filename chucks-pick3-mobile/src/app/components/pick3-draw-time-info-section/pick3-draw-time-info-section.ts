import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {DrawTimeService} from '../../services/draw-time.service';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSection implements OnInit, OnDestroy {
    private static counter = 0;
    private readonly id: number;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService,
                private drawTimeService: DrawTimeService,
                private drawDateService: DrawDateService,
                private appService: AppService) {

        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.id = ++Pick3DrawTimeInfoSection.counter;
        this.drawTimes = this.appService.getPick3DrawTimeCards(this.id);
        console.log("Pick3DrawTimeInfoSection() constructor. id: " + this.id);
    }

    ngOnInit(): void {
        const currentHour = new Date().getHours();

        console.log(this.drawTimes);

        this.drawTimes.forEach(drawTime => {
            const drawTimeHour = drawTime.getDateTime().getHours();
            drawTime.setPick3DrawTime(this.appService.getDrawTime(drawTime.getDateTime()));
            if (currentHour >= drawTimeHour && drawTimeHour <= currentHour) {
                this.selectDrawingTimeCard(drawTime);
            }
        });

        this.drawTimeService.getPick3DrawTime$().subscribe((currentPick3DrawTimeCard: Pick3DrawTimeCard) => {
            if (currentPick3DrawTimeCard && currentPick3DrawTimeCard.getPick3DrawCardId() === this.id) {
                this.drawTimes.forEach(drawTime => {
                    drawTime.setPick3DrawCardId(this.id);
                    drawTime.setPick3DrawTime(currentPick3DrawTimeCard.getPick3DrawTime());
                    drawTime.setDateTime(currentPick3DrawTimeCard.getDateTime());
                    drawTime.setState(currentPick3DrawTimeCard.getState());
                    drawTime.setSelected(currentPick3DrawTimeCard.getSelected());
                }, this);

                console.log(currentPick3DrawTimeCard.getDateTime());
                this.selectDrawingTimeCard(currentPick3DrawTimeCard);
            }
        });
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        this.drawTimes.forEach(drawTime => {
            console.log(pick3DrawTimeCard.getDateTime());
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                // pick3DrawTimeCard.showCountDownToDrawing = false;

                this.drawDateService.dispatchCurrentDrawDateCardEvent(pick3DrawTimeCard);

            }
        });
    }
}
