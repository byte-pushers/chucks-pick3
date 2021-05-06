import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomePage } from './home.page';
import {CardPage} from "../card/card.page";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../card/card.page.module').then(m => m.CardPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
  constructor() {
    console.log('HomePageRoutingModule');
  }

}
