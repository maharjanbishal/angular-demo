import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastDetails: any = null;
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.toastDetails);
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

}
