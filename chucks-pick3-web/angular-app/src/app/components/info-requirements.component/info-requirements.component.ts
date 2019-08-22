import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-requirements',
  templateUrl: './info-requirements.component.html',
  styleUrls: ['./info-requirements.component.css']
})

export class InfoRequirementsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.add('active');
    howToActive.classList.remove('allow-hover');
  }
}
