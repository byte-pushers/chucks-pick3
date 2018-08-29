import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';
import { FutureSelectPage } from './future-select.page';
import {TitleCasePipe} from "@angular/common";

@IonicPage()
@NgModule({
  declarations: [ FutureSelectPage ],
  providers: [ TitleCasePipe ],
  imports: [
    IonicPageModule.forChild(FutureSelectPage)
  ]
})
export class FutureSelectPageModule { }
