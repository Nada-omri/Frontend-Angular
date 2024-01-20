import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import{Observable} from 'rxjs';
import { API_URLS } from "../config/api.url.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Make sure it's provided at the root level
})
export class FileService{
    
    constructor(private http:HttpClient){
        
    }
    upload(formData:FormData):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ localStorage.getItem("token")
        }
        )
      };
        return this.http.post<string[]>(API_URLS.PRODUIT_URL ,formData,httpOptions);
    }


download(filename: string): Observable<Blob> {
  const options = {
    reportProgress: true,
    responseType: 'blob' as 'json',  
  };

  return this.http.get(API_URLS.PRODUIT_URL + "/download/" + `${filename}`, options) as Observable<Blob>;
}

}