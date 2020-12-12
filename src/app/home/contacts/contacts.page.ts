import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor(private contact:Contacts) { }
userContacts
  ngOnInit() {
    
  }

}
