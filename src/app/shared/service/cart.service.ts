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
  baseUrl:string = "https://ecommerce.routemisr.com/"
  addProduct(id:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl +`api/v1/cart` ,
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
    return this._HttpClient.get(this.baseUrl + `api/v1/cart` , {
      headers:{
        token : this.token
      }
    })
  }

  deleteProduct(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `api/v1/cart/${id}` , {
      headers:{
        token : this.token
      }
    })
  }

  updateCart(id:string, countNumber:number ):Observable<any>{
  return this._HttpClient.put(this.baseUrl + `api/v1/cart/${id}` , {
    "count": countNumber
},{
  headers:{
  token: this.token
  }
}
)
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `api/v1/cart` , {
      headers:{
        token: this.token
      }
    })
  }

}
