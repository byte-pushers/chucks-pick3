import {Component, OnInit } from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';

@Component({
  selector: 'app-info-requirements',
  templateUrl: './info-requirements.component.html',
  styleUrls: ['./info-requirements.component.css']
})

export class InfoRequirementsComponent implements OnInit {
  private isSubNavBarVisible = true;
  constructor(private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {
    const subNavBarVisible = this.isSubNavBarVisible;
    return this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
  }
}

