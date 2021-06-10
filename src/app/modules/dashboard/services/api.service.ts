import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import {catchError, map, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Employee} from "../model/employee";
import {ToastService} from "../../shared/services/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.server_url;

  constructor(private http: HttpClient, private toastService: ToastService) {
  }

  get(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`, {
      headers: {
        "Access-Control-Allow-Origin": '*'
      }
    }).pipe(
      retry(3),
      map((response: any) => {
        // if (response.success === "success")
        this.toastService.changeMessage({
          message: response.message,
          title: 'Fetch',
          type: 'success'
        });
          return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError((err)=>this.errorHandler(err, this.toastService))
    )
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": '*'
      }
    }).pipe(
      retry(3),
      map((response: any) => {
        // if (response.success === "success")
        this.toastService.changeMessage({
          message: response.message,
          title: 'Delete',
          type: 'success'
        });
          return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError((err)=>this.errorHandler(err, this.toastService))
    )
  }

  post(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/create`, employee,{
      headers: {
        "Access-Control-Allow-Origin": '*'
      }
    }).pipe(
      map((response: any) => {
        // if (response.success === "success")
        this.toastService.changeMessage({
          message: response.message,
          title: 'Save',
          type: 'success'
        });

        return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError((err)=>this.errorHandler(err, this.toastService))
    )
  }

  put(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update/${employee.id}`, employee,{
      headers: {
        "Access-Control-Allow-Origin": '*'
      }
    }).pipe(
      map((response: any) => {
        // if (response.success === "success")
        this.toastService.changeMessage({
          message: response.message,
          title: 'Update',
          type: 'success'
        });
        return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError((err)=>this.errorHandler(err, this.toastService))
    )
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employee/${id}`,{
      headers: {
        "Access-Control-Allow-Origin": '*'
      }
    }).pipe(
      retry(3),
      map((response: any) => {
        // if (response.success === "success")
        return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError((err)=>this.errorHandler(err, this.toastService))
    )
  }

  errorHandler(error: HttpErrorResponse, toastService: ToastService) {
    toastService.changeMessage({
      message: error.message || "server error.",
      title: 'Error',
      type: 'error'
    });
    return throwError(error.message || "server error.");
  }


}
