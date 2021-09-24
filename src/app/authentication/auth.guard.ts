import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { HelperService } from '../services/helper.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  users
  constructor(private helper : HelperService, private router: Router, private authService: AuthService){}
  
  //getting users
  async getUsers(){
    var response = await this.helper.getJsonData().toPromise();
    this.users = response['users'];
  }
  
  async canActivate() {
    //wait until users has been subscribed
    await this.getUsers();
    let id = localStorage.getItem('userId')
    let user = {}
    if(id == null || id == undefined){
      //if not send them back to home
      this.router.navigate(['/home']);
      return false;
    }
    this.helper.getUser(id).subscribe(response => {
      user = response;
    });
    
    return true;
    
    }
  }
  

