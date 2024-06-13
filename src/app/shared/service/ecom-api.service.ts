import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomApiService {

  constructor(private _HttpClient:HttpClient) {}

  baseUrl:string = "https://ecommerce.routemisr.com/"

  details(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `api/v1/products/${id}`)
  }

  getCategory():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `api/v1/categories`)
  }


}
