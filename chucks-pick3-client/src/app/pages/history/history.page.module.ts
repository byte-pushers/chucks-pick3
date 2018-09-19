import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HistoryPage),
  ],
  entryComponents: [HistoryPage],
})
export class HistoryPageModule { }
