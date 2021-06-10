import {NgModule} from '@angular/core';
import {TrashComponent} from "./trash.component";
import {SharedModule} from "../shared/shared.module";
import {TrashRoutingModule} from "./trash-routing-module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    TrashComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrashRoutingModule,
  ]
})
export class TrashModule {
}
