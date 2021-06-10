import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  @Output() refetch: EventEmitter<any> = new EventEmitter<any>();
  employeeFormGroup: FormGroup = new FormGroup({
    employee_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    employee_salary: new FormControl('', [Validators.required, Validators.min(10000)]),
    employee_age: new FormControl('', [Validators.required, Validators.min(20), Validators.max(80)]),
    profile_image: new FormControl('')
  })
  isUpdate: boolean = false;
  id: string | null = null;
  isfetching: boolean = false;
  loading: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.isfetching = true;
        this.employeeFormGroup.disable();
        api.findById(parseInt(this.id)).subscribe((employee: Employee) => {
          this.setFormValue(employee);
          this.isUpdate = true;
          this.isfetching = false;
          this.employeeFormGroup.enable();
        }, (error => {
          console.error(error);
          this.isUpdate = false
          this.employeeFormGroup.enable();
          this.isfetching = false;
        }))
      } else {
        this.isUpdate = false;
      }
    });
  }

  setFormValue({
                 employee_name,
                 employee_salary,
                 employee_age,
                 profile_image
               }: Employee) {
    this.employeeFormGroup.controls['employee_name'].setValue(employee_name)
    this.employeeFormGroup.controls['employee_salary'].setValue(employee_salary)
    this.employeeFormGroup.controls['employee_age'].setValue(employee_age)
    this.employeeFormGroup.controls['profile_image'].setValue(profile_image)
  }

  get employee_name() {
    return this.employeeFormGroup.get('employee_name');
  }

  get employee_salary() {
    return this.employeeFormGroup.get('employee_salary');
  }

  get employee_age() {
    return this.employeeFormGroup.get('employee_age');
  }

  get profile_image() {
    return this.employeeFormGroup.get('profile_image');
  }

  resetForm() {
    this.employeeFormGroup.reset();
  }

  submitEmployeeData() {
    this.loading = true;
    this.employeeFormGroup.disable();
    if (this.isUpdate && this.id) {
      this.api.put({...this.employeeFormGroup.value, 'id': parseInt(this.id)}).subscribe((response) => {
        window.alert("Successfully Updated!");
        this.loading = false;
        this.resetForm();
        this.employeeFormGroup.enable();
        this.refetch.emit();
      }, (error) => {
        console.log(error)
        this.loading = false;
        this.employeeFormGroup.enable();
      });
    } else {
      this.api.post(this.employeeFormGroup.value).subscribe((response) => {
        this.loading = false;
        this.resetForm();
        this.employeeFormGroup.enable();
        window.alert("Successfully saved!");
        this.refetch.emit();
      }, (error) => {
        this.loading = false;
        console.log(error)
        this.employeeFormGroup.enable();
      });
    }

  };
}
