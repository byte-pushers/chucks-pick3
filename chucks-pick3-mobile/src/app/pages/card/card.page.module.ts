import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';
import {Pick3DrawDateInfoSection} from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import {Pick3DrawTimeInfoSection} from '../../components/pick3-draw-time-info-section/pick3-draw-time-info-section';
import {I18nService} from '../../services/i18n.service';
import {CountdownTimerComponent} from '../../components/countdown-timer/countdown-timer.component';
import {Pick3DrawTimeCardComponent} from '../../components/pick3-draw-time-card/pick3-draw-time-card.component';
import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CardPageRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        I18nService
    ],
    exports: [
        CardPage
    ],
    declarations: [
        CardPage,
        CountdownTimerComponent,
        Pick3DrawTimeCardComponent,
        Pick3DrawDateInfoSection,
        Pick3DrawTimeInfoSection
    ]
})
export class CardPageModule {

    constructor() {
    }

}
