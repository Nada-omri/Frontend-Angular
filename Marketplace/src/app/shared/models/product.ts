import { Account } from "./Account"
import { Brand } from "./Brand"
import { Category } from "./Category"

export interface Product{
    id?: number,
    name?:string,
    description?:string,

    price?:number,
    quantity?:number,
    rating?:number,
    numberRatings?:number,
    image?:string,
    category?:Category,
    brand?:Brand,
    seller?:Account
  


}