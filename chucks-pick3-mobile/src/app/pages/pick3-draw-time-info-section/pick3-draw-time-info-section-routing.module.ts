import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pick3DrawTimeInfoSectionPage } from './pick3-draw-time-info-section.page';

const routes: Routes = [
    { path: 'pick3-draw-time-info-section', outlet: 'pick3-draw-time-info-section', component: Pick3DrawTimeInfoSectionPage},
    { path: '', component: Pick3DrawTimeInfoSectionPage}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Pick3DrawTimeInfoSectionPageRoutingModule {
    constructor() {
        console.log('Pick3DrawTimeInfoSectionPageRoutingModule');
    }
}
