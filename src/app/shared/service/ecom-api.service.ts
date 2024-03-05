import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomApiService {

  constructor(private _HttpClient:HttpClient) {}



  details(id:string):Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  }

  getCategory():Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  }


}
