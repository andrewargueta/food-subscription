import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userOrders
  orders
  constructor(private helper : HelperService) { }

  ngOnInit(): void {
    this.helper.getOrders().subscribe(data => {
      this.userOrders = [];
      this.orders = data;
      let id = localStorage['userId'];
      for (const order of this.orders) {
        if(order.userId  ==  id){
          this.userOrders.push(order);
          }
        }
      
      console.log(this.userOrders);
      }
    )};

}
