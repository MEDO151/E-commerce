import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) {}

  token:any = localStorage.getItem('token');


  ckeckout(cartId:any, details:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-idswwicxj-mohamed-ahmeds-projects-cf99c67c.vercel.app/`,
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
}
