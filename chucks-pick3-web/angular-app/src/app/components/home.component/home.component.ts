import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// tslint:disable-next-line:component-class-suffix
export class HomeComponent implements OnInit {
  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute,
              private params: ActivatedRoute) {
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

/*  // TODO: before using params, check to make sure it is not null or undefined.
  // TODO: After calling params.get('showSubNavBar') set return value to variable and check to make sure it is not null or undefined.
  // TODO: HINT: You only can call toLowerCase() method on a string.*/
