import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pick3DrawDateInfoSectionPage } from './pick3-draw-date-info-section-page';

const routes: Routes = [
    { path: '', component: Pick3DrawDateInfoSectionPage, outlet: 'one' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnePageRoutingModule { }
