import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, 
  ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // AuthGuard will be checking this value to decide whether the logged in user is verfied or not
  autherized = false
  loggedUser
  users 
  async getUsers(){
    var response = await this.helper.getJsonData().toPromise();
    this.users = response['users'];
  }

  async authenticate(form){
    await this.getUsers()
    let value = false
    this.users.forEach(data=>{
      let user = data['login'];
      // check if user exists
      if(user.username == form.username){
        // check if the password is right
        if(user.password == form.password){
          
          value = true
          //this.setLoggedUser(user)
          // sending data to my localStorage
          localStorage.setItem('username',user.username)
          localStorage.setItem('userId', data.id)
          this.loggedUser = data;
        }
        // if the password is wrong
        else if(user.password != form.password){
          value = false;
        }
      }
      
    })
    return value

  }
  
  constructor(private helper : HelperService, private http : HttpClient) { }
}
