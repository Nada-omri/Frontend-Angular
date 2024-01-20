import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { AccountService } from '../services/accounts/account.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authenticated :any
showMe :boolean =true
constructor(private accountService: AccountService){}

ngOnInit() {
  this.authenticated=localStorage.getItem("token")!=null
  this.accountService.getAuthenticated().subscribe((authenticated) => {
    this.authenticated = authenticated;
  });
}
toogleTag(){
  this.showMe =!this.showMe;
}
logout() {
  // Clear token from local storage
  localStorage.removeItem('token');
  
  // Update authenticated state
  this.accountService.setAuthenticated(false);
}
}
