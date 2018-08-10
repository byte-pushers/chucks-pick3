import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PredictionProvider } from "../../providers/prediction/prediction";

/**
 * Generated class for the PredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {

  constructor(public navCtrl: NavController, public predictSvc: PredictionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionPage');
  }

}
