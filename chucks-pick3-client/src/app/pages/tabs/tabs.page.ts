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

  public tab1Root: string = 'TodayPage';
  public tab2Root: string = 'HistoryPage';
  public tab3Root: string = 'ContactPage';
}
