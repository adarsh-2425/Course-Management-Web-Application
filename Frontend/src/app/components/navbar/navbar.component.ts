import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this.toastr.warning('You are Logged out')
    this.router.navigate(['/login'])
     return false;
  };

}
