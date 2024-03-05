import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) {}

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  token:any = localStorage.getItem('token');

  addProduct(id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
      {
        "productId": id
      },{
        headers:{
          token: this.token
        }
      }
    )
  }

  displayProduct():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers:{
        token : this.token
      }
    })
  }

  deleteProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      headers:{
        token : this.token
      }
    })
  }

  updateCart(id:string, countNumber:number ):Observable<any>{
  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
    "count": countNumber
},{
  headers:{
  token: this.token
  }
}
)
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers:{
        token: this.token
      }
    })
  }

}
