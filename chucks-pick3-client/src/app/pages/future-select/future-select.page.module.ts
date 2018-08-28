import { NgModule } from '@angular/core';
import { IonicPage, IonicPageModule } from 'ionic-angular';
import { FutureSelectPage } from './future-select.page';
import { TimePopoverPageModule } from "./time-popover.page.module";

@IonicPage()
@NgModule({
  declarations: [FutureSelectPage],
  imports: [
    TimePopoverPageModule,
    IonicPageModule.forChild(FutureSelectPage)
  ]
})
export class FutureSelectPageModule { }
