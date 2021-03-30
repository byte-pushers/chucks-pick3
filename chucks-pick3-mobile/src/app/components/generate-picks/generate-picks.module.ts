import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePicksPageRoutingModule } from './generate-picks-routing.module';

import { GeneratePicksPage } from './generate-picks.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GeneratePicksPageRoutingModule,
        TranslateModule
    ],
  declarations: [GeneratePicksPage]
})
export class GeneratePicksPageModule {}
