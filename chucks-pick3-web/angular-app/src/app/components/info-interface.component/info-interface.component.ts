import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-info-interface',
  templateUrl: './info-interface.component.html',
  styleUrls: ['./info-interface.component.css']
})

export class InfoInterfaceComponent implements OnInit {
  // private isSubNavBarVisible = true;
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
