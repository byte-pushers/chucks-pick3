import {Component, OnInit} from '@angular/core';
import {LogInValidationService} from '../../../services/log-in.service';
import {AppService} from '../../../app.service';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor(private appService: AppService,
              public logInService: LogInValidationService) {
  }

  ngOnInit() {

  }

  public saveFragment(fragment: string): void {
    this.appService.saveFragment(fragment);
  }

  /*Side Nav Bar Mobile*/
  public backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public closeNav() {
    const mobileNav = document.getElementById('topnav');
    document.getElementById('side-nav-bar').style.height = '0';
    mobileNav.classList.remove('expanded');
  }

  onClickedOutside(e: Event) {
    document.getElementById('side-nav-bar').style.height = '0';
  }

  handleScroll(e: Event) {
    document.getElementById('side-nav-bar').style.height = '0';
  }

  public changeToLogInButton() {
    this.logInService.logOut();
  }

  public showY() {
    console.log(window.scrollY);
  }

/*  gotoKeyFeatures() {
    document.getElementById('keyFeatures').scrollIntoView({
      behavior: 'smooth'
    });
    this.closeNav();
  }

  gotohowTo() {
    document.getElementById('howTo').scrollIntoView({
      behavior: 'smooth'
    });
    this.closeNav();
  }*/

/*  gotohowToTablet() {
    this.router.navigate(['/home']);

  }

  gotoDemoTablet() {
    this.router.navigate(['/', 'home']);
    document.getElementById('demoDesktop').scrollIntoView({
      behavior: 'smooth'
    });
  }*/

 /* gotoDemo() {
    document.getElementById('demo').scrollIntoView({
      behavior: 'smooth'
    });
    this.closeNav();
  }*/

  private openCloseMobileNav() {
    const windowCheck = window.innerWidth;
    if (windowCheck <= 480) {
      const mobileNav = document.getElementById('topnav');

      if (mobileNav.classList.contains('expanded')) {
        mobileNav.classList.remove('expanded');
        document.getElementById('side-nav-bar').style.height = '0';
      } else {
        mobileNav.classList.add('expanded');
        document.getElementById('side-nav-bar').style.height = '100%';
      }
    }
  }
}
