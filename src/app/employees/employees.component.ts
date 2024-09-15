import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employees } from '../Employees';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit{

  UpdateEmployee: Employees=new Employees();
  employees:any;
  baseUrl="http://localhost:8080/api/employees"
  constructor(private http:HttpClient,
    private sharedService: SharedService,
    private route:Router
  ){}
  employe:any;
  ngOnInit(): void {
   this.getAllEmployee();
  }
  getAllEmployee(){
    let response= this.http.get(this.baseUrl);
    response.subscribe((data)=>this.employees=data);
  }
  id?:number;
  name?:string;
  email?:string;
  salary?:number;


 update(id:number){
  this.employe=this.employees.find((i:any)=>{ return i.id=== id});
  this.id=id;
  this.name=this.employe.name;3
  this.email=this.employe.email;
  this.salary=this.employe.salary;

  this.sharedService.changeArray(this.employe);
  this.route.navigateByUrl("/AddEmployees");
  console.log(this.employe); 
  // this.http.put(this.baseUrl,id,this.employees).subscribe();
 }
 onUpdate(){
  this.UpdateEmployee.name=this.name;
  this.UpdateEmployee.email=this.email;
  this.UpdateEmployee.salary=this.salary;
  console.log(this.UpdateEmployee);
  this.http.put(this.baseUrl+"/"+this.id, this.UpdateEmployee).subscribe();
 }
 Delete(id?:number){
  this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' })
  .subscribe(
    response => {
      console.log(response);
      this.getAllEmployee(); // Will log: "Employee Deleted Successfully!."
    },
    error => {
      console.error('Error deleting employee:', error);
    }
  );

 }

}
