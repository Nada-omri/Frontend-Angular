import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URLS } from "../config/api.url.config";
import { Observable } from "rxjs";
import { BuyerOrder } from "../shared/models/BuyerOrder";
@Injectable()
export class OrderService{
    constructor(private http: HttpClient) {}
    getOrders(): Observable<any> {
        return this.http.get(API_URLS.ORDER_URL);
      }

}