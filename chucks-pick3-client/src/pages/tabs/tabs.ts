import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { ContactPage } from '../contact/contact';
import { TodayPage } from '../today/today';

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
