import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from "@angular/common/http";
import {Pick3DrawDateInfoSectionPage} from "../pick3-draw-date-info-section/pick3-draw-date-info-section-page";
import {Pick3DrawTimeInfoSectionPage} from "../pick3-draw-time-info-section/pick3-draw-time-info-section.page";
import {I18nService} from "../../services/i18n.service";
import {CountdownTimerComponent} from "../../components/countdown-timer/countdown-timer.component";

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
        Pick3DrawDateInfoSectionPage,
        Pick3DrawTimeInfoSectionPage
    ]
})
export class CardPageModule {

    constructor() {
    }

}
