import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EvaluatedialogComponent } from 'src/app/dialog/evaluatedialog/evaluatedialog.component';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {

  Assignments:any[] | undefined;
  trainername: any;
  courseName:any;

  constructor(
    private dialog: MatDialog,
    private AssessmentService: AssessmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.trainername = localStorage.getItem('username');
    this.courseName = localStorage.getItem('courseName');

    this.AssessmentService.getAssignments()
    .subscribe((data)=>{
      this.Assignments = JSON.parse(JSON.stringify(data)); 
    });
  }


  // Promote User Dialog
 openEvaluateDialog(Assignment:any): void {
  localStorage.setItem("evaluateId", Assignment._id.toString());
  let dialogRef = this.dialog.open(EvaluatedialogComponent, { disableClose: true });
  height :'40%'
  width : '60%'
}

}
