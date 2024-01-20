import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AccountService } from '../services/accounts/account.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private authenticated :boolean=false;
  signinForm: FormGroup;
  constructor(private fb: FormBuilder, private accountService:AccountService,private router:Router) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.authenticated = !!token; 
  }
  login(){

    this.accountService
      .login(this.signinForm
      .get('username')?.value,this.signinForm
      .get('password')?.value)
      .subscribe((res)=>{
        console.log(res.token);
        localStorage.setItem('token',res.token)
        localStorage.setItem('username',this.signinForm.get('username')?.value)
        this.accountService.setAuthenticated(true);
        this.router.navigate(['/'])
       
      },(error)=>{
        if(error.status)
        console.log()
        
      })
  }

}
