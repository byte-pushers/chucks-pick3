import {Component, OnInit } from '@angular/core';
import {SubNavBarService} from '../../services/show-sub-nav-bar.service/sub-nav-bar.service';

@Component({
  selector: 'app-info-interface',
  templateUrl: './info-interface.component.html',
  styleUrls: ['./info-interface.component.css']
})

export class InfoInterfaceComponent implements OnInit {
  // private isSubNavBarVisible = true;
  constructor(private subNavBarService: SubNavBarService) {
  }

  ngOnInit() {
    //const subNavBarVisible = this.isSubNavBarVisible;
    //this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
  }
}

