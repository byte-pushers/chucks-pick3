import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {
  public bytePushersUrl = environment.BYTEPUSHERS_URL;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }
  public saveFragment(fragment: string): void {
    this.appService.saveFragment(fragment);
  }

  public backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
