import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Employee } from 'src/app/core/interfaces/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent implements OnInit {
  @Input() dataFromParent: any;
  public header: string;
  public employeeForm: FormGroup;
  public isEdit: boolean;

  public employeeData: Employee | undefined;

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private notification: NotificationService
  ) {
    if(!this.data.edit) {
      this.header = 'Add Airport';
      this.isEdit = false;
      this.employeeForm = this.formBuilder.group({
        employeeName: ['',
          {
            validators: [Validators.required]
          }
        ],
        employeeEmail: ['',
          {
            validators: [Validators.email]
          }
        ],
        employeePhone: ['',
          {
            validators: [Validators.required]
          }
        ],
        employeeAge: ['',
          {
            validators: [Validators.required]
          }
        ]
      });
    } else {
      this.header = 'Edit Airport';
      this.isEdit = true;
      this.employeeData = {
        id: this.data.id,
        employeeName: this.data.employeeName,
        employeeEmail: this.data.employeeEmail,
        employeePhone: this.data.employeePhone,
        employeeAge: this.data.employeeAge
      };
      this.employeeForm = this.formBuilder.group({
        employeeName: [this.employeeData.employeeName,
          {
            validators: [Validators.required]
          }
        ],
        employeeEmail: [this.employeeData.employeeEmail,
          {
            validators: [Validators.email]
          }
        ],
        employeePhone: [this.employeeData.employeePhone,
          {
            validators: [Validators.required]
          }
        ],
        employeeAge: [this.employeeData.employeeAge,
          {
            validators: [Validators.required]
          }
        ]
      });
    }
  }

  ngOnInit(): void {}


  onSubmit() {

    if(!this.data.edit) {

      let employeeData:Employee = {
        employeeName: this.employeeForm.get('employeeName')?.value,
        employeeEmail: this.employeeForm.get('employeeEmail')?.value,
        employeePhone: this.employeeForm.get('employeePhone')?.value,
        employeeAge: this.employeeForm.get('employeeAge')?.value
      };

      if(this.employeeForm.valid) {
        this.employeeService.addEmployee(employeeData).subscribe({
          next: (data) => {
            if(data.success) {
              this.notification.openSnackBar(data.message);
              this.dialogRef.close({save: true});
            } else {
              this.notification.openSnackBar(data.message);
            }
          }
        });
      }


    } else {
      let employeeData:Employee = {
        id: this.employeeData?.id,
        employeeName: this.employeeForm.get('employeeName')?.value,
        employeeEmail: this.employeeForm.get('employeeEmail')?.value,
        employeePhone: this.employeeForm.get('employeePhone')?.value,
        employeeAge: this.employeeForm.get('employeeAge')?.value
      };

      if(this.employeeForm.valid) {
        this.employeeService.updateEmployee(employeeData).subscribe({
          next: (data) => {
            if(data.success) {
              this.notification.openSnackBar(data.message);
              this.dialogRef.close({save: true});
            } else {
              this.notification.openSnackBar(data.message);
            }
          }
        });
      }
    }
  }

  getErrors(field: string): any {
    if(this.employeeForm.get(field)?.hasError('required')){
      return 'Please enter some value';
    }else if(this.employeeForm.get(field)?.hasError('email')){
      return 'Please enter a valid email id';
    }
    return null;
  }
}
