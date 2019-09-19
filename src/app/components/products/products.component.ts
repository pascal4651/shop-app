import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "./../../services/product.service";
import { Product } from "./../../Models/product";
import { Subscription } from "rxjs";

import { MessageService } from "./../../services/message.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  totalProducts: number;
  selectedProducts: number;
  sortType: string = "popular";
  sortOptions: string[] = [
    "from low to high",
    "from high to low",
    "popular",
    "by rates",
    "discounts"
  ];
  filtersBrand: string[] = [];
  filtersCpu: string[] = [];
  filtersRam: string[] = [];
  filtersPrice: string[] = [];
  filtersGpu: string[] = [];
  filtersOs: string[] = [];
  filtersHdd: string[] = [];

  subscription: Subscription;
  p: number = 1;

  constructor(
    private prodService: ProductService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.getFilter().subscribe(message => {
      if (message) {
        if (message.indexOf("brand") != -1) {
          this.addRemoveFilter(this.filtersBrand, message);
        } else if (message.indexOf("cpu") != -1) {
          this.addRemoveFilter(this.filtersCpu, message);
        } else if (message.indexOf("ram") != -1) {
          this.addRemoveFilter(this.filtersRam, message);
        } else if (message.indexOf("price") != -1) {
          this.filtersPrice = [message];
        } else if (message.indexOf("gpu") != -1) {
          this.addRemoveFilter(this.filtersGpu, message);
        } else if (message.indexOf("os") != -1) {
          this.addRemoveFilter(this.filtersOs, message);
        } else if (message.indexOf("hdd") != -1) {
          this.addRemoveFilter(this.filtersHdd, message);
        }
        this.sortProducts(this.sortType);
      }
    });
  }

  addRemoveFilter(filtersArray: any[], filter: string) {
    if (filtersArray.includes(filter)) {
      var index = filtersArray.indexOf(filter);
      if (index !== -1) filtersArray.splice(index, 1);
    } else {
      filtersArray.push(filter);
    }
  }

  ngOnInit() {
    this.sortProducts(this.sortType);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProducts(): void {
    this.prodService
      .getProducts()
      .subscribe(products => (this.products = products));
  }

  sortProducts(sortType: any) {
    this.updateProdacts();
    switch (sortType) {
      case "from low to high":
        this.products.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "from high to low":
        this.products.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "popular":
        this.products.sort((a, b) => Number(b.popular) - Number(a.popular));
        break;
      case "by rates":
        this.products.sort((a, b) => Number(b.rate) - Number(a.rate));
        break;
      case "discounts":
        this.products = this.products.filter(product => product.discount > 0);
        break;
      default:
        break;
    }
    this.selectedProducts = this.products.length;
  }

  deleteFilter(filter: string) {
    if (this.filtersBrand.includes(filter)) {
      this.filtersBrand = this.filtersBrand.filter(item => item !== filter);
    } else if (this.filtersCpu.includes(filter)) {
      this.filtersCpu = this.filtersCpu.filter(item => item !== filter);
    } else if (this.filtersRam.includes(filter)) {
      this.filtersRam = this.filtersRam.filter(item => item !== filter);
    } else if (this.filtersPrice.includes(filter)) {
      this.filtersPrice = this.filtersPrice.filter(item => item !== filter);
    } else if (this.filtersGpu.includes(filter)) {
      this.filtersGpu = this.filtersGpu.filter(item => item !== filter);
    } else if (this.filtersOs.includes(filter)) {
      this.filtersOs = this.filtersOs.filter(item => item !== filter);
    } else if (this.filtersHdd.includes(filter)) {
      this.filtersHdd = this.filtersHdd.filter(item => item !== filter);
    }
    this.messageService.sendFilterToClear(filter);
    this.sortProducts(this.sortType);
  }

  updateProdacts() {
    this.getProducts();
    this.totalProducts = this.products.length;
    if (this.filtersBrand.length > 0) {
      this.checkFilters1(this.filtersBrand);
    }
    if (this.filtersCpu.length > 0) {
      this.checkFilters1(this.filtersCpu);
    }
    if (this.filtersRam.length > 0) {
      this.checkFilters2(this.filtersRam);
    }
    if (this.filtersPrice.length > 0) {
      this.checkFilters3(this.filtersPrice);
    }
    if (this.filtersGpu.length > 0) {
      this.checkFilters1(this.filtersGpu);
    }
    if (this.filtersOs.length > 0) {
      this.checkFilters1(this.filtersOs);
    }
    if (this.filtersHdd.length > 0) {
      this.checkFilters1(this.filtersHdd);
    }
  }

  checkFilters1(filtersArray: string[]) {
    this.products = this.products.filter(product => {
      for (let i = 0; i < filtersArray.length; i++) {
        const [key, value] = filtersArray[i].split(":");
        if (product[key] == value) {
          return true;
        }
      }
      return false;
    });
  }

  checkFilters2(filtersArray: string[]) {
    this.products = this.products.filter(product => {
      for (let i = 0; i < filtersArray.length; i++) {
        if (filtersArray[i].indexOf("-") != -1) {
          const [min, max] = filtersArray[i].split(":")[1].split("-");
          if (product.ram >= Number(min) && product.ram <= Number(max)) {
            return true;
          }
        } else {
          const ramToCompare = filtersArray[i].split(":")[1].split(" ");
          if (
            ramToCompare.length == 1 &&
            product.ram == Number(ramToCompare[0])
          ) {
            return true;
          } else if (
            ramToCompare.length > 1 &&
            product.ram >= Number(ramToCompare[0])
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  checkFilters3(filtersArray: string[]) {
    this.products = this.products.filter(product => {
      const [min, max] = filtersArray[0].split(":")[1].split("-");
      if (product.price >= Number(min) && product.price <= Number(max)) {
        return true;
      }
      return false;
    });
  }

  clearAllFilters() {
    this.messageService.sendFilterToClear("all");
    this.filtersBrand = [];
    this.filtersCpu = [];
    this.filtersRam = [];
    this.filtersPrice = [];
    this.filtersGpu = [];
    this.filtersOs = [];
    this.filtersHdd = [];
    this.sortProducts(this.sortType);
  }
}
