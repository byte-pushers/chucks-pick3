import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    document.getElementById('howTo').style.backgroundColor = '#fff';
    document.getElementById('howTo').style.color = '#212529';
  }
}

