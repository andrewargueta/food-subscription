import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private helper : HelperService, private router:Router) { }
  userCart
  cartTotal = 0
  clearCart(){
    this.helper.userCart = "";
    localStorage["cart"] = "";
    window.location.reload();

  }
  postOrder(){
    //post to order url
   
    for (var val of this.helper.userCart.split("\n")) {
      console.log(val); 
    }
  }
  removeOrder(i){
    this.userCart.splice(i, 1);
    this.helper.userCart = "";
    this.cartTotal = 0
    for(var order of this.userCart){
      this.helper.userCart += (JSON.stringify(order) +"\n");
      localStorage['cart'] = this.helper.userCart;    
      this.cartTotal += (order.servings * order.price);
    }


  }
  ngOnInit(): void {
    var orders =   this.helper.userCart.split("\n");
    this.userCart = []
    for(var order of orders){
      if(order)
        this.userCart.push(JSON.parse(order));
    }
    for(var dish of this.userCart){
      this.cartTotal += (dish.servings * dish.price);
    }

  }

}
