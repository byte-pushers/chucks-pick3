import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from './card.page';
import { CardPageRoutingModule } from './card.page.routing.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CardPageRoutingModule
    ],
    exports: [
    ],
    declarations: [
        CardPage
    ]
})
export class CardPageModule {

}
