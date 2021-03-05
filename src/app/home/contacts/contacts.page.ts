import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Contacts } from "@ionic-native/contacts/ngx";
import { Subscription } from "rxjs";
import { ContactService } from "src/app/Service/contact/contact.service";
@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"],
})
export class ContactsPage implements OnInit {
  constructor(
    private contact: Contacts,
    private contactService: ContactService,
    private fireStore: AngularFirestore
  ) {}
  userContacts: any[] = [];
  dbContactsSubscription: Subscription;
  dbContactlistUser: any[] = [];
  dbLengthSubscription: Subscription;
  UsersOnApp: any[];
  UsersNotonApp: any[];
  userContactList: any[] = [];
  dbLength: number;
  ngOnInit() {
    this.dbLengthSubscription = this.contactService
      .getLengthOfDataFromDb()
      .subscribe((res) => {
        this.dbLength = res.length;
        console.log(this.dbLength);

        this.getDbUserData();
      });
  }
  /*
  
  //this method is responsible for getting Dbusers information
  
  
  */
  getDbUserData() {
    this.dbContactsSubscription = this.contactService

      .getContactonApp()

      .subscribe((res) => {
        let data = {};
        let indexValue = 1;
        res.forEach((result) => {
          let usersContactData = {};

          usersContactData = result.data();

          data = {
            ...usersContactData,

            id: result.id,
          };

          this.dbContactlistUser.push(data);

          console.log(this.dbContactlistUser);
          if (indexValue == this.dbLength) {
            console.log("Equal");
            this.fetchUserContacts();
          }
          if (indexValue != this.dbLength) {
            let oldValue = indexValue;

            console.log(indexValue);
            indexValue = oldValue + 1;
          }
        });
      });
  }
  //this Method is responsible for fetching user Contact List
  fetchUserContacts() {
    let options = {
      filter: "",
      multiple: true,
      hasPhoneNumber: true,
    };
    this.contact.find(["*"], options).then((contacts) => {
      this.userContacts = contacts;
      this.userContacts.map((contact) => {
        let userContact = contact;
        contact.phoneNumbers.map((userContactNumber) => {
          const conactNumber = userContactNumber;
          //dataBaseUsers
          this.dbContactlistUser.map((dbUsers) => {
            if (
              userContactNumber.value[0] +
                userContactNumber.value[1] +
                userContactNumber.value[2] ===
              "+91"
            ) {
              userContactNumber.value = userContactNumber.value
                .substring(3)
                .trim();
              //console.log(userContactNumber);
              if (dbUsers.mobileNumber === userContactNumber.value) {
                this.UsersOnApp.push({
                  dbDeatils: { ...dbUsers },
                  conatctInfo: { ...userContact },
                });
              } else {
                this.UsersNotonApp.push({
                  conatctInfo: { ...userContact },
                });
              }
            } else {
              if (dbUsers.mobileNumber === userContactNumber.value) {
                this.UsersOnApp.push({
                  dbDeatils: { ...dbUsers },
                  conatctInfo: { ...userContact },
                });
              } else {
                this.UsersNotonApp.push({
                  conatctInfo: { ...userContact },
                });
              }
            }
            console.log(this.UsersOnApp);
            // console.log(this.UsersNotonApp);
          });
        });
      });
    });
  }
}
