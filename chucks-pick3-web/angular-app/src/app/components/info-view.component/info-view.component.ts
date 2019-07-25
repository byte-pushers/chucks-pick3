import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';




@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.css']
})

export class InfoViewComponent implements OnInit {
  private isSubNavBarVisible = true;
  constructor(
    private subNavBarService: SubNavBarService
    ) {
  }

  ngOnInit() {
/*const navBarVisibility = this.subNavBarVisible;
    const IsSubNavBarVisible = navBarVisibility.getSubNavBarVisibility();
      if (subNavBarVisible === false) {
        subNavBarVisible.setSubNavBarVisibility(true);
      }
    return subNavBarVisible;*/
    const subNavBarVisible = this.isSubNavBarVisible;
    return this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    // TODO: set up variable that will stand for parameter being inserted into thing
    // TODO: if subNavBarVisible is defined and not null and true show subnav
    // TODO: otherwise hide navigation
  }
}

