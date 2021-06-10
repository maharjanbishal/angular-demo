import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Toast} from "bootstrap";
import {ToastService} from "./modules/shared/services/toast/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'treeleaf';
  toastMessage: any = {
    title: '',
    message: '',
    type: ''
  };
  // @ts-ignore
  @ViewChild('toast') toast: ElementRef;


  constructor(private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.toastService.currentMessage.subscribe(message => {
      this.toastMessage = message;
      if (message) {
        this.showToast();
      }
    });
  }

  showToast() {
    // new Toast(this.toast.nativeElement).show()
  }
}
