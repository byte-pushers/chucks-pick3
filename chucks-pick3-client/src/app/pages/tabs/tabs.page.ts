import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {DateUtil} from '../../model/DateUtil';

@IonicPage({
  segment: 'tab',
})
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public tab1Root: string = 'TodayPage';
  public tab2Root: string = 'HistoryPage';
  public tab3Root: string = 'ContactPage';

  private todayData: any;

  constructor(navParams: NavParams) {
    this.todayData = navParams.data
    if(this.todayData['todayDate'] === undefined) {
      this.todayData['todayDate'] = DateUtil.dateToString(new Date());
    }
  }
}
