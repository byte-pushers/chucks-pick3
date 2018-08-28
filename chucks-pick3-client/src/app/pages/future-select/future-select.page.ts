import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DrawingTime } from "../../providers/prediction/api/v1/DrawingTime.model";

@IonicPage({
  segment: 'predictFor/:drawDate/:drawTime/:drawResult'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'future-select.html',
})
export class FutureSelectPage {

  private minDate: string;
  private maxDate: string;

  public selectedDate: string;
  public selectedDrawTime: string;

  readonly drawDate: Date;
  readonly drawTime: DrawingTime;
  readonly drawResult: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController) {
    this.drawDate = new Date(navParams.get('drawDate'));
    this.drawTime = navParams.get('drawTime');
    this.drawResult = navParams.get('drawResult');

    // Set min and max date to ensure user can only select from dates in the future.
    var today = new Date();
    this.minDate = today.toISOString();
    today.setFullYear(today.getFullYear() + 100, 12, 31);
    this.maxDate = today.toISOString();
  }

  submit(): void {
    this.navCtrl.push('PredictionPage', {
      futureDrawDate: this.adjustForTimezone(this.selectedDate),
      futureDrawTime: this.selectedDrawTime,
      winDrawDate: this.dateToUrlDate(this.drawDate),
      winDrawTime: this.drawTime,
      winNumber: this.drawResult
    });
  }

  public onDidDismiss(val: string) {
    this.selectedDrawTime = val;
  }

  public presentTimeSelectedPopover(clickEvent) {
    let popover = this.popoverCtrl.create('TimePopoverPage');
    popover.present({
      ev: clickEvent
    })
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + "-" + (1 + d.getMonth()) + "-" + d.getDate();
  }

  private adjustForTimezone(d: string): string {
    var date: Date = new Date(d);
    return date.getUTCFullYear() + "-" + (1 + date.getUTCMonth()) + "-" + date.getUTCDate();
  }
}
