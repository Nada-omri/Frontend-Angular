import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Product } from '../shared/models/product';
import { BuyerOrder } from '../shared/models/BuyerOrder';
import { OrderItem } from '../shared/models/OrderItem';
import { SellerOrder } from '../shared/models/SellerOrder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_URLS } from "../config/api.url.config";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private buyerOrder:BuyerOrder={sellerOrders:[],totalAmount:0,date:new Date(),status:"PENDING"}
  constructor(private http:HttpClient){
    let storedOrder=localStorage.getItem("cart")
    if(storedOrder){
      this.buyerOrder=JSON.parse(storedOrder)
    }
    console.log(this.buyerOrder)
  }
  addOrders():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    this.buyerOrder.totalAmount=this.totalPrice()
    this.buyerOrder.date=new Date()

       return this.http.post(API_URLS.ORDER_URL,this.buyerOrder,httpOptions );
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.buyerOrder));
    console.log(localStorage.getItem("cart"))
  }

  addToCart(orderItem: OrderItem): void {
    let sellerFound=false
    if(this.buyerOrder.sellerOrders){
      for(let sellerOrder of this.buyerOrder.sellerOrders!){
        let orderFound=false
        if(orderItem.product?.seller?.id==sellerOrder.seller?.id){
          sellerFound=true
          for(let item of sellerOrder.orderItems!){
            if(item.product?.id==orderItem.product?.id){
              item.quantity!++
              orderFound=true
            }
          }
          if(!orderFound){
            sellerOrder.orderItems?.push(orderItem)
          }
        }
      }
    }

    const sellerOrder:SellerOrder={
      orderItems:[orderItem],
      seller:{id:orderItem.product?.seller?.id},
      totalAmount:orderItem.product?.price!*orderItem.quantity!,
      status:"PENDING"
    }
    if(!sellerFound){
      this.buyerOrder.sellerOrders?.push(sellerOrder);
    }


    this.saveCart();
  }

  removeFromCart(productId: number): void {
    for(let sellerOrder of this.buyerOrder.sellerOrders!){
      sellerOrder.orderItems=sellerOrder.orderItems?.filter((orderItem)=>{
        return orderItem.product!.id!=productId
      })
    }
  }

  getCart(): OrderItem[] {
    let orderItems:OrderItem[]=[]
    console.log(this.buyerOrder.sellerOrders?.length)
    for(let sellerOrder of this.buyerOrder.sellerOrders!){
      console.log(sellerOrder)
      for(let orderItem of sellerOrder.orderItems!){
        console.log(orderItem)
        orderItems.push(orderItem)
      }
    }
    
    return orderItems ;
  }
  totalPrice(){
    let orderItems=this.getCart()
    let totalAmount=0
  for(let orderItem of orderItems){
    totalAmount+= orderItem.product?.price!*orderItem.quantity!
  }
  return totalAmount
  }
  
  updateOrderItem(productId:number,quantity:number){
    for(let sellerOrder of this.buyerOrder.sellerOrders!){
      for(let orderItem of sellerOrder.orderItems!){
        if(orderItem.product?.id==productId){
          console.log("found")
          orderItem.quantity=quantity
          this.saveCart();
          return
        }

      }
    }
  }

  
}
