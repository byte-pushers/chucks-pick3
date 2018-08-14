import { Component } from '@angular/core';

import { HistoryPage } from '../history/history.page';
import { ContactPage } from '../contact/contact.page';
import { TodayPage } from '../today/today.page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TodayPage;
  tab2Root = HistoryPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
