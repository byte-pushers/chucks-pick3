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
  constructor( private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {

const subNavBarVisible = this.isSubNavBarVisible;
return this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    // TODO: if subNavBarVisible is defined and not null and true show subnav
    // TODO: otherwise hide navigation
  }
}

