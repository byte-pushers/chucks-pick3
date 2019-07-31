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

    if (this.route.snapshot.queryParamMap.get('showSubNavBar') === null || undefined) {
      stop();


    } else {
      this.route.queryParamMap.pipe(map(params => {
        return params.get('showSubNavBar').toLowerCase() === 'true' ? true : false;

      })).subscribe(subNavBarVisible => {
        this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
      });
    }
  }
}
