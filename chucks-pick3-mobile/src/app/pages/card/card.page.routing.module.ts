import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';
import {Pick3DrawDateInfoSection} from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import {Pick3DrawTimeInfoSection} from '../../components/pick3-draw-time-info-section/pick3-draw-time-info-section';
import {ViewPicksCardComponent} from '../../components/view-picks-card/view-picks-card.component';
import {GeneratePicksCardComponent} from '../../components/generate-picks-card/generate-picks-card.component';

const routes: Routes = [
    {
        outlet: 'card-page',
        path: '',
        component: CardPage,
        children: [
            {
                outlet: 'primary',
                path: '',
                component: Pick3DrawDateInfoSection
            },
            {
                outlet: 'secondary',
                path: '',
                component: Pick3DrawTimeInfoSection
            }
        ]
    },
    {
        path: 'view-picks',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'primary',
                component: Pick3DrawDateInfoSection
            },
            {
                path: '',
                outlet: 'secondary',
                component: ViewPicksCardComponent
            }
        ]
    },
    {
        path: 'generate-picks',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'primary',
                component: Pick3DrawDateInfoSection
            },
            {
                path: '',
                outlet: 'secondary',
                component: GeneratePicksCardComponent
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
