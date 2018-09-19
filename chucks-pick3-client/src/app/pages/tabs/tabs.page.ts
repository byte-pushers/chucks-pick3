import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage({
  segment: 'tab',
})
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public date: Date;
  public maxDate: Date;

  public tab1Root: any = 'TodayPage';
  public tab2Root: any = 'HistoryPage';
  public tab3Root: any = 'ContactPage';
}
