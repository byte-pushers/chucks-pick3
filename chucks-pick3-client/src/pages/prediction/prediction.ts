import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PredictionProvider } from "../../providers/prediction/prediction";
import { Pick3PlaysRequest } from "../../providers/prediction/api/v1/Pick3PlaysRequest.model";

/**
 * Generated class for the PredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html'
})
export class PredictionPage {
  public item: any; // TODO: Type safety.
  public response: any; // TODO: Type safety.

  public requestFailed: boolean = false;
  public requestSuccess: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public predictSvc: PredictionProvider) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionPage');

    var req: Pick3PlaysRequest = this.item;

    this.predictSvc.getPredictions(req)
      .subscribe((val) => {
        this.requestSuccess = true;
        this.response = val;
      }, (err) => {
        this.requestFailed = true;
        this.response = err;
      });
  }

}
