import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';
import {Pick3DrawDateInfoSectionPageModule} from '../pick3-draw-date-info-section/pick3-draw-date-info-section.module';
import {Pick3DrawTimeInfoSectionPageModule} from '../pick3-draw-time-info-section/pick3-draw-time-info-section.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CardPageRoutingModule,
        Pick3DrawDateInfoSectionPageModule,
        Pick3DrawTimeInfoSectionPageModule
    ],
    exports: [
    ],
    declarations: [
        CardPage
    ]
})
export class CardPageModule {

}
