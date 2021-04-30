import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/(card-page:card-page)',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'card-page',
        outlet: 'card-page',
        loadChildren: '../card/card.page.module#CardPageModule'
      },
      {
        path: '',
        redirectTo: '/home/(card-page:card-page)',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
