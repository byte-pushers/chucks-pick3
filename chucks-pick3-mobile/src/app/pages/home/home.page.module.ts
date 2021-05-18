import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { HttpClient} from "@angular/common/http";
import { HomePageRoutingModule } from "./home.page.routing.module";
import { CardPageModule} from '../card/card.page.module';
import { CardComponent} from "../../components/card/card.component";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        HomePageRoutingModule,
        CardPageModule
    ],
    exports: [

    ],
    declarations: [
        HomePage,
        CardComponent
    ]
})
export class HomePageModule {
    constructor() {
    }
}