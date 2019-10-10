import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-info-interface',
  templateUrl: './info-interface.component.html',
  styleUrls: ['./info-interface.component.css']
})

export class InfoInterfaceComponent implements OnInit {
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
    this.router.navigate(['/generate']);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
