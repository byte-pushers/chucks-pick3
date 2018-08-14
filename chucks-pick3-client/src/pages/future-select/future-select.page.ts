import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'future-select.html',
})
export class FutureSelectPage {
  public item: any; // TODO: type-safety.

  private minDate: string;
  private maxDate: string;

  public selectedDate: string;
  public selectedDrawTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');

    // Set min and max date to ensure user can only select from dates in the future.
    var today = new Date();
    this.minDate = today.toISOString();
    today.setFullYear(today.getFullYear() + 100, 12, 31);
    this.maxDate = today.toISOString();
  }

  submit(): void {
    this.item['futureDrawDate'] = this.adjustForTimezone(this.selectedDate);
    this.item['futureDrawTime'] = this.selectedDrawTime;
    this.navCtrl.push('PredictionPage', {
      item: this.item
    });
  }

  private adjustForTimezone(d: string): Date {
    var date: Date = new Date(d);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
