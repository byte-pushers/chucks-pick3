import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '../../app.service';
import {Subscription} from 'rxjs';
import * as Object from 'bytepushers-js-obj-extensions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})


export class HomeComponent implements OnInit, OnDestroy {
  public fragmentSubscription: Subscription;
  public viewField = false;
  public selectField = false;
  public generateField = false;
  public writeField = false;

  constructor(private config: NgbCarouselConfig, private appService: AppService) {
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.fragmentSubscription = this.appService.fragment().subscribe(fragment => {
    /*  console.log('fragment: ' + fragment);*/
      if (Object.isDefinedAndNotNull(fragment)) {
        // TODO: add scroll into view logic for fragment.
        const targetElement =  document.getElementById(fragment);
       /* console.log('targetElement: ' + targetElement);*/
        if (Object.isDefinedAndNotNull(targetElement)) {
       /*   console.log('targetElement: ' + targetElement + ' found');*/
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
    this.displayFeatureButtonDesktop();
    this.displayFeatureButtonTablet();
    document.getElementById('viewField').style.display = 'block';
    document.getElementById('selectField').style.display = 'none';
    document.getElementById('generateField').style.display = 'none';
    document.getElementById('writeField').style.display = 'none';

    document.getElementById('viewFieldTablet').style.display = 'block';
    document.getElementById('selectFieldTablet').style.display = 'none';
    document.getElementById('generateFieldTablet').style.display = 'none';
    document.getElementById('writeFieldTablet').style.display = 'none';
  }

  ngOnDestroy() {
    this.fragmentSubscription = null;
  }

  public isMobileResolution(): boolean {
    let isMobileResolution: boolean = false;

    if (window.innerWidth < 768) {
      isMobileResolution = true;
    } else {
      isMobileResolution = false;
    }

    return isMobileResolution;
  }

  public isDesktopResolution(): boolean {
    let isDesktopResolution: boolean = false;

    if (window.innerWidth > 768) {
      isDesktopResolution = true;
    } else {
      isDesktopResolution = false;
    }

    return isDesktopResolution;
  }

  public displayFeatureDivDesktop(input) {
    // tslint:disable-next-line:max-line-length
    const featureFields = ['viewField', 'selectField', 'generateField', 'writeField'];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < featureFields.length; i++) {
      if (featureFields[i].lastIndexOf(input) === 0) {
        document.getElementById(featureFields[i]).style.display = 'block';
        featureFields.splice(i, 1);
        this.removeFeatureDiv(featureFields);
      }
    }
  }

  public displayFeatureDivTablet(input) {
    // tslint:disable-next-line:max-line-length
    const featureFields = [ 'viewFieldTablet',
      'selectFieldTablet', 'generateFieldTablet', 'writeFieldTablet'];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < featureFields.length; i++) {
      if (featureFields[i].lastIndexOf(input) === 0) {
        document.getElementById(featureFields[i]).style.display = 'block';
        featureFields.splice(i, 1);
        this.removeFeatureDiv(featureFields);
      }
    }
  }

  public removeFeatureDiv(featureFields) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < featureFields.length; i++) {
      document.getElementById(featureFields[i]).style.display = 'none';
    }
  }

  public displayFeatureButtonDesktop() {
    const header = document.getElementById('featureButtonSection');
    const btns = header.getElementsByClassName('how-to-title');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        const current = document.getElementsByClassName('activeHowTo');
        current[0].className = current[0].className.replace(' activeHowTo', '');
        this.className += ' activeHowTo';
      });
  }
  }

  public displayFeatureButtonTablet() {
    const header = document.getElementById('featureButtonSectionTablet');
    const btns = header.getElementsByClassName('how-to-title-tablet');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        const current = document.getElementsByClassName('activeHowTo-tablet');
        current[0].className = current[0].className.replace(' activeHowTo-tablet', '');
        this.className += ' activeHowTo-tablet';
      });
    }
  }

}
