import {Component, OnInit} from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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



