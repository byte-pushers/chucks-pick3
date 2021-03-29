import {Component, OnInit} from '@angular/core';
import {LanguagePopoverComponent} from '../language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-generate-picks',
    templateUrl: './generate-picks.page.html',
    styleUrls: ['./generate-picks.page.scss'],
})
export class GeneratePicksPage implements OnInit {

    constructor(private popoverCtrl: PopoverController,
                public translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
    }

    async showPopover(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: LanguagePopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
        return await popover.present();

    }

    public continueGenerate() {
        const showContinue = document.getElementById('continue');
        const showGenerate = document.getElementById('generate');
        showContinue.style.display = 'none';
        showGenerate.style.display = 'block';
    }

    public selectYesterdayPrevDrawingDate() {
        const yesterday = document.getElementById('yesterdayPreviousDrawingDate');
        const today = document.getElementById('todayPreviousDrawingDate');
        yesterday.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    selectTodayPrevDrawingDate() {
        const yesterday = document.getElementById('yesterdayPreviousDrawingDate');
        const today = document.getElementById('todayPreviousDrawingDate');
        yesterday.style.backgroundColor = '#e5e5e5';
        today.style.backgroundColor = '#2fdf75';
    }

    public selectTomorrowDrawingDate() {
        const tomorrow = document.getElementById('tomorrowDrawingDate');
        const today = document.getElementById('todayDrawingDate');
        tomorrow.style.backgroundColor = '#2fdf75';
        today.style.backgroundColor = '#e5e5e5';
    }

    selectTodayDrawingDate() {
        const yesterday = document.getElementById('tomorrowDrawingDate');
        const today = document.getElementById('todayDrawingDate');
        yesterday.style.backgroundColor = '#e5e5e5';
        today.style.backgroundColor = '#2fdf75';
    }

    submitGenerate() {
        const showContinue = document.getElementById('continue');
        const showGenerate = document.getElementById('generate');
        showContinue.style.display = 'block';
        showGenerate.style.display = 'none';
    }
}
