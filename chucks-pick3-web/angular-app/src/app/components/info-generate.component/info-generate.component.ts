import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from "../../services/show-sub-nav-bar.service/sub-nav-bar.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-info-generate',
  templateUrl: './info-generate.component.html',
  styleUrls: ['./info-generate.component.css']
})

export class InfoGenerateComponent implements OnInit {
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
