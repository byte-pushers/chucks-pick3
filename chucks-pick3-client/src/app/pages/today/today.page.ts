import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { DrawingResult } from '../../model/DrawingResult.model';
import { DrawResultsComponent } from '../../components/draw-results/draw-results';
import {DateUtil} from '../../model/DateUtil';

@IonicPage({
  segment: 'results/:todayDate',
})
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {
  @ViewChild('drawResults')
  public drawResult: DrawResultsComponent;
  public date: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = DateUtil.stringToDate(navParams.get('todayDate'));
  }

  public itemSelected(result: DrawingResult): void {
    this.navCtrl.push('FutureSelectPage', result);
  }
}
