import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _PaymentService:PaymentService){}

  cartId:any = ''


  orderForm:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl('')
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) =>{
        this.cartId = params.get('id');
        console.log(this.cartId);
      }
    })
  }

  handleForm():void {
    this._PaymentService.ckeckout(this.cartId, this.orderForm.value).subscribe({
      next: (response) =>{
        console.log(response);
        window.open(response.session.url, '_self')
      }
    })
  }

}
