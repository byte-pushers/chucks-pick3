import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormValidationService} from '../../services/form-validation.service';

@Component({
  selector: 'app-info-requirements',
  templateUrl: './info-requirements.component.html',
  styleUrls: ['./info-requirements.component.css']
})

export class InfoRequirementsComponent implements OnInit {
  constructor(public formValidationService: FormValidationService,
              public router: Router) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
    const summaryActive = document.getElementById('summary');
    summaryActive.classList.remove('active');
    summaryActive.classList.add('allow-hover');
  }
  public goToMobileInterface() {
    this.router.navigate(['/interface']);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
