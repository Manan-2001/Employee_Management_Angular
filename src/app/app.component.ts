import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeesComponent } from "./employees/employees.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, EmployeesComponent, AddEmployeeComponent, RouterLink]
})
export class AppComponent {
  title = 'EmployeeDetailsAngular';
}
