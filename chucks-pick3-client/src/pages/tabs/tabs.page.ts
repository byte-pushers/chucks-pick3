import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = 'TodayPage';
  tab2Root:any = 'HistoryPage';
  tab3Root:any = 'ContactPage';

  constructor() {
  }
}
