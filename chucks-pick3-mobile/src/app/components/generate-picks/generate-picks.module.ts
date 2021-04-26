import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePicksPageRoutingModule } from './generate-picks-routing.module';

import { GeneratePicksPage } from './generate-picks.page';
import {TranslateModule} from '@ngx-translate/core';
import {HomePageModule} from '../../home/home.module';
import {GenerateDrawTimeCardComponent} from '../generate-draw-time-card/generate-draw-time-card.component';
import {DateTranslatePipe} from '../../pipes/date-translate.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GeneratePicksPageRoutingModule,
        TranslateModule,
        HomePageModule
    ],
    declarations: [GeneratePicksPage, GenerateDrawTimeCardComponent, DateTranslatePipe]
})
export class GeneratePicksPageModule {}
