import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-modal',
  styleUrls: ['./overlay-modal.component.css'],
  template:
    `<mat-card>
        <mat-card-header>
            <mat-card-title>
                Fetching data...
            </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-raised-button color="primary" (click)="closeModal($event)">confirm</button>
        </mat-card-content>
    </mat-card>`,
})
export class OverlayModalComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  public closeModal($event) {
    /*this.dialogRef.events.next({
      type: 'close',
      data: null
    });*/
  }
}
