import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from 'src/app/services/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {LogInValidationService} from '../../../services/log-in.service';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService,
              private route: ActivatedRoute,
              public logInService: LogInValidationService) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(map(params => {
      if (params !== null && params !== undefined) {
        // tslint:disable-next-line:no-shadowed-variable
        const fragment = params.get('fragment');
        console.log('fragment: ' + fragment);
      }
    }));

    const fragment = this.route.snapshot.paramMap.get('fragment');
    console.log('fragment: ' + fragment);
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

  gotoKeyFeatures() {
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
  }

/*  gotohowToTablet() {
    this.router.navigate(['/home']);

  }

  gotoDemoTablet() {
    this.router.navigate(['/', 'home']);
    document.getElementById('demoDesktop').scrollIntoView({
      behavior: 'smooth'
    });
  }*/

  gotoDemo() {
    document.getElementById('demo').scrollIntoView({
      behavior: 'smooth'
    });
    this.closeNav();
  }

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
