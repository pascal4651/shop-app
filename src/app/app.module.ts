import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./components/products/products.component";
import { DetailsComponent } from "./components/details/details.component";
import { AboutComponent } from "./components/about/about.component";
import { ProdCardComponent } from "./components/prod-card/prod-card.component";
import { AppNavbarComponent } from "./components/app-navbar/app-navbar.component";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HomeComponent } from "./components/home/home.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { NgxPaginationModule } from "ngx-pagination";
import { RatestarsComponent } from './components/ratestars/ratestars.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DetailsComponent,
    AboutComponent,
    ProdCardComponent,
    AppNavbarComponent,
    SidebarComponent,
    HomeComponent,
    FilterPipe,
    FooterComponent,
    LoginComponent,
    RatestarsComponent,
    ShoppingCartComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
