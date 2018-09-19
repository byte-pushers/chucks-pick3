import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, DateTime} from 'ionic-angular';
import {DrawResultsComponent} from '../../components/draw-results/draw-results';
import {DrawingResult} from '../../model/DrawingResult.model';

@IonicPage({
  segment: 'show',
})
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  @ViewChild('datePicker') public datePicker: DateTime;
  @ViewChild('drawResults') public drawResults: DrawResultsComponent;
  public selectedDate: string;
  public date: Date;

  public maxDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewWillEnter(): void {
    if (this.date === null || this.date === undefined) {
      this.showPicker();
    }
  }

  public ionViewDidEnter(): void {
    // this.showPicker();
  }

  public showPicker(): void {
    this.maxDate = new Date().toISOString();
    this.datePicker.max = this.maxDate;
    this.datePicker.open();
  }

  public fireScrape(dateString: string): void {
    this.date = this.parseDate(dateString);
    this.date.setHours(0, 0, 0, 0);
  }

  public itemSelected(result: DrawingResult): void {
    this.navCtrl.push('FutureSelectPage', result);
  }

  private parseDate(d: string): Date {
    let parts: any = d.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }
}
