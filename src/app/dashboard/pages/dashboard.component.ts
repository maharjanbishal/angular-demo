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
  loading: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.loading = true;
    this.api.get().subscribe((data) => {
      this.loading = false;
      this.employees = data;
    }, (error => console.error(error)))
  }

}
