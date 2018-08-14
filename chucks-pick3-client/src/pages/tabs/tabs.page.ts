import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";

import { HistoryPage } from '../history/history.page';
import { ContactPage } from '../contact/contact.page';
import { TodayPage } from '../today/today.page';

@IonicPage()
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
