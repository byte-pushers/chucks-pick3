import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePage } from './generate.page';
import { Pick3DrawDateInfoSection } from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import { PreviousWinningNumberCardComponent } from '../../components/previous-winning-number-card/previous-winning-number-card.component';
import {GenerateNextNumbersCardComponent} from '../../components/generate-next-numbers-card/generate-next-numbers-card.component';

const routes: Routes = [
  {
    path: 'select-picks',
    component: GeneratePage,
    children: [
      {
        path: '',
        outlet: 'primary',
        component: Pick3DrawDateInfoSection
      },
      {
        path: '',
        outlet: 'secondary',
        component: PreviousWinningNumberCardComponent
      }
    ]
  },
  {
    path: 'generate-picks',
    component: GeneratePage,
    children: [
      {
        path: '',
        outlet: 'primary',
        component: Pick3DrawDateInfoSection
      },
      {
        path: '',
        outlet: 'secondary',
        component: GenerateNextNumbersCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratePageRoutingModule {
  constructor(){}
}
