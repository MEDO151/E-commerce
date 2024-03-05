import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _Renderer2:Renderer2, private _PaymentService:PaymentService){}



  productInCart:any = {}

  ngOnInit(): void {
    this._CartService.displayProduct().subscribe({
      next: (response) => {
        this.productInCart = response.data
        console.log(response);
      },error: (err) =>{
        console.log(err);

      }
    })
  }


  deleteItem(id:string , btnDelete:HTMLButtonElement):void{
    this._Renderer2.setAttribute(btnDelete , 'disabled' , 'true')
    this._Renderer2.addClass(btnDelete , 'btn-disabled' )
    this._CartService.deleteProduct(id).subscribe({
      next: (response) => {
        this. ngOnInit()
        console.log(response);

        this._CartService.cartNumber.next(response.numOfCartItems)

      },error:(err) => {
        console.log(err);
      }
    })
  }

  update(id:string , num:number):void{
    if(num > 0){
      this._CartService.updateCart(id, num).subscribe({
        next: (response) => {
          console.log(response);
          this.productInCart = response.data
        },error: (err) => {
          console.log(err);
        }
      })
    }
  }

  clearAllCart():void{
    this._CartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        this.productInCart = ""
        this._CartService.cartNumber.next(0)
      },error: (err) => {
        console.log(err);

      }
    })
  }

}
