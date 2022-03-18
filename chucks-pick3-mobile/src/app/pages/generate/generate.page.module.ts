import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePageRoutingModule } from './generate.page.routing.module';

import { GeneratePage } from './generate.page';
import { TranslateModule } from '@ngx-translate/core';
import { PreviousWinningNumberCardComponent } from '../../components/previous-winning-number-section/previous-winning-number-card.component';
import { GenerateNextNumbersCardComponent } from '../../components/generate-next-numbers-section/generate-next-numbers-card.component';
import { Pick3GenerateDateSectionComponent } from '../../components/pick3-generate-date-section/pick3-generate-date-section.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratePageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    GeneratePage,
    GenerateNextNumbersCardComponent,
    Pick3GenerateDateSectionComponent,
  ],
})
export class GeneratePageModule {
  constructor() {}
}
