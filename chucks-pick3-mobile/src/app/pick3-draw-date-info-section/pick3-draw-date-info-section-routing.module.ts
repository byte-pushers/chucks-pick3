import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pick3DrawDateInfoSection } from './pick3-draw-date-info-section';

const routes: Routes = [
    { path: '', component: Pick3DrawDateInfoSection, outlet: 'one' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnePageRoutingModule { }
