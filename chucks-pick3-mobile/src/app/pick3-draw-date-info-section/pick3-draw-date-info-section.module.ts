import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {Pick3DrawDateInfoSection} from "./pick3-draw-date-info-section";
import {Pick3DrawDateCardComponent} from "../components/pick3-draw-date-card/pick3-draw-date-card.component";


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
    ],
    declarations: [
        Pick3DrawDateInfoSection,
        Pick3DrawDateCardComponent
    ]
})
export class HomePageModule {
    slideIndex;

}
