import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePicksPageRoutingModule } from './generate-picks-routing.module';

import { GeneratePicksPage } from './generate-picks.page';
import {TranslateModule} from '@ngx-translate/core';
import {HomePageModule} from '../../home/home.module';
import {GenerateDrawTimeCardComponent} from '../generate-draw-time-card/generate-draw-time-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GeneratePicksPageRoutingModule,
        TranslateModule,
        HomePageModule
    ],
    declarations: [GeneratePicksPage, GenerateDrawTimeCardComponent]
})
export class GeneratePicksPageModule {}
