import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import {TranslateModule} from '@ngx-translate/core';
import {ViewPicksCardComponent} from '../../components/view-picks-card/view-picks-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewPageRoutingModule,
        TranslateModule
    ],
  declarations: [ViewPage,
  ViewPicksCardComponent]
})
export class ViewPageModule {}
