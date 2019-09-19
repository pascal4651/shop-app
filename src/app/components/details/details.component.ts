import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/Models/product";
import { ProductService } from "./../../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  product: Product;
  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.prodService
      .getProduct(id)
      .subscribe(product => (this.product = product));
  }
}
