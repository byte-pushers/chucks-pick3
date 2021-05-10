import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Pick3DrawTimeInfoSectionPage } from './pick3-draw-time-info-section.page';
import { Pick3DrawTimeInfoSectionPageRoutingModule } from './pick3-draw-time-info-section-routing.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        Pick3DrawTimeInfoSectionPageRoutingModule
    ],
    exports: [
        Pick3DrawTimeInfoSectionPage
    ],
    declarations: [
        Pick3DrawTimeInfoSectionPage
    ]
})
export class Pick3DrawTimeInfoSectionPageModule {
    constructor() {
        console.log('Pick3DrawTimeInfoSectionPageModule');
    }
}
