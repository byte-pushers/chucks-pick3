import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Pick3DrawDateInfoSectionPage } from './pick3-draw-date-info-section-page';
import { CountdownTimerComponent } from '../../components/countdown-timer/countdown-timer.component';
import { TranslateModule } from '@ngx-translate/core';
import { Pick3DrawDateInfoSectionPageRoutingModule } from './pick3-draw-date-info-section-routing.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        Pick3DrawDateInfoSectionPageRoutingModule
    ],
    exports: [
        Pick3DrawDateInfoSectionPage
    ],
    declarations: [
        Pick3DrawDateInfoSectionPage,
        CountdownTimerComponent
    ]
})
export class Pick3DrawDateInfoSectionPageModule {
}
