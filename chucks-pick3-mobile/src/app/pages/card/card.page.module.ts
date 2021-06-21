import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {Pick3DrawDateInfoSection} from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import {Pick3DrawTimeInfoSection} from '../../components/pick3-draw-time-info-section/pick3-draw-time-info-section';
import {I18nService} from '../../services/i18n.service';
import {CountdownTimerComponent} from '../../components/countdown-timer/countdown-timer.component';
import {Pick3DrawTimeCardComponent} from '../../components/pick3-draw-time-card/pick3-draw-time-card.component';
import {GeneratePicksCardComponent} from '../../components/generate-picks-card/generate-picks-card.component';
import {FormsModule} from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CardPageRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        FormsModule,
    ],
    providers: [
        I18nService,
        TranslateStore
    ],
    exports: [
        CardPage
    ],
    declarations: [
        CardPage,
        CountdownTimerComponent,
        Pick3DrawTimeCardComponent,
        GeneratePicksCardComponent,
        Pick3DrawDateInfoSection,
        Pick3DrawTimeInfoSection
    ]
})
export class CardPageModule {

    constructor() {
    }

}
