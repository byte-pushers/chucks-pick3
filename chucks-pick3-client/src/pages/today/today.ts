import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { DetailPage } from '../future-select/future-select';
import { DrawingTime } from '../../providers/prediction/api/v1/DrawingTime.model';

@Component({
  selector: 'page-home',
  templateUrl: 'today.html'
})
export class TodayPage {
  items: any[] = [];

  constructor(public navCtrl: NavController, public modalControl: ModalController) {
    var date = new Date();
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: 355});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.DAY, winNumber: 987});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.MORNING, winNumber: 123});
    this.items.push({winDrawDate: date, winDrawTime: DrawingTime.NIGHT, winNumber: 728});
  }

  public itemSelected(item:any):void {
    this.navCtrl.push(DetailPage, {
      item: item // TODO: Type-safety
    });
  }

}
