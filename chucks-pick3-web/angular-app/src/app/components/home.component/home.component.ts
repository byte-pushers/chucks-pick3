import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})


export class HomeComponent implements OnInit {

  public viewField = false;
  public generateField = false;
  public writeField = false;

  constructor(config: NgbCarouselConfig) {
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.displayFeatureButtonDiv();
    document.getElementById('viewField').style.display = 'block';
    document.getElementById('generateField').style.display = 'none';
    document.getElementById('writeField').style.display = 'none';
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

  public displayFeatureDiv(input) {
    const featureFields = ['viewField', 'generateField', 'writeField'];
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

  public displayFeatureButtonDiv() {
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

}
