import { NgModule } from '@angular/core';
import { IonicPage, IonicPageModule} from 'ionic-angular';
import { ContactPage } from './contact.page';

@IonicPage()
@NgModule({
  declarations: [ContactPage],
  imports: [
    IonicPageModule.forChild(ContactPage)
  ]
})
export class ContactPageModule { }
