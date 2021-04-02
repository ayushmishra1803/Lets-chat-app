import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chatting-long-hold-menu",
  templateUrl: "./chatting-long-hold-menu.component.html",
  styleUrls: ["./chatting-long-hold-menu.component.scss"],
})
export class ChattingLongHoldMenuComponent implements OnInit {
  constructor() {}
  option = [
    {
      name: "Delete",
      icon: "trash",
      value: "Delete",
      color: "danger",
    },
    {
      name: "Edit",
      icon: "create",
      value: "Edit",
      color: "light",
    },
  ];
  ngOnInit() {}
}
