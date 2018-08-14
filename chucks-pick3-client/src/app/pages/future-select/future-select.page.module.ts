import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';
import { FutureSelectPage } from './future-select.page';

@IonicPage()
@NgModule({
  declarations: [FutureSelectPage],
  imports: [
    IonicPageModule.forChild(FutureSelectPage)
  ]
})
export class FutureSelectPageModule { }
