import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { DrawResultsComponent } from './draw-results/draw-results';
import { ProgressIndeterminateComponent } from './progress-indeterminate/progress-indeterminate';
import { LogoSplashComponent } from './logo-splash/logo-splash';

import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  imports: [ PipesModule, CommonModule, IonicModule ],
  declarations: [ DrawResultsComponent, ProgressIndeterminateComponent, LogoSplashComponent ],
  exports: [ DrawResultsComponent, ProgressIndeterminateComponent, LogoSplashComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ComponentsModule {}
