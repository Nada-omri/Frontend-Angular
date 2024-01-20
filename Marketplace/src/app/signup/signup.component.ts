import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AccountService } from '../services/accounts/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder , private accountService:AccountService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      addres: [''],
      phone: [''],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  passwordsDoNotMatch() {
    const passwordControl = this.signupForm.get('password');
    const confirmPasswordControl = this.signupForm.get('confirmpassword');
    if(!(passwordControl &&
      confirmPasswordControl)){
        return false
      }else{
        return (
          true
        )}
    
  }
  signup(){
    this.accountService.signup(this.signupForm.get('username')?.value,this.signupForm.get('Email')?.value,this.signupForm.get('Adress')?.value,this.signupForm.get('Phone')?.value,this.signupForm.get('password')?.value).subscribe((res)=>console.log(res));
  }
  
}

