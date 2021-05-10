import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pick3DrawDateInfoSectionPage } from './pick3-draw-date-info-section-page';

const routes: Routes = [
    { path: 'pick3-draw-date-info-section', outlet: 'pick3-draw-date-info-section', component: Pick3DrawDateInfoSectionPage},
    { path: '', outlet: 'pick3-draw-date-info-section', component: Pick3DrawDateInfoSectionPage}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Pick3DrawDateInfoSectionPageRoutingModule {
    constructor() {
        console.log('Pick3DrawDateInfoSectionPageRoutingModule');
    }
}
