import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';
import { Pick3DrawTimeInfoSectionComponent } from '../../components/pick3-draw-time-info-section/pick3-draw-time-info-section.component';
import { I18nService } from '../../services/i18n.service';
import { CountdownTimerComponent } from '../../components/countdown-timer/countdown-timer.component';
import { Pick3DrawTimeCardComponent } from '../../components/pick3-draw-time-section/pick3-draw-time-card.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ViewPicksCardComponent } from '../../components/view-picks-card/view-picks-card.component';
import { FormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [I18nService],
  exports: [CardPage],
  declarations: [CardPage, Pick3DrawTimeCardComponent, Pick3DrawTimeInfoSectionComponent],
})
export class CardPageModule {
  constructor() {}
}
