import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private _HttpClient:HttpClient) {}

  forgetPassword(userEmail:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {
      email: userEmail
    })
  }

  resetCode(code:any):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , {
    resetCode: code
  })
  }

  resetPassword(email:any, newPassword:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
      email:email,
      newPassword: newPassword
  })
  }
}
