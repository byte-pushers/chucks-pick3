import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from "./card.page";

const routes: Routes = [
    {
        path: 'card',
        component: CardPage,
        children: [
            {
                path: 'pick3-draw-date-info-section',
                outlet: 'pick3-draw-date-info-section',
                loadChildren: '../pick3-draw-date-info-section/pick3-draw-date-info-section.module#Pick3DrawDateInfoSectionModule'
            },
            {
                path: 'pick3-draw-time-info-section',
                outlet: 'pick3-draw-time-info-section',
                loadChildren: '../pick3-draw-time-info-section/pick3-draw-time-info-section.module#Pick3DrawTimeInfoSectionModule'
            }
            /*,
            {
                path: 'select/pick3-draw-date-info',
                outlet: 'pick3-draw-date-info',
                loadChildren: '../pick3-draw-date-info-section/pick3-draw-date-info-section.module#Pick3DrawDateInfoSectionModule'
            },
            {
                path: 'select/pick3-draw-time-info',
                outlet: 'pick3-draw-time-info',
                loadChildren: '../pick3-draw-time-info-section/pick3-draw-time-info-section.module#Pick3DrawTimeInfoSectionModule'
            },
            {
                path: 'generate/pick3-draw-date-info',
                outlet: 'pick3-draw-date-info',
                loadChildren: '../pick3-draw-date-info-section/pick3-draw-date-info-section.module#Pick3DrawDateInfoSectionModule'
            },
            {
                path: 'generate/pick3-draw-time-info',
                outlet: 'pick3-draw-time-info',
                loadChildren: '../pick3-draw-time-info-section/pick3-draw-time-info-section.module#Pick3DrawTimeInfoSectionModule'
            }*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardPageRoutingModule { }
