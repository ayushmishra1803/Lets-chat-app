import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  constructor() {}
  userchat = [
    {
      userimg: "/assets/chats/user.jfif",
      username: "Ayush Mishra",
      Date: "Mon",
      lastText: "Whats up",
    },
    {
      userimg: "/assets/chats/user.jfif",
      username: "Ayush Mishra",
      Date: "Mon",
      lastText: "How are you",
    },
    {
      userimg: "/assets/chats/user.jfif",
      username: "Ayush Mishra",
      Date: "Mon",
      lastText: "Ok",
    },
    {
      userimg: "/assets/chats/user.jfif",
      username: "Ayush Mishra",
      Date: "Mon",
      lastText: "Ok",
    },
    {
      userimg: "/assets/chats/user.jfif",
      username: "Ayush Mishra",
      Date: "Mon",
      lastText: "Ok",
    },
  ];
  ngOnInit() {}
}
