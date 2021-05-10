import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';
import {Pick3DrawDateInfoSectionPage} from "../pick3-draw-date-info-section/pick3-draw-date-info-section-page";
import {Pick3DrawTimeInfoSectionPage} from "../pick3-draw-time-info-section/pick3-draw-time-info-section.page";

const routes: Routes = [
    {
        path: '',
        outlet: 'card-page',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'pick3-draw-date-info-section',
                component: Pick3DrawDateInfoSectionPage
            },
            {
                path: '',
                outlet: 'pick3-draw-time-info-section',
                component: Pick3DrawTimeInfoSectionPage
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardPageRoutingModule {
    constructor() {
        console.log('CardPageRoutingModule');
    }
}
