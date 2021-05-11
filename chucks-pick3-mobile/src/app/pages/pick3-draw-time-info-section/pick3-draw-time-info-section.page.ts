import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";
import {Pick3DrawTimeCardDomain} from "../../models/pick3-draw-time-card.domain";
import {Pick3DrawTime} from "../../models/pick3-draw-time";
import {Pick3WebScrapingProviderService} from "../../providers/web-scraping/pick3-web-scraping-provider.service";
import {Pick3StateLottery} from "../../models/pick3-state-lottery";
import {Pick3DrawDateCard} from "../../models/pick3-draw-date-card";

@Component({
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSectionPage implements OnInit, OnDestroy {
    public slideNumber: number;
    public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    private pick3StateLottery: Pick3StateLottery;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private cardContextService: CardContextService) {

    }

    ngOnInit(): void {
        this.cardContextService.context$.subscribe(context => {
            this.slideNumber = context.slideNumber;
            this.data = new Pick3DrawDateCardDomain(context.data);
            this.defaultDrawDateTime = context.defaultDrawDateTime;
            this.drawTimes = this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
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

        this.setData(this.pick3StateLottery.getStateName(), pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
    }

    private setData(drawState: string, pick3DrawTime: Pick3DrawTime, backgroundImageUrl: string, drawTimeIcon: string): void {
        this.data.setBackgroundImage(backgroundImageUrl);
        this.data.setDrawState(drawState);
        this.data.setDrawTime(pick3DrawTime.getType());
        this.data.setDrawDate(pick3DrawTime.getDateTime());
        this.data.setIcon(drawTimeIcon);

        /*this.cardContextService.addContext(
            {
                slideNumber: this.slideNumber,
                data: {
                    drawDate: this.data.getDrawDate(),
                    drawState: this.data.getDrawState(),
                    drawTime: this.data.getDrawTime(),
                    backgroundImage: this.data.getBackgroundImage(),
                    winningNumber:
                        this.data.getWinningNumberDigit1()*100 +
                        this.data.getWinningNumberDigit2()*10 +
                        this.data.getWinningNumberDigit3()*1,
                    icon: this.data.getDrawDateIcon(),
                },
                defaultDrawDateTime: this.defaultDrawDateTime
            }
        );*/
    }
}
