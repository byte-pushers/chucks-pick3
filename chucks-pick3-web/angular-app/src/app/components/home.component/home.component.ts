import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
    const summaryActive = document.getElementById('summary');
    summaryActive.classList.remove('active');
    summaryActive.classList.add('allow-hover');
  }
  public backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
