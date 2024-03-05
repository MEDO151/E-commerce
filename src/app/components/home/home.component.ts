import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcomApiService } from 'src/app/shared/service/ecom-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from './../../shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/service/wishlist.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any = {}

  imgCategory:any = {}

  searchValue:any = ''

  wishListData:any = ''

  constructor(private _EcomApiService:EcomApiService, private _CartService:CartService, private _ToastrService: ToastrService, private _Renderer2:Renderer2, private _WishlistService:WishlistService, private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this._WishlistService.displayWishlist().subscribe({
      next: (response) =>{
        console.log(response);
        this.wishListData = response.data.map( (item:any) => item.id )
      },error: (err) =>{
        console.log(err);
      }
    })
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data
      }
    })
    this._EcomApiService.getCategory().subscribe({
      next: (response) => {
        this.imgCategory = response.data
      },error(err) {
        console.log(err);
      }
    })
  }

  imgProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  categoryImg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true  ,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

  sliderImg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  addToCart(id:string, addToCart?:HTMLButtonElement):void {
    this._Renderer2.setAttribute(addToCart, 'disabled' , 'false')
    this._CartService.addProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this._Renderer2.removeAttribute(addToCart, 'disabled')
        this._ToastrService.success(response.message + ' 🛺');

        this._CartService.cartNumber.next(response.numOfCartItems)

      },error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(addToCart, 'disabled')
      }
    })
  }

  addToWishlist(id:string):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next: (response) => {
        console.log(response);
        this.wishListData = response.data
        this._ToastrService.success(response.message + ' 🛺');

        this._WishlistService.wishListNumber.next(response.data.length)

      },error: (err) => {
        console.log(err);
      }
    })
  }

  removeFromWishlist(id:string):void{
    this._WishlistService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        this.wishListData = response.data
        this._ToastrService.success(response.message + ' 🛺');

        this._WishlistService.wishListNumber.next(response.data.length)

      },error: (err) => {
        console.log(err);
      }
    })
  }


}
