import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawDateCardProperties} from '../../models/pick3-draw-date-card.properties';
import {DrawStateService} from '../../services/draw-state.service';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../../services/i18n.service';
import {Pick3DrawTime} from '../../models/pick3-draw-time';
import {Pick3DrawDateCard} from '../../models/pick3-draw-date-card';

@Component({
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['pick3-draw-date-info-section.scss']
})
export class Pick3DrawDateInfoSectionPage implements OnInit, OnDestroy {
    public slideNumber: number;
    public data: Pick3DrawDateCard = new Pick3DrawDateCardDomain(Pick3DrawDateCardDomain.DEFAULT_CONFIG);
    public defaultDrawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum;
    public showCountDownToDrawing: boolean = false;

    constructor(private cardContextService: CardContextService,
                public drawStateService: DrawStateService,
                public translate: I18nService,
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
