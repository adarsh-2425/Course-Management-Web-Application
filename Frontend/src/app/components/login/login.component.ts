import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { RegisterdialogComponent } from 'src/app/dialog/registerdialog/registerdialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Images
  loginDivUrl="https://source.unsplash.com/-4qhiC6RmQw";
  
  email:string = '';
  password:string = '';
  role:any;

  constructor(
    private toastr: ToastrService,
    private ValidateService: ValidateService,
    private AuthService: AuthService,
    private Router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    
    const user = {
      email: this.email,
      password: this.password
    }

    if(!this.ValidateService.validateEmail(user.email)){
      this.toastr.error('Please enter valid email');
      return false;
    }

    if(!this.ValidateService.validateLogin(user)){
      this.toastr.error('Please Fill in all fields');
      return false;
    }

    this.AuthService.authenticateUser(user)
    .subscribe(
      data => {
        if(data.success){
          this.AuthService.storeUserData(data.token, data.user, data.email, data.role, data.username, data.id, data.courseName);
          this.toastr.success('Login Successful');
         // console.log(JSON.parse(JSON.stringify(data.role)));
          const role = localStorage.getItem('role');
          console.log(role);
          
          
          if('Admin' == role){
            this.Router.navigate(['/admindashboard']);
          }
          else if('Trainer' == role){
            this.Router.navigate(['/trainerdashboard']);
          }
          else{
            this.Router.navigate(['/studentdashboard']);
          }
        }
        else{
          this.toastr.error(data.msg);
        }
        
      }
    );
    
 }

 // Promote User Dialog
 openRegisterDialog(): void {
  let dialogRef = this.dialog.open(RegisterdialogComponent, { disableClose: true });
  height :'40%'
  width : '60%'
    
    

}

}
