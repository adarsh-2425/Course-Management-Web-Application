import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateLogin(user:any){
    if(user.email == "" || user.password == "")
      return false;
      else{
        return true;
      }
  }

  validateEmail(email:any){
    const regex = /^([A-Za-z0-9\-._=&<>,+]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/;
    return regex.test(email);
  }

  validateRegister(user:any){
    if(user.firstName == "" || user.phone == "" ||user.email == "" || user.password == "")
      return false;
      else{
        return true;
      }
  } 

  repeatPassword(user:any){
    if(user.password === user.repeatPassword)
      return true;
      else{
        return false;
    }
  }

  validatePhone(phone:any){
    const regex = /^([0-9]{10})+$/
    return regex.test(phone);
  }

  validateName(name:any){
    if(name == ""){
      return false;
    }
    else{
      return true;
    }
  }  
  isPassword(password:any){
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  }
  ispstrong(password:any){
    return /^((?=.*[a-z])(?=.*[A-Z])(?=.*[10-15])(?=.*[^A-Za-z0-9])(?=.{11,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{11,}))$/.test(password);
  
  }
  ispmedium(password:any){
    return /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,10}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,10}))$/.test(password);
  }

  isPwdMatchCriteria(password:any){
    if((password.length)<8){
      return false;
    }
  }
}
