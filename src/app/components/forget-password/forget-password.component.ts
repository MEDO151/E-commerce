import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/shared/service/password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _PasswordService:PasswordService, private _Router:Router ){}


  forgetPass:FormGroup = new FormGroup({
    email: new FormControl('')
  })

  emailUser:any = ""

  handlePassword():void{
    this._PasswordService.forgetPassword(this.emailUser).subscribe({
      next: (response) =>{
        console.log(response);
        if(response.statusMsg === 'success'){
          this._Router.navigate(['/verify-code'])
      }
    }
    })
  }

}
