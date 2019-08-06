import {Component, ChangeDetectorRef, OnInit, AfterViewInit} from '@angular/core';
import {SubNavBarService} from '../../../services/show-sub-nav-bar.service/sub-nav-bar.service';
import {ActivatedRoute, Params} from '@angular/router';
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit, AfterViewInit{


  constructor(private subNavBarService: SubNavBarService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    /*this.route.queryParamMap.pipe(map(params => params.get('showSubNavBar').toLowerCase() === 'true' ? true : false)).subscribe(subNavBarVisible => {
      this.subNavBarService.setSubNavBarVisibility(subNavBarVisible);
    });*/
    /*this.route.params.subscribe((params: Params) => {
      //this.subNavBarService.setSubNavBarVisibility(params.showSubNavBar);
    });*/
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public isSubNavBarVisible(): boolean {
    return this.subNavBarService.getSubNavBarVisibility();
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.subNavBarService.setSubNavBarVisibility(showSubNavBarStatus);
  }
/*Side Nav Bar Mobile*/
  public openNav() {
    document.getElementById('side-nav-bar').style.width = '250px';
  }

  public closeNav() {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  onClickedOutside(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  handleScroll(e: Event) {
    document.getElementById('side-nav-bar').style.width = '0';
  }

  public howToActive() {
    document.getElementById('howTo').style.backgroundColor = '#d0d0d0';
    document.getElementById('howTo').style.color = 'gray';
  }
}
