import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  public showSubNavBarStatus = false;

  constructor() {
  }
  ngOnInit() {
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.showSubNavBarStatus = showSubNavBarStatus;
  }
  onClickedOutside(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }
  public openNav() {
    document.getElementById('side-nav-bar').style.width = '250px';
  }

  public closeNav() {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  onClickedOutside(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }
}
