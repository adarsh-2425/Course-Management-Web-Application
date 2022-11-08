import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  assessment = {

  }

   //server_address= "api";
   server_address= "http://localhost:3000";

  constructor(
    private http:HttpClient
  ) { }

// Post Assignment
  postAssignment(Assignment:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/assessments/create`, Assignment,{
      headers
    })
  }

  // Read Assignment
  getAssignments(){
    return this.http.get(`${this.server_address}/assessments/read`);
  }

  // Read Each Assignment by id
  getAssignment(id:any){
    return this.http.get(`${this.server_address}/assessments/geteach/`+id)
  }

  // Read Each Assignment by username
  getAssignmentByUsername(username:any){
    return this.http.get(`${this.server_address}/assessments/geteachbyusername/`+username)
  }

  // Update Assignment with Marks
  updateAssignment(Assignments:any){
    return this.http.put(`${this.server_address}/assessments/update`,Assignments)
    .subscribe(data => {
      console.log(data);  
    })
  }

}
