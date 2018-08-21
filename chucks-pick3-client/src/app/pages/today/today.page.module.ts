import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayPage } from './today.page';

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    TodayPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TodayPage)
  ],
  entryComponents: [TodayPage]
})
export class TodayPageModule { }
