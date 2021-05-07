import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';
import {Pick3DrawTimeSlotComponent} from "../../components/pick3-draw-time-slot/pick3-draw-time-slot.component";
import {Pick3DrawDateInfoSectionPage} from "../pick3-draw-date-info-section/pick3-draw-date-info-section-page";
import {Pick3DrawDateSlotComponent} from "../../components/pick3-draw-date-slot/pick3-draw-date-slot.component";

const routes: Routes = [
    {
        path: '',
        outlet: 'card-page',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'pick3-draw-time-slot',
                component:Pick3DrawTimeSlotComponent },
            {
                path: '',
                outlet: 'pick3-draw-date-slot',
                component: Pick3DrawTimeSlotComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [Pick3DrawTimeSlotComponent, Pick3DrawDateSlotComponent]
})
export class CardPageRoutingModule {
    constructor() {
        console.log('CardPageRoutingModule');
    }
}
