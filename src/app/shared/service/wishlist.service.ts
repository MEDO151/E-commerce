import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token: any = localStorage.getItem('token');
  baseUrl:string = "https://ecommerce.routemisr.com/"
  constructor(private _HttpClient:HttpClient) {}

  wishListNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  addToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `api/v1/wishlist`,
    {
      "productId": id
    },{
      headers: {
        token:this.token
      }
    }
    )
  }

  displayWishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `api/v1/wishlist`, {
      headers: {
        token:this.token
      }
    })
  }

  deleteProduct(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `api/v1/wishlist/${id}`, {
      headers: {
        token:this.token
      }
    })
  }

}
