import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeVanillaPage } from './home-vanilla.page';

const routes: Routes = [
  {
    path: '',
    component: HomeVanillaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
