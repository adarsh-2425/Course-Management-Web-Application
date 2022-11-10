import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  username: any;
  studentEmail: any;
  link:any;
  module:any;
  courseName:any;

  Assignments:any[] | undefined;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private AssessmentService: AssessmentService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.studentEmail = localStorage.getItem('email');
    this.courseName = localStorage.getItem('courseName');
    this.AssessmentService.getAssignmentByUsername(this.username).subscribe((data)=>{
      this.Assignments = JSON.parse(JSON.stringify(data));
      console.log(this.Assignments);
      
     })
  }

  onAssignmentSubmit(){
    const Assignment = {
      username: this.username,
      studentEmail: this.studentEmail,
      courseName: this.courseName,
      link: this.link,
      module: this.module
    }
    console.log(Assignment);

    this.AssessmentService.postAssignment(Assignment).subscribe(
      data =>{
        if(data.success){
          this.toastr.success('Assignment is Successfully Submitted!');
          //this.router.navigate(['submitted assignments page']);
        }
        else{
          this.toastr.error("Assignment Cannot be Submitted At The Moment. Try Again later!")
        }
      }
    )
    
  }

}
