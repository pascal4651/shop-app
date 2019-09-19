import { Component, OnInit, Input } from "@angular/core";
import { Product } from "./../../Models/product";

@Component({
  selector: "app-prod-card",
  templateUrl: "./prod-card.component.html",
  styleUrls: ["./prod-card.component.scss"]
})
export class ProdCardComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit() {}
}
