import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private authenticated:boolean=localStorage.getItem("token")!=null
  private authenticatedSubject = new Subject<boolean>()
  private APIURL: string = "http://localhost:8082/api/v1/account"
  constructor(private http :HttpClient){}
  login(username:string,password:string):Observable<any>{
    return this.http.post(this.APIURL+"/token",{username:username,password:password})
  }
  setAuthenticated(authenticated:boolean){
    this.authenticated=authenticated
    this.authenticatedSubject.next(this.authenticated)
  }
  
  getAuthenticated():Observable<boolean>{
    return this.authenticatedSubject.asObservable()
  }
  signup(username:string,email:String,address:String,phone:String, password:string):Observable<any>{
    return this.http.post(this.APIURL+"/signup",{username:username,password:password,email:email,phoneNumber:phone,address:address})
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }
  logout() {
    this.authenticated = false;
    this.authenticatedSubject.next(false);
    localStorage.removeItem('token');

  }
}
