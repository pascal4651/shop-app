import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private subject = new Subject<any>();
  private subjectResponce = new Subject<any>();

  constructor() {}

  sendFilter(message: string) {
    this.subject.next(message);
  }

  clearMessages() {
    this.subject.next();
  }

  getFilter(): Observable<any> {
    return this.subject.asObservable();
  }

  sendFilterToClear(message: string) {
    this.subjectResponce.next(message);
  }

  getFilterToClear(): Observable<any> {
    return this.subjectResponce.asObservable();
  }
}
