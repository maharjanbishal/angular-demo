import {Injectable} from '@angular/core';
import {Employee} from "../model/employee";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfostorageService {
  trashItems: Employee[] = [];

  constructor() {
    this.getItems();
  }

  addToTrash(employee: Employee) {
    this.trashItems.push(employee);
    localStorage.setItem('trash-items', JSON.stringify(this.trashItems))
  }

  getItems(): Observable<Employee[]> {
    const items: string | null = localStorage.getItem('trash-items');
    if (items) {
      this.trashItems = JSON.parse(items);
      return of(JSON.parse(items));
    }
    return of<Employee[]>([]);
  }

  clearAll() {
    this.trashItems = [];
    window.alert("Cleared all data from trash.")
    return localStorage.clear();
  }
}
