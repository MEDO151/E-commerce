import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  spinner:boolean = false;
  getError:string = ""
  constructor(private _AuthService:AuthService , private _Router:Router){}

    registerForm:FormGroup = new FormGroup({
      name: new FormControl('' , [Validators.minLength(3), Validators.maxLength(20) , Validators.required]),
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('' , [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
      rePassword: new FormControl('' ),
      phone: new  FormControl('' , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators:[this.confirmPassword]} as FormControlOptions );


confirmPassword(group:FormGroup):void{
  let password = group.get('password');
  let rePassword = group.get('rePassword');
  if(rePassword?.value === ""){
    rePassword?.setErrors({required:true})
  }else if(rePassword?.value != password?.value ){
    rePassword?.setErrors({ misMatch:true })
  }
}


  handLeRegister():void{

    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      this.spinner = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response) => {
          console.log(response);
          if(response.message == "success"){
            this._Router.navigate(['/login'])
            this.spinner = false;
          }
        },error:(err:HttpErrorResponse) => {
          console.log(err);
          this.getError = err.error.message
        }
      })
  }

  }

}
