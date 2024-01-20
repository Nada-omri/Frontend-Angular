
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http"
import { Account } from '../shared/models/Account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private account: Account={}
  private subject = new Subject<Account>()
  private APIURL: string = "http://localhost:8080/api/v1/account"
  constructor(private http: HttpClient){}
  login(email:string,password:string):Observable<Account>{
    return this.http.post(this.APIURL+"/login/email",{email:email,password:password})
  }
  signup(account:Account):Observable<Account>{
    return this.http.post(this.APIURL+"/signup",account)
  }
}

