import { HttpClient, HttpParams,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URLS } from "../config/api.url.config";
import { Product } from "../shared/models/product";
import { FormGroup } from "@angular/forms";

@Injectable()
export class produitService {
  public dataForm!:  FormGroup; 
  constructor(private http: HttpClient) {}
  
  getProduits(): Observable<any> {
    return this.http.get(API_URLS.PRODUIT_URL);
  }
  getProductById(id:number):Observable<any>{
    return this.http.get(API_URLS.PRODUIT_URL + `/${id}`,);
  }

  addProduit(produit: Product): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    return this.http.post(API_URLS.PRODUIT_URL, produit,httpOptions);

  }
  createData(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }),
      reportProgress: true // Enable progress reporting
    };
    return this.http.post(API_URLS.PRODUIT_URL, formData, httpOptions);
  }
  updateProduit(produit: Product): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    const params = new HttpParams().set('name',produit?.name!).set('description',produit.description!).set('price',produit.price!)
    .set('quantity',produit.quantity!).set('categoryId',produit.category?.id!).set('brandId',produit.brand?.id!);
    return this.http.put(API_URLS.PRODUIT_URL+ `/${produit.id}`, params,httpOptions);
  }

  deleteProduit(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    return this.http.delete(API_URLS.PRODUIT_URL + `/${id}`,httpOptions);
  }

  searchProduitByMarque(marque: string): Observable<any> {
    const params = new HttpParams().set("marque", marque);
    return this.http.get(API_URLS.PRODUIT_URL + "/search/marque?marque=", { params });
  }
}
