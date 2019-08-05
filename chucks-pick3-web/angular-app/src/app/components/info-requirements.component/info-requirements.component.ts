import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-info-requirements',
  templateUrl: './info-requirements.component.html',
  styleUrls: ['./info-requirements.component.css']
})

export class InfoRequirementsComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(map(params => {
      if (params !== null && params !== undefined) {
        const showSubNavBarStatus = params.get('showSubNavBar');

        if (showSubNavBarStatus !== null && showSubNavBarStatus !== undefined) {
          return showSubNavBarStatus.toLowerCase() === 'true' ? true : false;
        }
      }

      return false;
    })).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    });
  }
}
