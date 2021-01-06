import {Component, OnInit} from '@angular/core';
import * as Object from 'bytepushers-js-obj-extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  public showSplashPage = true;
  ngOnInit() {
    screen.orientation.lock('portrait');
  }
  public showSplashView(showStatus: boolean): void {
    this.showSplashPage = showStatus;
  }
}
