import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// tslint:disable-next-line:component-class-suffix
export class HomeComponent implements OnInit {
  public showSubNavBarStatus = false;
  constructor() {
  }

  ngOnInit() {

  }
  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.showSubNavBarStatus = showSubNavBarStatus;
  }
}
