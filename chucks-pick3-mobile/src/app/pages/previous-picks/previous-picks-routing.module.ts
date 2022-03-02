import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePage } from '../generate/generate.page';
import { Pick3GenerateDateSectionComponent } from '../../components/pick3-generate-date-section/pick3-generate-date-section.component';
import { PreviousWinningNumberCardComponent } from '../../components/previous-winning-number-section/previous-winning-number-card.component';
import { PreviousPicksDateSectionComponent } from '../../components/previous-picks-date-section/previous-picks-date-section.component';

const routes: Routes = [
  {
    path: 'select-picks',
    component: GeneratePage,
    children: [
      {
        path: '',
        outlet: 'primary',
        component: PreviousPicksDateSectionComponent,
      },
      {
        path: '',
        outlet: 'secondary',
        component: PreviousWinningNumberCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousPicksPageRoutingModule {
  constructor() {}
}
