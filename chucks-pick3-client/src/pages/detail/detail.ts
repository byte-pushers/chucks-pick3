import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PredictionPage } from "../prediction/prediction";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public item: any;
  private minDate: string;
  private maxDate: string;
  public selectedDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');

    var today = new Date();
    this.minDate = today.toISOString();
    today.setFullYear(today.getFullYear() + 100, 12, 31);
    this.maxDate = today.toISOString();
  }

  submit(): void {
    this.item.futureDrawDate = this.selectedDate;
    this.navCtrl.push(PredictionPage, {
      item: this.item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    console.log(this.minDate, this.maxDate);
  }

}
