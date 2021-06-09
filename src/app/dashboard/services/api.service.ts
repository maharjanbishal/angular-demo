import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {catchError, map, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.server_url;

  constructor(private http: HttpClient) {
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
          return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError(this.errorHandler)
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
          return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError(this.errorHandler)
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
        return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError(this.errorHandler)
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
        return response.data
        // else
        //   return throwError(response.message || "server error.");
      }),
      catchError(this.errorHandler)
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
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }


}
