import {Component, ViewChild} from '@angular/core';
import {IonicPage} from "ionic-angular";

@IonicPage({
  segment: 'tab'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  date: Date;
  maxDate: Date;

  tab1Root:any = 'TodayPage';
  tab2Root:any = 'HistoryPage';
  tab3Root:any = 'ContactPage';

  constructor() {

  }
}
