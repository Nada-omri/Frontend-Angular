import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/models/product';
import { CartService } from '../services/shppingCart.service';

import { API_URLS } from '../config/api.url.config';
import { BuyerOrder } from '../shared/models/BuyerOrder';
import { OrderItem } from '../shared/models/OrderItem';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css'],
})
export class ShoppingCardComponent implements OnInit {
  orderItems!:OrderItem[]

  Url:string =API_URLS.IMAGE_URL;
  constructor(private cartService: CartService) {
   ;
  }

  ngOnInit(): void {
    this.setCart();
  }

removeFromCart(orderItem: OrderItem) {
    const productId = orderItem.product?.id;
    if (productId) {
      this.cartService.removeFromCart(productId);
      this.setCart();
    }
} 
changeQuantity(orderItem: OrderItem,event:any){
  orderItem.quantity=event.target.value
  this.cartService.updateOrderItem(orderItem.product?.id!,orderItem.quantity!)
}
addOrder(){
  this.cartService.addOrders().subscribe(()=>{
    console.log("done")
  })
}

totalPrice() {
  let totalAmount=0
  for(let orderItem of this.orderItems){
    totalAmount+= orderItem.product?.price!*orderItem.quantity!
  }
  return totalAmount
}

  setCart() {
    this.orderItems = this.cartService.getCart();
    console.log(this.orderItems)
  }

 
}  




