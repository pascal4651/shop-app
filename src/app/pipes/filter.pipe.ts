import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(products: any, filters: any[]): any {
    return products.filter(product => {
      for (let i = 0; i < filters.length; i++) {
        const [key, value] = filters[i].split(":");
        if (product[key] == value) {
          return true;
        }
      }
      return false;
    });
  }
}
