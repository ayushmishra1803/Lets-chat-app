import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { Contacts } from '@ionic-native/contacts/ngx';
import { ContactService } from 'src/app/Service/contact/contact.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,AngularFirestoreModule
  ],
  declarations: [ContactsPage],providers:[Contacts,ContactService,SocialSharing]
})
export class ContactsPageModule {}
