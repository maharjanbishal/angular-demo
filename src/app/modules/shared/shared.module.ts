import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortPipe} from "./pipes/sort/sort.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortPipe
  ]
})
export class SharedModule {
}
