import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService,private _CartService:CartService, private _Renderer2:Renderer2, private _ToastrService:ToastrService){}

  productInWishList:any = {}

  count:any = 0
  ngOnInit(): void {
    this._WishlistService.displayWishlist().subscribe({
      next: (response) =>{
        console.log(response);
        this.productInWishList = response
        this.count = response.count
      },error: (err) =>{
        console.log(err);
      }
    })
  }

  delete(id:string, btnDelete?:HTMLButtonElement):void{
    this._Renderer2.setAttribute(btnDelete, 'disabled', 'false')
    this._WishlistService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit()
        this._Renderer2.removeAttribute(btnDelete, 'disabled')

        this._WishlistService.wishListNumber.next(response.data.length)

      },error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnDelete, 'disabled')
      }
    })
  }

  addToCart(id:string, addToCart:HTMLButtonElement):void{
      this._Renderer2.setAttribute(addToCart, 'disabled' , 'true');
      this._CartService.addProduct(id).subscribe({
      next: (response) => {
        console.log( response);
        this._Renderer2.removeAttribute(addToCart, 'disabled')
        this._ToastrService.success(response.message + ' 🛺');
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._WishlistService.deleteProduct(id).subscribe({
          next: (response) => {
            console.log(response);
            this.ngOnInit()
            this._WishlistService.wishListNumber.next(response.data.length)
          }
            })
        this.delete(id)
        this.ngOnInit()
      },error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(addToCart, 'disabled')
      }
    })

  }
}
