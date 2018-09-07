import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PredictionProvider } from "../../providers/prediction/prediction.service";
import { Pick3PlaysRequest } from "../../providers/prediction/api/v1/Pick3PlaysRequest.model";
import { DrawingTime } from "../../providers/prediction/api/v1/DrawingTime.model";

/**
 * Generated class for the PredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  segment: 'numbers/:winDrawDate/:winDrawTime/:winNumber/:futureDrawDate/:futureDrawTime'
})
@Component({
  selector: 'prediction-page',
  templateUrl: 'prediction.html'
})
export class PredictionPage {
  public item: any; // TODO: Type safety.
  public response: any; // TODO: Type safety.

  public requestFailed: boolean = false;
  public requestSuccess: boolean = false;

  readonly winDrawTime: DrawingTime;
  readonly winDrawDate: Date;
  readonly winNumber: number;
  readonly futureDrawTime: DrawingTime;
  readonly futureDrawDate: Date;

  constructor(public navCtrl: NavController, public toast: ToastController, public navParams: NavParams,
              public predictSvc: PredictionProvider) {
    this.winDrawTime = navParams.get('winDrawTime');
    this.winDrawDate = new Date(navParams.get('winDrawDate'));
    this.winNumber = navParams.get('winNumber');
    this.futureDrawDate = new Date(navParams.get('futureDrawDate'));
    this.futureDrawTime = navParams.get('futureDrawTime');
  }

  ionViewDidLoad() {
    var req: Pick3PlaysRequest =  {
      winNumber: this.winNumber,
      futureDrawTime: this.futureDrawTime,
      futureDrawDate: this.futureDrawDate,
      winDrawDate: this.winDrawDate,
      winDrawTime: this.winDrawTime
    }

    this.predictSvc.getPredictions(req)
      .subscribe((val) => {
        this.requestSuccess = true;
        this.response = val;
      }, (err) => {
        this.requestFailed = true;
        this.response = err;
        let t = this.toast.create({
          message: 'Could not get predictions because ' + err.toString(),
          duration: 3000,
          position: 'bot'
         });
        t.present();
      });
  }

  public timeIcon(time: DrawingTime) {
    switch(time) {
      case DrawingTime.MORNING:
        return 'ios-partly-sunny';
      case DrawingTime.DAY:
        return 'md-sunny';
      case DrawingTime.EVENING:
        return 'ios-cloudy-night';
      case DrawingTime.NIGHT:
        return 'moon';
      default:
        return 'time';
    }
  }

}
