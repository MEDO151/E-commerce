import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {

  constructor(private _CartService:CartService, private _WishlistService:WishlistService, private _Renderer2:Renderer2, private _ToastrService:ToastrService, private _ProductsService:ProductsService ){}

  searchValue:any = ''

  products:any = {}

  wishListData:any = ''

  pageSize:number = 0

  curentPage:number = 1

  total:number = 0

  ngOnInit():void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data

        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;

      },error: (err) => {
        console.log(err);
      }
    })
    this._WishlistService.displayWishlist().subscribe({
      next: (response) =>{
        console.log(response);
        this.wishListData = response.data.map( (item:any) => item.id )
      },error: (err) =>{
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

  pageChanged($event:number):void{
    this._ProductsService.getProducts($event).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data

        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;

      },error: (err) => {
        console.log(err);
      }
    })
  }

}
