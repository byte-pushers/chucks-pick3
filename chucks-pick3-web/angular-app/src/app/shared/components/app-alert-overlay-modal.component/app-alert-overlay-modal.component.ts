import { Component, OnInit } from '@angular/core';
import {AppAlertOverlayModalService} from "./app-alert-overlay-modal.service";

@Component({
  selector: 'app-alert-overlay-modal',
  styleUrls: ['./app-alert-overlay-modal.component.css'],
  template:
    `<mat-card>
        <mat-card-header>
            <mat-card-title>
              {{message.value}}
            </mat-card-title>
        </mat-card-header>
        <mat-card-content class="mx-auto">
          <button mat-raised-button class="btn  overlay-btn" (click)="closeModal($event)">Ok</button>
        </mat-card-content>
    </mat-card>`,
})
export class AppAlertOverlayModalComponent implements OnInit {
  public message: {value: string} = {value: null};

  constructor(private appAlertOverlayModalService: AppAlertOverlayModalService) {

  }

  ngOnInit(): void {
    this.appAlertOverlayModalService.message().subscribe(msg => {
      this.message.value = msg;
    });
  }

  public closeModal($event) {
    this.appAlertOverlayModalService.close();
  }
}
