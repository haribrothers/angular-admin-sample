import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Employee } from '../interfaces/employee'
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly baseUrl = environment.apiUrl + '/employees';
  private employeesUpdated = new Subject<Employee[]>();

  private _employeeList: Employee[] = [];

  constructor(private http: HttpClient, private notification: NotificationService) { }

  getEmployees() {
    return this.http
    .get<{success:boolean, data: Employee[], message: string}>(this.baseUrl)
    .pipe(
      map((data) => {
        return {
          employees: data.data
        }
      })
    ).subscribe(
      {
        next: (transformedData) => {
          this._employeeList = transformedData.employees;
          this.employeesUpdated.next(this._employeeList);
        },
        error: () => {
          this.notification.openSnackBar("Unable to retrive records")
        }
      }

    );
  }

  getEmployeesUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  addEmployee(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateEmployee(data: any) {
    return this.http.patch<any>(this.baseUrl , data);
  }

  deleteEmployee(id: any) {
    return this.http.delete<any>(this.baseUrl + `/${id}`);
  }
}
