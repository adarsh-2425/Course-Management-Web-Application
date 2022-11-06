import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //server_address= "api";
  server_address= "http://localhost:3000";

  authtoken: any;
  user: any;
  role: any;
  username:any;
  id:any;

  constructor(private http:HttpClient) { }

  authenticateUser(user:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(`${this.server_address}/users/authenticate`, user, {
      headers
    })
  }

  storeUserData(token:any, user:any, role:any, username:any, id:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    this.id = id;
    this.authtoken  = token;
    this.user = user;
    this.role = role;
    this.username = username;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }


}
