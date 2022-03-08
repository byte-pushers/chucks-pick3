import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPage } from './view.page';
import { GeneratePage } from '../generate/generate.page';
import { Pick3DrawDateInfoSection } from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import { ViewPicksCardComponent } from '../../components/view-picks-card/view-picks-card.component';
import { Pick3ViewDateSectionComponent } from '../../components/pick3-view-date-section/pick3-view-date-section.component';

const routes: Routes = [
  {
    path: 'view-picks',
    component: ViewPage,
    children: [
      {
        path: '',
        outlet: 'primary',
        component: Pick3ViewDateSectionComponent,
      },
      {
        path: '',
        outlet: 'secondary',
        component: ViewPicksCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPageRoutingModule {}
