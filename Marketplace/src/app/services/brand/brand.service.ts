import { HttpClient, HttpParams,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URLS } from "src/app/config/api.url.config";
@Injectable()
export class BrandService{
    constructor(private http: HttpClient) {}
    getAllbrands():Observable<any>{
        return this.http.get(API_URLS.BRAND_URL);
    }
}