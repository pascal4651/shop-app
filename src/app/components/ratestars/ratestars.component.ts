import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ratestars",
  templateUrl: "./ratestars.component.html",
  styleUrls: ["./ratestars.component.scss"]
})
export class RatestarsComponent implements OnInit {
  @Input() rate: number;

  stars: any = [
    {
      checked: false
    },
    {
      checked: false
    },
    {
      checked: false
    },
    {
      checked: false
    },
    {
      checked: false
    }
  ];
  constructor() {}

  ngOnInit() {
    this.setRate();
  }

  setRate() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].checked = i + 1 <= this.rate ? true : false;
    }
  }
}
