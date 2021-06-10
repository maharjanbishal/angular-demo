import {Component, OnInit} from '@angular/core';
import {InfostorageService} from "../dashboard/services/infostorage.service";
import {Employee} from "../dashboard/model/employee";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashItems: Employee[] = [];

  constructor(private infoStorage: InfostorageService) {
  }

  ngOnInit(): void {
    this.fetchTrashItems();
  }

  fetchTrashItems(){
    this.infoStorage.getItems().subscribe((response: Employee[]) => {
      console.log(response)
      this.trashItems = response;
    }, (err) => console.error(err));
  }

  clearAll() {
    this.infoStorage.clearAll();
    this.fetchTrashItems();
  }
}
