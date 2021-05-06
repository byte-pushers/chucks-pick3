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
        outlet: 'card-page',
        component: CardPage
      },{
        path: 'card-page',
        outlet: 'card-page',
        loadChildren: () => import('../card/card.page.module').then(m => m.CardPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }/*,
      {
        path: '',
        redirectTo: '/home/card-page',
        pathMatch: 'full'
      }*!/*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
