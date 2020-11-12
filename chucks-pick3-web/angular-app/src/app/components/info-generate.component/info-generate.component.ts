import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-info-generate',
  templateUrl: './info-generate.component.html',
  styleUrls: ['./info-generate.component.css']
})

export class InfoGenerateComponent implements OnInit {
  constructor(public router: Router) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
  }
  public goToMobileInterface() {
    this.router.navigate(['/view']);
    this.topFunction();
  }

  public topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
}
