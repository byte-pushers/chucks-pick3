import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// tslint:disable-next-line:component-class-suffix
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    document.getElementById('howTo').style.backgroundColor = '#fff';
    document.getElementById('howTo').style.color = '#212529';
  }
}
