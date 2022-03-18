import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousPicksPageRoutingModule } from './previous-picks-routing.module';

import { PreviousPicksPage } from './previous-picks.page';
import { TranslateModule } from '@ngx-translate/core';
import { PreviousWinningNumberCardComponent } from '../../components/previous-winning-number-section/previous-winning-number-card.component';
import { PreviousPicksDateSectionComponent } from '../../components/previous-picks-date-section/previous-picks-date-section.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousPicksPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    PreviousPicksPage,
    PreviousPicksDateSectionComponent,
    PreviousWinningNumberCardComponent,
  ],
})
export class PreviousPicksPageModule {}
