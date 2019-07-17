import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  public showSplashPage = true;

  public showSplashView(showStatus: boolean): void {
    this.showSplashPage = showStatus;
  }
}
