import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import * as Object from 'bytepushers-js-obj-extensions';
import {DrawStateService} from '../../services/draw-state.service';
import {TranslateService} from '@ngx-translate/core';
import {DrawTimeService} from "../../services/draw-time.service";
import {AppService} from '../../app.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pick3-draw-time-card',
    templateUrl: './pick3-draw-time-card.component.html',
    styleUrls: ['./pick3-draw-time-card.component.scss'],
})
export class Pick3DrawTimeCardComponent implements OnInit, DoCheck, OnDestroy {
    @Input() data: Pick3DrawTimeCard = this.drawTimeService.currentDrawTimeCard;
    oldData: Pick3DrawTimeCard = new Pick3DrawTimeCardDomain(null);
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

    constructor(private drawStateService: DrawStateService,
                public translateService: TranslateService,
                private drawTimeService: DrawTimeService) {
    }

    ngOnInit() {
        this.setDrawingTimeCardState();
    }

    ngDoCheck() {
        this.doCheckCount++;

        const to = JSON.stringify(this.data);
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

    ngOnDestroy() {
        this.data = null;
        this.oldData = null;
        this.changelog = [];
        this.drawingTimeCardColorIndicators = null;
        this.doCheckCount = 0;
    }

    public getSelectedState(): { 'not-selected': boolean, selected: boolean } {
        let selectedStateCssClass = {
            'not-selected': true,
            selected: false
        };
        this.drawingTimeCardColorIndicators.selected = false;

        if (this.data.getSelected()) {
            selectedStateCssClass = {
                'not-selected': false,
                selected: true
            };
            this.drawingTimeCardColorIndicators.selected = true;
        }

        return selectedStateCssClass;
    }

    public setDrawingTimeCardState(): string | string[] | Set<string> | { [klass: string]: any; } {
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
        for (const property in drawingTimeCardColorIndicators) {
            if (drawingTimeCardColorIndicators.hasOwnProperty(property)) {
                if (property === attributeName) {
                    drawingTimeCardColorIndicators[property] = booleanValue;
                    break;
                }
            }
        }
    }
}
