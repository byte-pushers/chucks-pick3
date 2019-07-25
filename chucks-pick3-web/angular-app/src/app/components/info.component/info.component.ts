import {Component, OnInit } from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  private isSubNavBarVisible = true;
  constructor(private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {
    const subNavBarVisible = this.isSubNavBarVisible;
    return this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
  }
}
