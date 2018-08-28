import {IonicPage, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@IonicPage()
@Component({
  templateUrl: 'time-popover.html'
})
export class TimePopoverPage {
  constructor(public viewCtrl: ViewController) {

  }

  select(time: string) {
    this.viewCtrl.dismiss(time);
  }
}
