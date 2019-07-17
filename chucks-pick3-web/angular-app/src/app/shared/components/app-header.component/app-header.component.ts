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
}
