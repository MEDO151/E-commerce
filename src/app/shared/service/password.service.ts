import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private _HttpClient:HttpClient) {}
  baseUrl:string = "https://ecommerce.routemisr.com/"
  forgetPassword(userEmail:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `api/v1/auth/forgotPasswords` , {
      email: userEmail
    })
  }

  resetCode(code:any):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `api/v1/auth/verifyResetCode` , {
    resetCode: code
  })
  }

  resetPassword(email:any, newPassword:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `api/v1/auth/resetPassword`,{
      email:email,
      newPassword: newPassword
  })
  }
}
