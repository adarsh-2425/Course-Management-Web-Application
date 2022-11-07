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
  link:any;
  module:any;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private AssessmentService: AssessmentService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  onAssignmentSubmit(){
    const Assignment = {
      username: this.username,
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
