import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) {}

  token:any = localStorage.getItem('token');
  baseUrl:string = "https://ecommerce.routemisr.com/"

  ckeckout(cartId:any, details:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-puce-five.vercel.app`,
    {
      shippingAddress: details
    },
    {
      headers: {
        token: this.token
      }
    }
    )
  }

  order():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `api/v1/orders/`)
  }
}
