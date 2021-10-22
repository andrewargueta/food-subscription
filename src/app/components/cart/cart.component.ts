import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private http:HttpClient, private helper : HelperService, private router:Router) { }
  userCart
  cartTotal = 0
  clearCart(){
    this.helper.userCart = "";
    localStorage["cart"] = "";
    window.location.reload();

  }
  postOrder(){
    //post to order url
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    var orders:any = []
    for(var order of this.userCart){
      orders.push({
        "order": order.dish,
        "total": order.servings * order.price,
        "servings" : order.servings
      })
    }
    var dish = {
      "dishes": orders,
      "datePlaced": new Date(),
      "status": "Placed",
      "userId": localStorage["userId"],
      "total": this.cartTotal
    }
    return this.http.post('http://localhost:3000/orders/', JSON.stringify(dish), httpOptions).subscribe(response => {
      this.helper.userCart = ""
      localStorage.setItem('cart',"")
      this.router.navigate(['/orders'])
      console.log("Order Placed!")
    });;
  }

  removeOrder(i){
    if(i== 0){
      this.userCart.length = [];
      this.helper.userCart = "";
      this.cartTotal = 0;
      localStorage['cart'] = this.helper.userCart;    
    }
    else{
      this.userCart.splice(i, 1);
      this.helper.userCart = "";
      this.cartTotal = 0
      for(var order of this.userCart){
        this.helper.userCart += (JSON.stringify(order) +"\n");
        localStorage['cart'] = this.helper.userCart;    
        this.cartTotal += (order.servings * order.price);
      }
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
