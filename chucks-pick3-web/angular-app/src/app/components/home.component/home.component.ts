import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(es: string) {
    this.translate.use(es);
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
    const summaryActive = document.getElementById('summary');
    summaryActive.classList.remove('active');
    summaryActive.classList.add('allow-hover');

  }


}

