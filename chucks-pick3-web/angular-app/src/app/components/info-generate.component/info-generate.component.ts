import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-info-generate',
  templateUrl: './info-generate.component.html',
  styleUrls: ['./info-generate.component.css']
})

export class InfoGenerateComponent implements OnInit {
  constructor(public router: Router,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
  switchLanguage(es: string) {
    this.translate.use(es);
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
  }
  public goToMobileInterface() {
    this.router.navigate(['/view']);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
