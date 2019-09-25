import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
  }

  public backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
