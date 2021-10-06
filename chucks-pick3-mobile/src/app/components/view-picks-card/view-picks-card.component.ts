import {Component, OnInit} from '@angular/core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {CardContextService} from '../../services/card-context.service';
import {DrawTimeService} from '../../services/draw-time.service';
import {IonicToastNotificationService} from '../../services/ionic-toast-notification.service';

@Component({
    selector: 'app-view-picks-card',
    templateUrl: './view-picks-card.component.html',
    styleUrls: ['./view-picks-card.component.scss'],
})
export class ViewPicksCardComponent implements OnInit {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    public pick3StateLottery: Pick3StateLottery;
    private componentState;
    public generatedNumbers: any;
    viewPicksArray: any[];

    constructor(private cardContextService: CardContextService,
                private toastService: IonicToastNotificationService,
                private drawTimeService: DrawTimeService) {
    }

    ngOnInit() {
        const numbersThatWereGenerated = this.drawTimeService.getCurrentDrawTimeCard().getPick3DrawTimeArray();

        if (numbersThatWereGenerated !== null && numbersThatWereGenerated !== undefined) {
           this.viewPicksArray = numbersThatWereGenerated;
        } else {
            this.toastService.presentToast('Results Not Available',
                'Please generate numbers and come back later.', 'results-not-available');
        }
        this.componentState = 'initializing';
        this.componentState = 'initialized';
    }


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
