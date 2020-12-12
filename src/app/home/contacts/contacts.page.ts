import { Component, OnInit } from "@angular/core";
import { Contacts } from "@ionic-native/contacts/ngx";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"],
})
export class ContactsPage implements OnInit {
  constructor(private contact: Contacts) {}
  userContacts: any[] = [];
  ngOnInit() {
    let options = {
      filter: "",
      multiple: true,
      hasPhoneNumber: true,
    };
    this.contact.find(["*"], options).then((contacts) => {
      this.userContacts = contacts;
      console.log(this.userContacts);
    });
  }
}
