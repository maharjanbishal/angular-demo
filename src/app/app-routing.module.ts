import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/pages/dashboard.component";
import {TrashComponent} from "./trash/trash.component";
import {EmployeeFormComponent} from "./dashboard/components/employee-form/employee-form.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:id',
    component: EmployeeFormComponent
  },
  {
    path: 'trash',
    component: TrashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
