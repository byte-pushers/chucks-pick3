import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { DrawResultsComponent } from './draw-results/draw-results';

import {PipesModule} from "../pipes/pipes.module";


@NgModule({
  imports: [ PipesModule, CommonModule, IonicModule ],
	declarations: [ DrawResultsComponent ],
	exports: [ DrawResultsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
