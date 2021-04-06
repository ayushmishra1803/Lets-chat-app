import { Component, OnDestroy, OnInit } from "@angular/core";
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
export class ContactsPage implements OnInit, OnDestroy {
  constructor(
    private contact: Contacts,
    private contactService: ContactService,
    private fireStore: AngularFirestore,
    private userData: UserDataService,
    private loading: LoadingService,
    private socailSharing: SocialSharing,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  userContacts: any[] = [];
  dbContactsSubscription: Subscription;
  dbContactlistUser: any[] = [];
  dbLengthSubscription: Subscription;
  UsersOnApp: any[] = [];
  UsersNotonApp: any[] = [];
  userContactList: any[] = [];
  dbLength: number;
  ContactOnAppPushedContacts = [];
  ContactNotOnAppPushedContacts = [];
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
        let currentConact = conatct;
        conatct.phoneNumbers.map((number, phonenumberIndex) => {
          if (number.value[0] + number.value[1] + number.value[2] === "+91") {
            //
            currentConact.phoneNumbers.value = number.value.slice(3);

            //
            //
          }

          this.dbContactlistUser.map((userontheApp) => {
            if (currentConact.phoneNumbers.value != undefined) {
              currentConact.phoneNumbers.value = currentConact.phoneNumbers.value.replace(
                /\s/g,
                ""
              );
              if (
                userontheApp.mobileNumber === currentConact.phoneNumbers.value
              ) {
                if (
                  !this.ContactOnAppPushedContacts.includes(
                    currentConact.phoneNumbers.value
                  )
                ) {
                  console.log("not included");
                  console.log(currentConact.phoneNumbers.value);
                  this.loading.hideLoader();
                  this.UsersOnApp.push({
                    mobileData: { ...currentConact },
                    dbData: { ...userontheApp },
                  });
                  this.ContactOnAppPushedContacts.push(
                    currentConact.phoneNumbers.value
                  );
                }
              } else {
                if (
                  !this.ContactNotOnAppPushedContacts.includes(
                    currentConact.phoneNumbers.value
                  )
                ) {
                  console.log("not included");
                  console.log(currentConact.phoneNumbers.value);
                  this.loading.hideLoader();
                  this.UsersNotonApp.push({
                    mobileData: { ...currentConact },
                    dbData: { ...userontheApp },
                  });
                  this.ContactNotOnAppPushedContacts.push(
                    currentConact.phoneNumbers.value
                  );
                }
              }
            }
          });
          console.log(this.ContactOnAppPushedContacts);
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
    this.router.navigate(["/chating/" + contact.dbData.id]);
  }
}
