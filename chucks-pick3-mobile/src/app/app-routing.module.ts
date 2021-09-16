import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'generate',
    redirectTo: 'generate-picks',
    pathMatch: 'full'
    // loadChildren: () => import('./pages/generate/generate.page.module').then(m => m.GeneratePageModule)
  },
  {
    path: 'select',
    redirectTo: 'select-picks',
    pathMatch: 'full'
    // loadChildren: () => import('./pages/generate/generate.page.module').then(m => m.GeneratePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
