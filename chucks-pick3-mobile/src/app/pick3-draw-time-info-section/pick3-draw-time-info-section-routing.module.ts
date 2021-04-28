import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pick3DrawTimeInfoSectionPage } from './pick3-draw-time-info-section.page';

const routes: Routes = [
    { path: '', component: Pick3DrawTimeInfoSectionPage, outlet: 'pick3-draw-time-info-section' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnePageRoutingModule { }
