import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Pick3DrawDateCard} from '../../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain} from '../../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-generate-picks',
    templateUrl: './generate-picks.page.html',
    styleUrls: ['./generate-picks.page.scss'],
})
export class GeneratePicksPage implements OnInit, AfterViewInit {
    @ViewChild('todayPreviousDrawingDate') todayPreviousDrawingDate: ElementRef;
    @ViewChild('yesterdayPreviousDrawingDate') yesterdayPreviousDrawingDate: ElementRef;
    @ViewChild('todayDrawingDate') todayDrawingDate: ElementRef;
    @ViewChild('tomorrowDrawingDate') tomorrowDrawingDate: ElementRef;

    default = {
        drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
    };
    slideOpts = {
        initialSlide: 7,
        speed: 400
    };
    pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
        new Pick3DrawDateCardDomain({}),
    ];

    constructor(private popoverCtrl: PopoverController,
                public translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }


}
