import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomApiService } from 'src/app/shared/service/ecom-api.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HomeComponent } from '../home/home.component';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _EcomApiService:EcomApiService, private _CartService:CartService, private _ToastrService:ToastrService, private _Renderer2:Renderer2){}

  detailsId:any|undefined  = ''
  details:any = {}
  imgs:[] = []

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.detailsId = response.get('id')

        this._EcomApiService.details(this.detailsId).subscribe({
          next: (response) => {

            this.details = response.data
            console.log(this.details);
            this.imgs = this.details.images;

          },error: (err) => {
            console.log(err);

          }
        })

      }
    })
  }

  detailsProduct: OwlOptions = {
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

  add(id:string , Add:HTMLButtonElement):void{
    this._Renderer2.setAttribute(Add, 'disabled', 'true')
    this._CartService.addProduct(id).subscribe({
      next: (response) =>{
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(Add, 'disabled')

        this._CartService.cartNumber.next(response.numOfCartItems)

      },error: (err) => {
        console.log(err);
        this._ToastrService.success(err.message);
        this._Renderer2.removeAttribute(Add, 'disabled')
      }
    })
  }
}
