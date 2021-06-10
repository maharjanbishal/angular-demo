import {Injectable} from '@angular/core';
import {Employee} from "../model/employee";
import {Observable, of} from "rxjs";
import {ToastService} from "../../util/services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class InfostorageService {
  trashItems: Employee[] = [];

  constructor(private toastService: ToastService) {
    this.getItems();
  }

  addToTrash(employee: Employee) {
    this.trashItems.push(employee);
    localStorage.setItem('trash-items', JSON.stringify(this.trashItems))
    this.toastService.changeMessage({
      message: 'Added to Trash',
      title: 'Remove',
      type: 'success'
    });
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
    this.toastService.changeMessage({
      message: 'Clear All Trash',
      title: 'Clear All',
      type: 'success'
    });
    localStorage.clear();
  }
}
