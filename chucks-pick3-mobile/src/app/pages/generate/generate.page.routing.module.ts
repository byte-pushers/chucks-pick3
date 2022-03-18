import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePage } from './generate.page';
import { GenerateNextNumbersCardComponent } from '../../components/generate-next-numbers-section/generate-next-numbers-card.component';
import { Pick3GenerateDateSectionComponent } from '../../components/pick3-generate-date-section/pick3-generate-date-section.component';

const routes: Routes = [
  {
    path: 'generate-picks',
    component: GeneratePage,
    children: [
      {
        path: '',
        outlet: 'primary',
        component: Pick3GenerateDateSectionComponent,
      },
      {
        path: '',
        outlet: 'secondary',
        component: GenerateNextNumbersCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratePageRoutingModule {
  constructor() {}
}
