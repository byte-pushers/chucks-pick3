import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {Pick3DrawDateInfoSectionPage} from './pick3-draw-date-info-section-page';
import {Pick3DrawDateCardComponent} from '../components/pick3-draw-date-card/pick3-draw-date-card.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
    ],
    exports: [
    ],
    declarations: [
        Pick3DrawDateInfoSectionPage,
        Pick3DrawDateCardComponent
    ]
})
export class HomePageModule {
    slideIndex;

}
