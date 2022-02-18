import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPage } from './card.page';
import { Pick3DrawDateInfoSection } from '../../components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import { Pick3DrawTimeInfoSectionComponent } from '../../components/pick3-draw-time-info-section/pick3-draw-time-info-section.component';
import { ViewPicksCardComponent } from '../../components/view-picks-card/view-picks-card.component';
import { PreviousWinningNumberCardComponent } from '../../components/previous-winning-number-card/previous-winning-number-card.component';
import { GeneratePage } from '../generate/generate.page';

const routes: Routes = [
  {
    outlet: 'card-page-1',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-2',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-3',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-4',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-5',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-6',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-7',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  },
  {
    outlet: 'card-page-8',
    path: '',
    component: CardPage,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: Pick3DrawDateInfoSection,
      },
      {
        outlet: 'secondary',
        path: '',
        component: Pick3DrawTimeInfoSectionComponent,
      },
    ],
  } /*,
    {
        path: 'view-picks',
        component: CardPage,
        children: [
            {
                path: '',
                outlet: 'primary',
                component: Pick3DrawDateInfoSection
            },
            {
                path: '',
                outlet: 'secondary',
                component: ViewPicksCardComponent
            }
        ]
    }*/,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardPageRoutingModule {
  constructor() {}
}
