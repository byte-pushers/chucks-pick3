import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    if (this.route.params === null || this.route.params === undefined)  {
      stop();
    } else if (this.route.snapshot.queryParamMap.get('showSubNavBar') === null ||
      this.route.snapshot.queryParamMap.get('showSubNavBar') === undefined) {
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
