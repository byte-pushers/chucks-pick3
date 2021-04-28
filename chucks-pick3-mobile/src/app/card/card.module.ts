import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPage } from "./card.page";


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
    ],
    declarations: [
        CardPage
    ]
})
export class HomePageModule {}
