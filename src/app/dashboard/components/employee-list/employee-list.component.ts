import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Employee} from "../../model/employee";
import {ApiService} from "../../services/api.service";
import {InfostorageService} from "../../services/infostorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnChanges {

  @Input() employeeslist: Employee[] = [];
  trashItems: Employee[] = [];

  constructor(private api: ApiService, private infoStorage: InfostorageService, private router: Router) {
    this.fetchTrashItems();
  }

  fetchTrashItems() {
    this.infoStorage.getItems().subscribe((response: Employee[]) => {
      console.log(response)
      this.trashItems = response;
    }, (err) => console.error(err));
  }

  onRemove(emp: Employee) {
    this.api.remove(emp.id).subscribe(() => {
      window.alert(`Delete Successful`)
      this.employeeslist = this.employeeslist.filter(employee => employee.id !== emp.id);
      this.infoStorage.addToTrash(emp);
    }, (err) => console.error(err))
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentVal: any = changes.employeeslist.currentValue;
    // logic to filter data from deleted data from trash
    if (currentVal && currentVal.length > 0) {
      let trashIds = this.trashItems.map((titem: Employee) => titem.id)
      this.employeeslist = currentVal.filter((cv: Employee) => !trashIds.includes(cv.id))
    }
  }

  onEdit(emp: Employee) {
    this.router.navigate([`/dashboard/${emp.id}`])
  }
}