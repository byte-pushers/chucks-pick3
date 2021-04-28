import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'card',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
    slideNumber;
    data;
    defaultDrawDateTime;

    constructor() {

    }
    ngOnDestroy(): void {

    }

    ngOnInit(): void {

    }

}
