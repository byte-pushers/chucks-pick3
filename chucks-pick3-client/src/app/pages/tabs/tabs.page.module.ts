import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage} from './tabs.page';
import { TodayPageModule } from '../today/today.page.module';
import { HistoryPageModule } from '../history/history.page.module';
import { ContactPageModule } from '../contact/contact.page.module';

@NgModule({
  declarations: [TabsPage],
  imports: [
    TodayPageModule,
    HistoryPageModule,
    ContactPageModule,
    IonicPageModule.forChild(TabsPage)
  ],
  entryComponents: [TabsPage]
})
export class TabsPageModule { }
