import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'pick3-draw-date-info-section',
    templateUrl: './pick3-draw-date-info-section.html',
    styleUrls: ['./pick3-draw-date-info-section.page.scss'],
})
export class Pick3DrawDateInfoSection implements OnInit, OnDestroy {
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
