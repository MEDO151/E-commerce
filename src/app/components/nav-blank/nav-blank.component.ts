import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _CartService:CartService, private _WishlistService:WishlistService){}

  cartNumber:number = 0;
  wishListNumber:number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNumber = data
      }
    })

    this._CartService.displayProduct().subscribe({
      next: (response) => {
        this.cartNumber = response.numOfCartItems
      }
    })

    this._WishlistService.wishListNumber.subscribe({
      next:(data) => {
        this.wishListNumber = data
      },
    })

    this._WishlistService.displayWishlist().subscribe({
      next: (response) => {
        this.wishListNumber = response.count
      }
    })
  }



  logOutUser():void {
    this._AuthService.logOut()
  }

}
