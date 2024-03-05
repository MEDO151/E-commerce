import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/shared/service/password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _PasswordService:PasswordService, private _Router:Router){}

  NewPassword:any = ''

  NewEmail:any = ''


  handleNewPassword:FormGroup = new FormGroup({
    email: new FormControl('') ,
    newPassword: new FormControl('')
  })

  setNewPassword():void{
    this._PasswordService.resetPassword(this.NewEmail, this.NewPassword).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token)
        this._Router.navigate(['/home'])
      }
    })
  }

}
