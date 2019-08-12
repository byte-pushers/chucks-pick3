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
  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
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
