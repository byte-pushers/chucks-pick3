import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'card-page',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
    constructor() {
        console.log('CardPage(): constructor.');
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

}
