import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server_address= "api";
//server_address= "http://localhost:3000";

  authtoken: any;
  user: any;
  role: any;
  username:any;
  id:any;
  email:any;
  Name:any;

  constructor(private http:HttpClient) { }

  registerUser(user: any) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/users/create`, user, {
      headers
    })
  }
  

  authenticateUser(user:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/users/authenticate`, user, {
      headers
    })
  }

  storeUserData(token:any, user:any, role:any, username:any,id:any,Name:any,email:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    localStorage.setItem('courseName', user.Name)
    this.id = id;
    this.authtoken  = token;
    this.user = user;
    this.role = role;
    this.email = email;
    this.username = username;
    this.Name = Name;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }

  loggedIn()
  {
    return !!localStorage.getItem('id_token')
  }

  // checking if user is superAdmin
  Admin(){
    const role =  localStorage.getItem('role')
    if('Admin' == role){
      return true;
    }
  }

  // checking if user is superAdmin
  Trainer(){
    const role =  localStorage.getItem('role')
    if('Trainer' == role){
      return true;
    }
  }

  logout(){
    localStorage.clear();
  }


}
