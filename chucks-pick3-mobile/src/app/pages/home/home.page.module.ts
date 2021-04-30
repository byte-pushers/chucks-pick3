import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
// import { CardComponent } from "../../components/card/card.component";
import { HomePageRoutingModule } from "./home.page.routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        HomePageRoutingModule
    ],
    exports: [

    ],
    declarations: [
        HomePage/*,
        CardComponent*/
    ]
})
export class HomePageModule {}
