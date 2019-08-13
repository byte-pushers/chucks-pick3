import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';
import {map} from "rxjs/operators";


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute) {
    console.info("Inside AppHeaderComponent constructor() method.");
  }

  ngOnInit() {
    console.info("Inside AppHeaderComponent ngOnInit() method.");

    this.route.queryParamMap.pipe(map(params => {
      if (params !== null && params !== undefined) {
        const showSubNavBarStatus = params.get('showSubNavBar');

        if (showSubNavBarStatus !== null && showSubNavBarStatus !== undefined) {
          return showSubNavBarStatus.toLowerCase() === 'true' ? true : false;
        }
      }

      return false;
    })).subscribe(subNavBarVisible => {
      console.info("Inside AppHeaderComponent route.queryParams.subscribe() method2.");
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    });
  }

  public isSubNavBarVisible(): boolean {
    return this.subNavBarService.getSubNavBarVisibility();
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.subNavBarService.setSubNavBarVisibility(showSubNavBarStatus);
  }

  /*Side Nav Bar Mobile*/
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

  public howToActive() {
    document.getElementById('howTo').style.backgroundColor = '#d0d0d0';
    document.getElementById('howTo').style.color = 'gray';
  }

  public howToHover() {
    document.getElementById('howTo').style.backgroundColor = 'green';
  }

}
