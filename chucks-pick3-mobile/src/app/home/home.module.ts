import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Pick3DrawDateCardComponent } from '../components/pick3-draw-date-card/pick3-draw-date-card.component';
import { Pick3DrawTimeCardComponent } from '../components/pick3-draw-time-card/pick3-draw-time-card.component';
import { CountdownTimerComponent } from '../components/countdown-timer/countdown-timer.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardPageModule } from "../card/card.module";
import {CardPage} from "../card/card.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        TranslateModule,
        CardPageModule
    ],
    exports: [
        Pick3DrawDateCardComponent,
        CountdownTimerComponent,
        CardPage
    ],
    declarations: [
        HomePage,
        Pick3DrawDateCardComponent,
        Pick3DrawTimeCardComponent,
        CountdownTimerComponent,
        CardPage
    ]
})
export class HomePageModule {}
