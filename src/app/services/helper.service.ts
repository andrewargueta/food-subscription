import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  url = "../assets/db.json";
  users
  userCart:string = (localStorage['cart'] == undefined) ? "" : localStorage['cart'];
  getJsonData(){
    return this.http.get(this.url);
  }
  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }
  getMeals(){
    return this.http.get('http://localhost:3000/weeklyMenu');
  }
  getUser(id){
    if(id != undefined || id != null){
      return this.http.get('http://localhost:3000/users/'+id);
    }
    else{
      return this.http.get('http://localhost:3000/users/');
    }
  }
  getOrders(){
    return this.http.get('http://localhost:3000/orders/');
  }
  
  constructor(private http : HttpClient) { }
}
