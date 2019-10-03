import {Component, OnInit} from '@angular/core';
import {LogInValidationService} from '../../../services/log-in.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public logInService: LogInValidationService,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  title = 'angular-app';
  public showSplashPage = true;

  switchLanguage(es: string) {
    this.translate.use(es);
  }

  public showSplashView(showStatus: boolean): void {
    this.showSplashPage = showStatus;
  }
}
