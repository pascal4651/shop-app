import { Product } from "./../Models/product";
import { PRODUCTS } from "./../Models/mock-products";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products = PRODUCTS;

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    return of(PRODUCTS.find(product => product.id === id));
  }
}
