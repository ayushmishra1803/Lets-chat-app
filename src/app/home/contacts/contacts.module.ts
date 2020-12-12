import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule
  ],
  declarations: [ContactsPage],providers:[Contacts]
})
export class ContactsPageModule {}
