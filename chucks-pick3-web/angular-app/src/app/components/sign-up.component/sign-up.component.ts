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

  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    document.getElementById('howTo').style.backgroundColor = '#fff';
    document.getElementById('howTo').style.color = '#212529';

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



