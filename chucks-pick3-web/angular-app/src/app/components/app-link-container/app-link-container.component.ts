import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-container',
  templateUrl: './app-link-container.component.html',
 /* template: `Hello World!  {{ name }}`,*/
  styleUrls: ['./app-link-container.component.css']
})


export class AppLinkContainerComponent implements OnInit {
  public name = 'David';
  constructor() {}
  ngOnInit() {
  }
}
