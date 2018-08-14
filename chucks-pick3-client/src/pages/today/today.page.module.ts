import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayPage } from './today.page';
import { PredictionPageModule } from "../prediction/prediction.page.module";
import { FutureSelectPageModule } from "../future-select/future-select.page.module";

@NgModule({
  declarations: [TodayPage],
  imports: [
    FutureSelectPageModule,
    PredictionPageModule,
    IonicPageModule.forChild(TodayPage)
  ],
  entryComponents: [TodayPage]
})
export class TodayPageModule { }
