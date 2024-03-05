import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  spinner:boolean = false;
  getError:string = ""
  constructor(private _AuthService:AuthService , private _FormBuilder:FormBuilder, private _Router:Router){}

  loginForm:FormGroup = this._FormBuilder.group({
    email: ['' , [Validators.required, Validators.email]],
    password: ['' , [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
  })

  handleLogin():void {
    if(this.loginForm.valid){
      this.spinner = true;
      this._AuthService.setlogin(this.loginForm.value).subscribe({
        next: (response) => {
          if(response.message == "success"){
            this._Router.navigate(['/home'])
            this.spinner = false;
            localStorage.setItem('token', response.token )
          }
        },error: (err) => {
          console.log(err);
          this.getError = err.error.message;

          this.spinner = false;
        }
      })
    }
  }
}
