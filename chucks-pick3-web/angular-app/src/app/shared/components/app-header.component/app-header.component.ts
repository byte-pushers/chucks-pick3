import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../../services/show-sub-nav-bar.service/sub-nav-bar.service';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {


  constructor(private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {
  }

  public isSubNavBarVisible(): boolean {
    return this.subNavBarService.getSubNavBarVisibility();
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.subNavBarService.setSubNavBarVisibility(showSubNavBarStatus);
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

  handleScroll(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }
}
