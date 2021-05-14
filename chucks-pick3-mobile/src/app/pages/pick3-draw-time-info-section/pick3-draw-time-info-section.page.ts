import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import * as Object from 'bytepushers-js-obj-extensions';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {DrawStateService} from '../../services/draw-state.service';

@Component({
    selector: 'pick3-draw-time-info-section',
    templateUrl: 'pick3-draw-time-info-section.html',
    styleUrls: ['pick3-draw-time-info-section.scss']
})
export class Pick3DrawTimeInfoSectionPage implements OnInit, DoCheck, OnDestroy {
    public slideNumber: number;
    @Input() pick3DrawTimeData: Pick3DrawTimeCard;
    public data: Pick3DrawTimeCard;
    oldData: Pick3DrawTimeCard = new Pick3DrawTimeCardDomain(null);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    private pick3StateLottery: Pick3StateLottery;
    changelog: string[] = [];
    drawingTimeCardColorIndicators = {
        'not-drawn-yet': false,
        'not-drawn-yet-with-generated-picks': false,
        drawn: false,
        'drawn-with-generated-picks-with-no-winners': false,
        'drawn-with-generated-picks-with-winners': false,
        selected: false
    };
    doCheckCount = 0;

    constructor(private pick3WebScrappingService: Pick3WebScrapingProviderService,
                private drawStateService: DrawStateService,
                private cardContextService: CardContextService) {

    }

    ngOnInit(): void {
        this.cardContextService.context$.subscribe(context => {
            this.slideNumber = context.slideNumber;
            this.data = new Pick3DrawTimeCardDomain(context.data);
            this.defaultDrawDateTime = context.defaultDrawDateTime;
            this.drawTimes.splice(0, this.drawTimes.splice.length, ...context.drawTimes);
            this.setDrawingTimeCardState();
        });
    }

    ngDoCheck() {
        this.doCheckCount++;

        const to  = JSON.stringify(this.data);
        const from = JSON.stringify(this.oldData);
        const changeLog = `DoCheck customer: changed from ${from} to ${to} `;
        this.changelog.push(changeLog);

        if (Object.isDefinedAndNotNull(this.oldData)) {
            if (this.oldData.getSelected() !== this.data.getSelected()) {
                this.setDrawingTimeCardColorIndicators('selected', this.data.getSelected());
            }
        } else {
            this.setDrawingTimeCardColorIndicators('selected', this.data.getSelected());
        }

        this.oldData = new Pick3DrawTimeCardDomain(JSON.parse(JSON.stringify(this.data)));
    }

    ngOnDestroy(): void {
        this.pick3DrawTimeData = null;
        this.oldData = null;
        this.changelog = [];
        this.drawingTimeCardColorIndicators = null;
        this.doCheckCount = 0;
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

        this.setData(this.pick3StateLottery.get, pick3DrawTime, this.pick3StateLottery.getBackgroundImageUrl(), pick3DrawTimeCard.getIcon());
    }

    private setData(drawState: string, pick3DrawTime: Pick3DrawTime, backgroundImageUrl: string, drawTimeIcon: string): void {
        this.data.setBackgroundImage(backgroundImageUrl);
        this.data.setDrawState(drawState);
        this.data.setDrawTime(pick3DrawTime.getType());
        this.data.setDrawDate(pick3DrawTime.getDateTime());
        this.data.setIcon(drawTimeIcon);
    }

    public getSelectedState(): {'not-selected': boolean, selected: boolean} {
        let selectedStateCssClass = {
            'not-selected': true,
            selected: false
        };

        if (this.data.getSelected()) {
            selectedStateCssClass = {
                'not-selected': false,
                selected: true
            };
        }

        return selectedStateCssClass;
    }

    public setDrawingTimeCardState(): string | string[] | Set<string> | { [klass: string]: any; }  {
        const pick3DrawTimeCardStateEnum = this.data.getState();

        switch (pick3DrawTimeCardStateEnum) {
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET: // gray
                this.setDrawingTimeCardColorIndicators('not-drawn-yet', true);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS: // yellow
                this.setDrawingTimeCardColorIndicators('not-drawn-yet-with-generated-picks', true);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN: // gray
                this.setDrawingTimeCardColorIndicators('drawn', true);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS: // black
                this.setDrawingTimeCardColorIndicators('drawn-with-generated-picks-with-no-winners', true);
                break;
            case Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS: // green
                this.setDrawingTimeCardColorIndicators('drawn-with-generated-picks-with-winners', true);
                break;
            default:
                this.setDrawingTimeCardColorIndicators('not-drawn-yet', true); // gray
        }

        return this.drawingTimeCardColorIndicators;
    }

    private setDrawingTimeCardColorIndicators(attributeName: string, booleanValue: boolean): void {

        if (this.data.getSelected()) {
            this.setCssClass(this.drawingTimeCardColorIndicators, 'selected', true);
            this.retrieveDrawTimeCardColorIndicators(this.drawingTimeCardColorIndicators);

        }

        this.setCssClass(this.drawingTimeCardColorIndicators, attributeName, booleanValue);
    }

    private retrieveDrawTimeCardColorIndicators(colorIndicators) {
        this.drawStateService.passState(colorIndicators);
    }
    private setCssClass(drawingTimeCardColorIndicators: any, attributeName: string, booleanValue: boolean): void {
        for (const property in drawingTimeCardColorIndicators){
            if (drawingTimeCardColorIndicators.hasOwnProperty(property)) {
                if (property === attributeName) {
                    drawingTimeCardColorIndicators[property] = booleanValue;
                    break;
                }
            }
        }
    }

}
