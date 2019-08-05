import {Component, OnInit } from '@angular/core';
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
    // Capture the showSubNavBar if available
    // tslint:disable-next-line:max-line-length
    this.route.queryParamMap.pipe(map(params => params.get('showSubNavBar').toLowerCase() === 'true' ? true : false)).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
      document.getElementById('howTo').style.backgroundColor = '#fff';
      document.getElementById('howTo').style.color = '#212529';
    });
  }
}
