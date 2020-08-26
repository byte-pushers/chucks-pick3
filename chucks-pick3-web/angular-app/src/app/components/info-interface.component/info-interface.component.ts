import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-info-interface',
  templateUrl: './info-interface.component.html',
  styleUrls: ['./info-interface.component.css']
})

export class InfoInterfaceComponent implements OnInit {
  constructor(public router: Router) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
  }
  public goToMobileInterface() {
    this.router.navigate(['/generate']);
  }
}
