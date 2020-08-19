import {Component, OnInit} from '@angular/core';
import {LogInValidationService} from '../../../services/log-in.service';
import {TranslateService} from '@ngx-translate/core';
import {BrowserLocaleService} from '../../../services/browser-locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-app';
  public showSplashPage = true;

  constructor(public logInService: LogInValidationService,
              private translate: TranslateService,
              public browserLocaleService: BrowserLocaleService) {
    this.useBrowserLanguage();
  }


  public useBrowserLanguage() {
    const language = this.browserLocaleService.getLanguage();
    const defaultLanguage = 'en';
    if (language !== null && language !== undefined) {
      this.browserLocaleService.switchLanguage(language);
    } else {
      this.browserLocaleService.switchLanguage(defaultLanguage);
    }
  }


  public showSplashView(showStatus: boolean): void {
    this.showSplashPage = showStatus;
  }
}
