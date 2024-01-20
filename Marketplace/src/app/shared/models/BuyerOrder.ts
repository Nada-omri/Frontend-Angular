import { Account } from "./Account";
import { SellerOrder } from "./SellerOrder";

export interface BuyerOrder{
    id?: number,
    totalAmount?: number;
    status?: string;
    date?: Date;
    sellerOrders?:SellerOrder[],
    buyer?:Account,
}