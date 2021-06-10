import { NgModule } from '@angular/core';
import {DashboardComponent} from "./pages/dashboard.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
