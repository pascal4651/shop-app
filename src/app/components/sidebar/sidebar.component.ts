import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

import { MessageService } from "./../../services/message.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  brandList: any[] = [
    {
      name: "Acer",
      checked: false
    },
    {
      name: "Asus",
      checked: false
    },
    {
      name: "Dell",
      checked: false
    },
    {
      name: "HP",
      checked: false
    },
    {
      name: "Lenovo",
      checked: false
    },
    {
      name: "MSI",
      checked: false
    },
    {
      name: "Toshiba",
      checked: false
    }
  ];
  cpuList: any[] = [
    {
      name: "AMD A4",
      checked: false
    },
    {
      name: "AMD A6",
      checked: false
    },
    {
      name: "AMD A8",
      checked: false
    },
    {
      name: "Intel Celeron",
      checked: false
    },
    {
      name: "Intel Pentium",
      checked: false
    },
    {
      name: "Intel Core i3",
      checked: false
    },
    {
      name: "Intel Core i5",
      checked: false
    },
    {
      name: "Intel Core i7",
      checked: false
    }
  ];
  ramList: any[] = [
    {
      name: "4",
      checked: false
    },
    {
      name: "6-8",
      checked: false
    },
    {
      name: "10-12",
      checked: false
    },
    {
      name: "16-24",
      checked: false
    },
    {
      name: "32 and more",
      checked: false
    }
  ];
  gpuList: any[] = [
    {
      name: "GeForce GTX 1050",
      checked: false
    },
    {
      name: "GeForce GTX 1660",
      checked: false
    },
    {
      name: "GeForce MX110",
      checked: false
    },
    {
      name: "GeForce MX230",
      checked: false
    },
    {
      name: "GeForce RTX 2060",
      checked: false
    },
    {
      name: "Radeon 500",
      checked: false
    },
    {
      name: "Radeon R5",
      checked: false
    },
    {
      name: "Radeon R7",
      checked: false
    }
  ];
  osList: any[] = [
    {
      name: "Windows",
      checked: false
    },
    {
      name: "Android",
      checked: false
    },
    {
      name: "Mac OS",
      checked: false
    },
    {
      name: "None",
      checked: false
    }
  ];
  hddList: any[] = [
    {
      name: "128Gb",
      checked: false
    },
    {
      name: "256Gb",
      checked: false
    },
    {
      name: "512Gb",
      checked: false
    },
    {
      name: "1T",
      checked: false
    },
    {
      name: "2T",
      checked: false
    }
  ];
  subscription: Subscription;
  priceFrom: number;
  priceTo: number;
  showCpuListFilters: boolean = true;
  showGpuListFilters: boolean = true;
  showRamListFilters: boolean = true;
  showBrandListFilters: boolean = true;
  showOsListFilters: boolean = true;
  showHddListFilters: boolean = true;
  constructor(private messageService: MessageService) {
    this.subscription = this.messageService
      .getFilterToClear()
      .subscribe(message => {
        if (message) {
          if (message == "all") {
            this.resetAllLists();
          } else {
            const [filterArray, name] = message.split(":");
            if (filterArray == "brand") {
              this.brandList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            } else if (filterArray == "cpu") {
              this.cpuList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            } else if (filterArray == "ram") {
              this.ramList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            } else if (filterArray == "price") {
              this.priceFrom = null;
              this.priceTo = null;
            } else if (filterArray == "gpu") {
              this.gpuList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            } else if (filterArray == "os") {
              this.osList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            } else if (filterArray == "hdd") {
              this.hddList.forEach(item => {
                if (item.name == name) item.checked = false;
              });
            }
          }
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSetFilter(filter: string) {
    this.messageService.sendFilter(filter);
  }

  resetAllLists() {
    this.brandList.forEach(item => (item.checked = false));
    this.cpuList.forEach(item => (item.checked = false));
    this.ramList.forEach(item => (item.checked = false));
    this.gpuList.forEach(item => (item.checked = false));
    this.osList.forEach(item => (item.checked = false));
    this.hddList.forEach(item => (item.checked = false));
    this.priceFrom = null;
    this.priceTo = null;
  }

  setPriceRange() {
    this.onSetFilter(`price:${this.priceFrom || 0}-${this.priceTo || 100000}`);
  }
}
