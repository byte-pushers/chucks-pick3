import {Component, ViewChild} from '@angular/core';
import {ActionSheet, ActionSheetController, DateTime, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DrawingTime} from '../../providers/prediction/api/v1/DrawingTime.model';
import {TitleCasePipe} from '@angular/common';

@IonicPage({
  segment: 'predictFor/:drawDate/:drawTime/:drawResult',
})
@Component({
  selector: 'page-future-select',
  templateUrl: 'future-select.html',
})
export class FutureSelectPage {
  private minDate: string;
  private maxDate: string;

  public selectedDate: string;
  public selectedDrawTime: DrawingTime;

  public readonly drawDate: Date;
  public readonly drawTime: DrawingTime;
  public readonly drawResult: number;

  @ViewChild('datePicker') public datePicker: DateTime;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionCtrl: ActionSheetController,
              public titlecase: TitleCasePipe) {
    this.drawDate = new Date(navParams.get('drawDate'));
    this.drawTime = navParams.get('drawTime');
    this.drawResult = navParams.get('drawResult');

    this.drawDate.setHours(0, 0, 0, 0);

    // Set min and max date to ensure user can only select from dates up to 100 years in the future.
    let today: Date = new Date();
    today.setFullYear(today.getFullYear() + 100, 12, 31);
    this.maxDate = today.toISOString();
  }

  public submit(): void {
    this.navCtrl.push('PredictionPage', {
      futureDrawDate: this.adjustForTimezone(this.selectedDate),
      futureDrawTime: this.selectedDrawTime,
      winDrawDate: this.dateToUrlDate(this.drawDate),
      winDrawTime: this.drawTime,
      winNumber: this.drawResult,
    });
  }

  public timeIcon(time: DrawingTime): string {
    switch (time) {
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
  public showPicker(): void {
    this.minDate = new Date().toISOString();
    this.datePicker.min = this.minDate;
    this.datePicker.open();
  }

  public showTimePicker(): void {
    const buttons: any[] = [DrawingTime.MORNING, DrawingTime.DAY, DrawingTime.EVENING, DrawingTime.NIGHT].map((time) => {
      return {
        icon: this.timeIcon(time),
        text: this.titlecase.transform(time.toString()),
        handler: () => {
          this.selectedDrawTime = time;
        },
      };
    });

    let actionSheet: ActionSheet = this.actionCtrl.create({
      title: 'Select time of drawing',
      buttons: buttons,
    });
    actionSheet.present();
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + '-' + (1 + d.getMonth()) + '-' + d.getDate();
  }

  private adjustForTimezone(d: string): string {
    const date: Date = new Date(d);
    return date.getUTCFullYear() + '-' + (1 + date.getUTCMonth()) + '-' + date.getUTCDate();
  }
}
