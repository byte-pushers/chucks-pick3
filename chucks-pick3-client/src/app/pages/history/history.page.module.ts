import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history.page';

@NgModule({
  declarations: [HistoryPage],
  imports: [
    IonicPageModule.forChild(HistoryPage)
  ]
})
export class HistoryPageModule { }
