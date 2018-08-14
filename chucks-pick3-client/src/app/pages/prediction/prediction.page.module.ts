import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { PredictionPage } from './prediction.page';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [PredictionPage],
  imports: [
    PipesModule,
    IonicPageModule.forChild(PredictionPage)
  ]
})
export class PredictionPageModule { }
