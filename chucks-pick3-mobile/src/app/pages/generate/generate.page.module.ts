import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneratePageRoutingModule } from './generate.page.routing.module';
import { GeneratePage } from './generate.page';
import { TranslateModule } from '@ngx-translate/core';
import { GenerateNextNumbersCardComponent } from '../../components/generate-next-numbers-section/generate-next-numbers-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GeneratePageRoutingModule, TranslateModule],
  declarations: [GeneratePage, GenerateNextNumbersCardComponent],
})
export class GeneratePageModule {
  constructor() {}
}
