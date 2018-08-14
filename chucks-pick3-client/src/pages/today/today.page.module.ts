import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayPage} from './today.page';

@NgModule({
  declarations: [TodayPage],
  imports: [
    IonicPageModule.forChild(TodayPage)
  ]
})
export class TodayPageModule { }
