import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Employee} from "../model/employee";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.api.get().subscribe((data) => {
      console.log(data);
      this.employees = data;
    }, (error => console.error(error)))
  }

}
