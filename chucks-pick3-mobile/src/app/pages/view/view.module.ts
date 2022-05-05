import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { TranslateModule } from '@ngx-translate/core';
import { ViewPicksCardComponent } from '../../components/view-picks-card/view-picks-card.component';
import { Pick3ViewDateSectionComponent } from '../../components/pick3-view-date-section/pick3-view-date-section.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ViewPageRoutingModule, TranslateModule],
  declarations: [ViewPage, ViewPicksCardComponent, Pick3ViewDateSectionComponent],
})
export class ViewPageModule {}
