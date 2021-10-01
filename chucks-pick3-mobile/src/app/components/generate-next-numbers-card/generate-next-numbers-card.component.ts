import {Component, OnInit} from '@angular/core';
import * as BytePushers from 'bytepushers-js-core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {DrawDateService} from '../../services/draw-date.service';
import {DrawStateService} from '../../services/draw-state.service';
import {DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, MORNING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY} from '../../models/pick3-draw-time.enum';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {Router} from '@angular/router';
import {DrawTimeService} from '../../services/draw-time.service';
import {AppService} from '../../app.service';
import {NavigationEnum} from '../../models/navigate.enum';

@Component({
    selector: 'app-generate-next-numbers-card',
    templateUrl: './generate-next-numbers-card.component.html',
    styleUrls: ['./generate-next-numbers-card.component.scss'],
})
export class GenerateNextNumbersCardComponent implements OnInit {
    public drawTimes: Array<Pick3DrawTimeCard> = [];
    newDrawingTimes: any[] = [];
    public pick3StateLottery: Pick3StateLottery;
    private componentState;

    defaultDrawingTimes = [MORNING_DRAW_TIME_KEY, DAY_DRAW_TIME_KEY, EVENING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY];
    generateChoice: any;
    generateButton = true;

    private pick3CardToGenerate: Pick3DrawTimeCard;

    constructor(private drawDateService: DrawDateService,
                private drawTimeService: DrawTimeService,
                private appService: AppService,
                private router: Router,
                private drawStateService: DrawStateService,
                private pick3WebScrappingService: Pick3WebScrapingProviderService,
    ) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        this.componentState = 'instantiated';
    }

    ngOnInit() {
        const today: HTMLElement = document.getElementById('today');
        const yesterday: HTMLElement = document.getElementById('yesterday');
        this.selectTodayGenerateDrawingDate(today, yesterday);
    }

    public selectTomorrowGenerateDrawingDate(tomorrow: any, today: any): void {
        const date = new Date();
        const tomorrowFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(tomorrowFullDate);
    }

    public selectTodayGenerateDrawingDate(today: any, tomorrow: any): void {
        const date = new Date();
        const todayFullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        today.style.backgroundColor = '#2fdf75';
        tomorrow.style.backgroundColor = '#e5e5e5';
        this.setDrawingTimeMenuItems(todayFullDate);

    }

    public setDrawingTimeMenuItems(targetCurrentDate: Date): void {
        const currentPick3DrawTimeCard = this.appService.getPick3DrawTimeCards(7);
        if (BytePushers.DateUtility.isSameDate(targetCurrentDate, new Date())) {
            this.drawTimes = currentPick3DrawTimeCard;
            this.resetDrawingTimes();
            const drawTimes = this.sortDrawTimes(this.drawTimes);
            for (const drawTime of drawTimes) {
                console.log(drawTime.getTitle());
                this.selectDrawingTimeCard(drawTime);
                this.newDrawingTimes.push(drawTime.getTitle());
            }
        } else {
            this.drawTimes = currentPick3DrawTimeCard;
            this.resetDrawingTimes();
            for (const drawTime of this.drawTimes) {
                this.newDrawingTimes.push(drawTime.getTitle());
                this.newDrawingTimes.splice(0, this.newDrawingTimes.length, ...this.defaultDrawingTimes);
            }
        }

    }

    public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
        console.log(pick3DrawTimeCard);
        this.drawTimes.forEach(drawTime => {
            if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(false);
            } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
                drawTime.setSelected(true);
                this.pick3CardToGenerate = pick3DrawTimeCard;
            }
        });
    }

    private resetDrawingTimes(): void {
        if (this.newDrawingTimes !== null && this.newDrawingTimes !== undefined) {
            this.newDrawingTimes.length = 0;
        }

    }

    public submitGenerate(): void {
        this.replaceGeneratedNumbers();
        this.changeNavigation('gotoViewPicks');
        this.drawDateService.dispatchCurrentDrawDateCardEvent(this.pick3CardToGenerate);
        console.log(this.pick3CardToGenerate)
        this.drawTimeService.setCurrentDrawTimeCard(this.pick3CardToGenerate);
        this.router.navigate(['/view-picks']);
    }

    private changeNavigation(route) {
        const routeDirection = NavigationEnum.retrieveNavigation(route);
        this.drawStateService.generateNavigationChoice = routeDirection;
        this.drawStateService.viewNavigationChoice = routeDirection;
    }

    private replaceGeneratedNumbers() {
        const newArray = this.getRandomIntInclusive();
        /*        this.pick3CardToGenerate.getPick3DrawTimeArray().length = 0;*/
        this.pick3CardToGenerate.setPick3DrawTimeArray(newArray);
    }

    private sortDrawTimes(drawTimes) {
        const currentHour = new Date().getHours();
        for (const drawTime of drawTimes) {
            const drawTimeHour = drawTime.getPick3DrawTime().getDateTime().getHours();
            const index = drawTimes.indexOf(drawTime);
            if (drawTimeHour <= currentHour) {
                drawTimes.splice(index, 1);
            }
        }
        return drawTimes;
    }


    private getRandomIntInclusive() {
        const generatedNumberArray = Array.from({length: 12}, () => Math.floor(Math.random() * (999 - 100 + 1) + 100));
        return generatedNumberArray;
    }

    enableGenerateButton() {
        if (this.generateChoice) {
            this.generateButton = false;
        } else {
            this.generateButton = true;
        }
    }
}
