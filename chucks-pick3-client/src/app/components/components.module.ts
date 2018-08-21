import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DrawResultsComponent } from './draw-results/draw-results';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
	declarations: [ DrawResultsComponent ],
	exports: [ DrawResultsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
