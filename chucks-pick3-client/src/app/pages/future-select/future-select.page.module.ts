import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';
import { FutureSelectPage } from './future-select.page';
import {TitleCasePipe} from '@angular/common';
import {PipesModule} from '../../pipes/pipes.module';

@IonicPage()
@NgModule({
  declarations: [ FutureSelectPage ],
  providers: [ TitleCasePipe ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(FutureSelectPage)
  ]
})
export class FutureSelectPageModule { }
