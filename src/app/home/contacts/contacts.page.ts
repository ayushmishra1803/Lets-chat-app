import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Contacts } from "@ionic-native/contacts/ngx";
import { LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { LoadingComponent } from "src/app/components/loading/loading.component";
import { ContactService } from "src/app/Service/contact/contact.service";
import { LoadingService } from "src/app/Service/loading/loading.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Router } from "@angular/router";
@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.page.html",
  styleUrls: ["./contacts.page.scss"],
})
export class ContactsPage implements OnInit {
  constructor(
    private contact: Contacts,
    private contactService: ContactService,
    private fireStore: AngularFirestore,
    private userData: UserDataService,
    private loading: LoadingService,
    private socailSharing: SocialSharing,
    private router: Router
  ) {}
  userContacts: any[] = [];
  dbContactsSubscription: Subscription;
  dbContactlistUser: any[] = [];
  dbLengthSubscription: Subscription;
  UsersOnApp: any[] = [];
  UsersNotonApp: any[] = [];
  userContactList: any[] = [];
  dbLength: number;
  ngOnInit() {
    this.loading.showLoader();
    this.dbLengthSubscription = this.contactService
      .getLengthOfDataFromDb()
      .subscribe((res) => {
        this.dbLength = res.length;

        this.getDbUserData();
      });
  }
  /*
  
  this method is responsible for getting Dbusers information
  
  
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

          if (indexValue == this.dbLength - 1) {
            this.fetchUserContacts();
          }
          if (indexValue != this.dbLength) {
            let oldValue = indexValue;

            indexValue = oldValue + 1;
          }
        });
      });
  }
  /*
  this Method is responsible for fetching user Contact List
  */
  fetchUserContacts() {
    let options = {
      filter: "",
      multiple: true,
      hasPhoneNumber: true,
    };
    this.contact.find(["*"], options).then((contacts) => {
      let userAllContacts = [];
      userAllContacts = contacts;

      userAllContacts.map((conatct) => {
        const currentConact = conatct;
        conatct.phoneNumbers.map((number, phonenumberIndex) => {
          if (number.value[0] + number.value[1] + number.value[2] === "+91") {
            //
            currentConact.phoneNumbers.value = number.value.slice(3);

            //
            //
          }

          this.dbContactlistUser.map((userontheApp) => {
            if (currentConact.phoneNumbers.value != undefined) {
              if (
                userontheApp.mobileNumber ===
                currentConact.phoneNumbers.value.replace(/\s+/g, "")
              ) {
                this.loading.hideLoader();
                this.UsersOnApp.push({
                  mobileData: { ...currentConact },
                  dbData: { ...userontheApp },
                });
                console.log(this.UsersOnApp);
              } else {
                this.loading.hideLoader();
                this.UsersNotonApp.push({
                  mobileData: { ...currentConact },
                  dbData: { ...userontheApp },
                });
              }
            }
          });
        });
      });
    });
  }
  inviteOthers() {
    this.socailSharing
      .share("Sharing The Latest Chat App", "Lets Chat", null, "google.com")
      .then((res) => {})
      .catch((err) => {});
  }
  GotChat(contact) {
    console.log(contact);
    this.router.navigate(["/chating/" + contact.dbData.id]);
  }
}
