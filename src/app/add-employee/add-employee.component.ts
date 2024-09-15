import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from '../Employees';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent{
   constructor(
    private http:HttpClient,
    private route:Router,
    private sharedService:SharedService
   ){}
   recievedArray:any=[];
   isEdit=false;
   btnLabel="";
   isValidate=false;
   ngOnInit(){
  this.sharedService.currentArray.subscribe(array=> this.recievedArray=array);
 
    if (this.recievedArray.length===0) {
      this.btnLabel="ADD"
     
    }else{
      this.isEdit=true;
     this.btnLabel="UPDATE"
     console.log(this.recievedArray);
     this.populateEmployee(this.recievedArray); 
     
    }
   }

   employee:Employees= new Employees();

   baseUrl="http://localhost:8080/api/employees"

 

onSubmit() {
  if (this.isEdit==true) {
   
    this.updateEmployee();
  } else {
    this.postEmployee();
  }

}
updateEmployee() {
  let id = this.recievedArray.id;
this.employee.id=this.recievedArray.id;
  // Validate that all required fields are filled
  if (this.employee.name !== "" && this.employee.email !== "" && this.employee.salary !== undefined && this.employee.id !== undefined) {
    console.log('Updating employee with ID:', id);

    // Proceed with the PUT request to update the employee
    this.http.put(`${this.baseUrl}/${id}`, this.employee)
      .subscribe({
        next: (response) => {
          console.log('Employee updated successfully', response);
          this.isValidate = false;  // Reset validation flag on success
        this.route.navigate(['/Employees']);

        },
        error: (error) => {
          console.error('Error updating employee', error);
        }
      });
  } else {
    // Set validation flag to true if fields are missing
    this.isValidate = true;
    console.log('Please fill in all required fields');
  }
}

postEmployee() {
  // Validate that all required fields are filled
  if (this.employee.name !== "" && this.employee.email !== "" && this.employee.salary !== undefined) {
    this.isValidate = true;
    console.log(this.employee);

    // Proceed with the POST request
    this.http.post(this.baseUrl, this.employee).subscribe({
      next: (response) => {
        // Handle success
        console.log('Employee added successfully', response);
        this.route.navigate(['/Employees']);
      },
      error: (err) => {
        // Handle error
        console.error('Error adding employee', err);
      }
    });

    // Reset validation flag after processing
    this.isValidate = false;
  } else {
    // Handle the case where validation fails
    this.isValidate = true;
    console.log('Please fill in all required fields');
  }
}

populateEmployee(recievedArray:any) {
  this.employee.name=recievedArray.name;
  this.employee.email=recievedArray.email;
  this.employee.salary=recievedArray.salary;
}
emptyData(){
  this.employee.email="";
  this.employee.name="";
  this.employee.salary=undefined;
  this.employee.id=undefined;

}
}


