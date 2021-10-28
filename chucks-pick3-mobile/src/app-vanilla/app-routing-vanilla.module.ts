import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home-vanilla',
    loadChildren: () => import('./home-vanilla/home-vanilla.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home-vanilla',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingVanillaModule { }
