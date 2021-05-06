import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageRoutingModule } from "./home.page.routing.module";
import {CardPageModule} from '../card/card.page.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        HomePageRoutingModule,
        CardPageModule
    ],
    exports: [

    ],
    declarations: [
        HomePage
    ]
})
export class HomePageModule {
    constructor() {
        console.log('HomePageModule')
    }
}
