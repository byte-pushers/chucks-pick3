import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, DateTime} from 'ionic-angular';
import {DrawResultsComponent} from "../../components/draw-results/draw-results";
import {DrawingResult} from "../../model/DrawingResult.model";

@IonicPage({
  segment: 'show'
})
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  @ViewChild("drawResults") drawResults: DrawResultsComponent;

  public date: Date

  public maxDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.date = new Date(navParams.get('date'))
  }

  public ionViewWillEnter() {
    if (this.date == null) {
      this.showPicker();
    }
  }

  public ionViewDidEnter() {
    //this.showPicker();
  }

  @ViewChild('datePicker') datePicker: DateTime;
  public showPicker() {
    this.maxDate = new Date().toISOString();
    this.datePicker.max = this.maxDate;
    this.datePicker.open();
  }

  public fireScrape(event) {
    this.date = this.adjustForTimezone(event);
  }

  public itemSelected(result: DrawingResult):void {
    this.navCtrl.push('FutureSelectPage', result);
  }

  private adjustForTimezone(d: string): Date {
    var date: Date = new Date(d);
    return new Date(date.getUTCFullYear() + "-" + (1 + date.getUTCMonth()) + "-" + date.getUTCDate());
  }
}
