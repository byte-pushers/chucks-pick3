import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService,
              private route: ActivatedRoute) {
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
