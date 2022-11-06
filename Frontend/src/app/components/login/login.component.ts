import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private toastr: ToastrService,
    private ValidateService: ValidateService,
    private AuthService: AuthService,
    private Router: Router

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
          this.AuthService.storeUserData(data.token, data.user, data.role, data.username, data.id);
          this.toastr.success('Login Successful');
          console.log('success');
          
          this.Router.navigate(['']);
        }
        else{
          this.toastr.error(data.msg);
          this.Router.navigate(['']);
        }
        
      }
    );
    
 }

}
