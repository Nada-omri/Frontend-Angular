import { Account } from "./Account";
import { BuyerOrder } from "./BuyerOrder";
import { OrderItem } from "./OrderItem";

export interface SellerOrder  {
    id?: number;
    totalAmount?: number;
    status?: string;
    date?: Date;
    
    seller?: Account;
    orderItems?: OrderItem[];
    buyerOrder?:BuyerOrder
}