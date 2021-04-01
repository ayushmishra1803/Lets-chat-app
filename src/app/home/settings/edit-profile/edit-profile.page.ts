import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  editable = [
    {
      title: " First Name",
      placeholder: "Jhon",
      value: "Ayush",type:'text'
    },
    {
      title: " Last Name",
      placeholder: "Doe",
      value: "Ayush",type:'text'
    },
    {
      title: " Your Email",
      placeholder: "JhonDoe@unknown.com",
      value: "Ayush",type:'text'
    },
    {
      title: " Your @ Username",
      placeholder: "Jhon@Doe",
      value: "Ayush",type:'text'
    },
    {
      title: " Your Mobile Number",
      placeholder: "+91 *******",
      value: "Ayush",type:'number'
    },
  ];
  constructor() {}

  ngOnInit() {}
  onChangeInputValue(event){
console.log(event);

  }
}
