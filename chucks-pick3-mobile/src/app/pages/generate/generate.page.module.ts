import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GeneratePageRoutingModule} from './generate.page.routing.module';

import {GeneratePage} from './generate.page';
import {TranslateModule} from '@ngx-translate/core';
import {PreviousWinningNumberCardComponent} from '../../components/previous-winning-number-card/previous-winning-number-card.component';
import {GenerateNextNumbersCardComponent} from '../../components/generate-next-numbers-card/generate-next-numbers-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GeneratePageRoutingModule,
        TranslateModule
    ],
    declarations: [
        GeneratePage,
        PreviousWinningNumberCardComponent,
        GenerateNextNumbersCardComponent
    ]
})
export class GeneratePageModule {
    constructor() {
    }
}
