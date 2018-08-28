import { NgModule } from '@angular/core';
import { IonicPage, IonicPageModule } from 'ionic-angular';
import { TimePopoverPage } from './time-popover.page';

@IonicPage()
@NgModule({
  declarations: [TimePopoverPage],
  imports: [
    IonicPageModule.forChild(TimePopoverPage)
  ],
  entryComponents: [TimePopoverPage]
})
export class TimePopoverPageModule { }
