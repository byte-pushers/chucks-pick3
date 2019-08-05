import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    document.getElementById('howTo').style.backgroundColor = '#fff';
    document.getElementById('howTo').style.color = '#212529';
  }
}
