import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-app-navbar",
  templateUrl: "./app-navbar.component.html",
  styleUrls: ["./app-navbar.component.scss"]
})
export class AppNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
