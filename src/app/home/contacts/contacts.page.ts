import { Component, OnInit } from "@angular/core";
import { Contacts } from "@ionic-native/contacts/ngx";
import { ContactService } from "src/app/Service/contact/contact.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"],
})
export class ContactsPage implements OnInit {
  constructor(
    private contact: Contacts,
    private contactService: ContactService
  ) {}
  userContacts: any[] = [];
  ngOnInit() {
    this.contactService.getContactonApp();
    // let options = {
    //   filter: "",
    //   multiple: true,
    //   hasPhoneNumber: true,
    // };
    // this.contact.find(["*"], options).then((contacts) => {
    //   this.userContacts = contacts;
    //   this.userContacts.map((contact) => {
    //    // console.log(contact.phoneNumbers);

    //   });
    // });
  }
}
