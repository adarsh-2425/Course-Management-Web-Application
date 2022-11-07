import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EvaluatedialogComponent } from 'src/app/dialog/evaluatedialog/evaluatedialog.component';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  // Promote User Dialog
 openEvaluateDialog(): void {
  let dialogRef = this.dialog.open(EvaluatedialogComponent, { disableClose: true });
  height :'40%'
  width : '60%'
}

}
