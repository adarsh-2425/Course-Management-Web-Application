import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-evaluatedialog',
  templateUrl: './evaluatedialog.component.html',
  styleUrls: ['./evaluatedialog.component.css']
})
export class EvaluatedialogComponent implements OnInit {

  Assignments = {
    Username: '',
    Link:'',
    mark:'',
    feedback:''
  }
  //this.Assignments.assessedBy = localStorage.getItem('username');

//trainer@gmail.com
//trainer@lol
  constructor(
    private AssessmentService: AssessmentService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<EvaluatedialogComponent>

  ) { }

  ngOnInit(): void {
    //const AssessedBy = localStorage.getItem('username');
    const evaluateId = localStorage.getItem('evaluateId');
    this.AssessmentService.getAssignment(evaluateId).subscribe((data)=>{
     this.Assignments = JSON.parse(JSON.stringify(data));
    })
  }

  evaluateAssignment(){
    
    this.AssessmentService.updateAssignment(this.Assignments);
    console.log(this.Assignments);
    this.dialogRef.close();
    // localStorage.removeItem("editContentId");
    this.toastr.success('Assignment Valuated');
    //this.router.navigate(['/dashboard']);
  }

}
