import {Component, OnInit} from '@angular/core';
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

  constructor(private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.toastService.currentMessage.subscribe(message => {
      this.toastMessage = message;
      if(message){
        this.showToast();
      }
    });
  }

  showToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
      return new Toast(toastEl);
    });
    toastList.forEach(toast => toast.show());

  }
}
