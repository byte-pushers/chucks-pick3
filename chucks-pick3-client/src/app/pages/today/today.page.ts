import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DrawingResult } from '../../model/DrawingResult.model';
import { DrawResultsComponent } from '../../components/draw-results/draw-results';

@IonicPage({
  segment: 'results'
})
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage {
  @ViewChild('drawResults') drawResult: DrawResultsComponent;
  public date: Date;

  constructor(public navCtrl: NavController) {
    this.date = new Date();
  }

  public itemSelected(result: DrawingResult):void {
    this.navCtrl.push('FutureSelectPage', result);
  }
}
