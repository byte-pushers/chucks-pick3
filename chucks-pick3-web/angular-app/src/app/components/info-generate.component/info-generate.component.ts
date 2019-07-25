import {Component, OnInit } from '@angular/core';
import {SubNavBarService} from "../../services/show-sub-nav-bar.service/sub-nav-bar.service";

@Component({
  selector: 'app-info-generate',
  templateUrl: './info-generate.component.html',
  styleUrls: ['./info-generate.component.css']
})

export class InfoGenerateComponent implements OnInit {
  private isSubNavBarVisible = true;
  constructor(private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {
    const subNavBarVisible = this.isSubNavBarVisible;
    return this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
  }

}

