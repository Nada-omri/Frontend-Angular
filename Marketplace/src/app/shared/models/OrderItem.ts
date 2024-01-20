import { SellerOrder } from "./SellerOrder";
import { Product } from "./product";

export interface OrderItem{
    id?:number,
    quantity?:number,
    product?:Product,
    order?:SellerOrder,
    rating?:number
}