import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';
import {Pick3DrawDateInfoSection} from "../../components/pick3-draw-date-info-section/pick3-draw-date-info-section";
import {Pick3DrawTimeInfoSection} from "../../components/pick3-draw-time-info-section/pick3-draw-time-info-section";

const routes: Routes = [
    {
        path: '',
        outlet: 'card-page-1',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'pick3-draw-date-info-section',
                component: Pick3DrawDateInfoSection
            },
            {
                path: '',
                outlet: 'pick3-draw-time-info-section',
                component: Pick3DrawTimeInfoSection
            }
        ]
    },
    {
        path: '',
        outlet: 'card-page-2',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'pick3-draw-date-info-section',
                component: Pick3DrawDateInfoSection
            },
            {
                path: '',
                outlet: 'pick3-draw-time-info-section',
                component: Pick3DrawTimeInfoSection
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
    }
}
