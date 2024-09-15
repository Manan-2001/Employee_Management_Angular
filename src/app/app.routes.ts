import { Routes } from '@angular/router';
import path from 'path';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
  {
    path:'',
    component:AddEmployeeComponent,
  },
  {
    path: 'AddEmployees',
    component: AddEmployeeComponent,
  },
  {
    path: 'Employees',
    component: EmployeesComponent,
  }
];
