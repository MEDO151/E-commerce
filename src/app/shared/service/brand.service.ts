import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl:string = "https://ecommerce.routemisr.com/"

  constructor(private  _HttpClient:HttpClient) { }

  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `api/v1/brands`)
  }
}
