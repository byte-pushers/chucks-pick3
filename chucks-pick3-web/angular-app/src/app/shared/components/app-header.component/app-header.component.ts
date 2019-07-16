import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  public showSubNav() {
    const nav = document.getElementById('showNav');
    if (nav.style.display === 'none') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'block';
    }
  }
  public hideSubNav() {
    const nav = document.getElementById('showNav');
    if (nav.style.display === 'block') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'none';
    }
  }
}
