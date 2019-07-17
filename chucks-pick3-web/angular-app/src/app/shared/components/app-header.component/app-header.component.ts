import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor() {
  }
  public showNav = false;

  ngOnInit() {
  }

  public showSubNav(showStatus: boolean): void {
    this.showNav = showStatus;
  }

  public openNav() {
    document.getElementById('side-nav-bar').style.width = '250px';
  }

  public closeNav() {
    document.getElementById('side-nav-bar').style.width = '0';
  }
}
