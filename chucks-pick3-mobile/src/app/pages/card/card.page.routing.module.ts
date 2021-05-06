import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';

const routes: Routes = [
    {
        path: '',
        outlet: 'card-page',
        component: CardPage,
        /*children: [
            {
                path: '',
                outlet: 'pick3-draw-date-info-section',
                loadChildren: () => import('../pick3-draw-date-info-section/pick3-draw-date-info-section.module').then(m => m.Pick3DrawDateInfoSectionPageModule)
            },
            {
                path: '',
                outlet: 'pick3-draw-time-info-section',
                loadChildren: () => import('../pick3-draw-time-info-section/pick3-draw-time-info-section.module').then(m => m.Pick3DrawTimeInfoSectionPageModule)
            }
        ]*/
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
