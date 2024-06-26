import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = "https://ecommerce.routemisr.com/"

  constructor(private _HttpClient:HttpClient, private _Router:Router ) {  }

  setRegister(userData:object):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `api/v1/auth/signup` , userData)
  }

  setlogin(userData:object):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `api/v1/auth/signin` , userData)
  }

  logOut():void {
    this._Router.navigate(['/login'])
    localStorage.removeItem('token')
  }
}
