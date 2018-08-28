import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { DrawResultsComponent } from './draw-results/draw-results';
import { ProgressIndeterminateComponent } from "./progress-indeterminate/progress-indeterminate";

import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  imports: [ PipesModule, CommonModule, IonicModule ],
	declarations: [ DrawResultsComponent, ProgressIndeterminateComponent ],
	exports: [ DrawResultsComponent, ProgressIndeterminateComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
