import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
private APIURL: string = "http://localhost:8082/api/v1/product"
  constructor(private http: HttpClient){}
  getById(id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    return this.http.get(this.APIURL,httpOptions);
  }

}
