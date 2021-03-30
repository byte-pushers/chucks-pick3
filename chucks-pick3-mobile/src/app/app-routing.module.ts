import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then( m => m.AccountPageModule)
  }, {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'generate-picks',
    loadChildren: () => import('./components/generate-picks/generate-picks.module').then( m => m.GeneratePicksPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
