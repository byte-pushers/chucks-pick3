import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { DrawingTime } from '../../providers/prediction/api/v1/DrawingTime.model';

@IonicPage({
  segment: 'results'
})
@Component({
  selector: 'page-home',
  templateUrl: 'today.html'
})
export class TodayPage {
  items: any[] = [];

  constructor(public navCtrl: NavController) {
    var date = new Date();
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: 355});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.DAY, winNumber: 987});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: 123});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.NIGHT, winNumber: 728});
  }

  public itemSelected(item:any):void {
    this.navCtrl.push('FutureSelectPage', {
      drawDate: this.dateToUrlDate(item.winDrawDate),
      drawTime: item.winDrawTime,
      drawResult: item.winNumber
    });
  }

  private dateToUrlDate(d: Date): string {
    return d.getFullYear() + "-" + (1 + d.getMonth()) + "-" + d.getDate();
  }

}
