import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/shared/service/password.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  constructor(private _PasswordService:PasswordService, private _Router:Router){}

  handleCode:FormGroup = new FormGroup({
    resetCode: new FormControl('')
  })

  Code:any = ''

  verifyCode():void{
    this._PasswordService.resetCode(this.Code).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status == "Success"){
          this._Router.navigate(['/reset-password'])
        }
      }
    })
  }
}
