import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/(card:card)',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'card-page',
        outlet: 'card-page',
        loadChildren: () => import('../card/card.page.module').then(m => m.CardPageModule)
      }/*,
      {
        path: '',
        redirectTo: '/home/(card-page:card-page)',
        pathMatch: 'full'
      }*//*,
      {
        path: '',
        redirectTo: '/home/card-page',
        pathMatch: 'full'
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
