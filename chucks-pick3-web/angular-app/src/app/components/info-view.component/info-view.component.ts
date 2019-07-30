import {Component, OnInit } from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.css']
})

export class InfoViewComponent implements OnInit {
  private isSubNavBarVisible = true;

  constructor(private subNavBarService: SubNavBarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // Capture the showSubNavBar if available
    // tslint:disable-next-line:max-line-length
    this.route.queryParamMap.pipe(map(params => params.get('showSubNavBar').toLowerCase() === 'true' ? true : false)).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    });
  }
}

