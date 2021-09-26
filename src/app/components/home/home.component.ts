import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WeeklyMenu } from 'src/app/models/weekly-menu.model';
import { HttpClient } from '@angular/common/http';
import { filter } from 'minimatch';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private helper : HelperService, private http : HttpClient) { }
  weeklyMeals
  user
  users
  filter=""
  filteredMeals
 
  quantity=0
  
  ngOnInit(): void {
    this.helper.getMeals().subscribe(data => {
      this.weeklyMeals = data;
    });
    let id = localStorage['userId'];
    if(id == undefined){
      this.user = undefined;
    }else{
      this.helper.getUser(id).subscribe(data => {
        this.user = data;
      });
    }
  }

  filterIngredients(value){
    this.filter = value;
    this.filteredMeals =[];
    this.helper.getMeals().subscribe(data => {
      this.weeklyMeals = data;
      if(this.filter != ''){
        for (const meal of this.weeklyMeals) {
          if(meal.ingredients.includes(this.filter)){
            this.filteredMeals.push(meal);
          }
        }
        console.log(this.filteredMeals);
        this.weeklyMeals = this.filteredMeals;
      }
    });
  }

  updateCart(order,servings){
    order.servings = servings;
    this.helper.userCart += (JSON.stringify(order) +"\n");
    localStorage['cart'] = this.helper.userCart;    
  }

  resetFilter(){
    this.filter ='';
    this.helper.getMeals().subscribe(data => {
      this.weeklyMeals = data;
    });
  }

}
