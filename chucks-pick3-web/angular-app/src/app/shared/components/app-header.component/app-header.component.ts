import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from 'src/app/services/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {LogInValidationService} from '../../../services/log-in.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService,
              private route: ActivatedRoute,
              public logInService: LogInValidationService,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(es: string) {
    this.translate.use(es);
  }

  ngOnInit() {

    this.route.queryParamMap.pipe(map(params => {
      if (params !== null && params !== undefined) {
        const showSubNavBarStatus = params.get('showSubNavBar');

        if (showSubNavBarStatus !== null && showSubNavBarStatus !== undefined) {
          return showSubNavBarStatus.toLowerCase() === 'true' ? true : false;
        }
      }

      return false;
    })).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    });
  }

  public isSubNavBarVisible(): boolean {
    return this.subNavBarService.getSubNavBarVisibility();
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.subNavBarService.setSubNavBarVisibility(showSubNavBarStatus);
  }

  /*Side Nav Bar Mobile*/
  public openNav() {
    document.getElementById('side-nav-bar').style.width = '250px';
  }

  public closeNav() {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  onClickedOutside(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  handleScroll(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  public howToActive() {
    document.getElementById('howTo').style.backgroundColor = '#d0d0d0';
    document.getElementById('howTo').style.color = 'gray';
  }
  public changeToLogInButton() {
this.logInService.logOut();
  }


}
