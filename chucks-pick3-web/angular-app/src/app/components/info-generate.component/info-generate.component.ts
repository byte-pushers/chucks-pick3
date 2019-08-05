import {Component, OnInit } from '@angular/core';
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
    document.getElementById('howTo').style.backgroundColor = '#d0d0d0';
    document.getElementById('howTo').style.color = 'gray';
    // Capture the showSubNavBar if available
    // tslint:disable-next-line:max-line-length
    this.route.queryParamMap.pipe(map(params => params.get('showSubNavBar').toLowerCase() === 'true' ? true : false)).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);

    });
  }

}

