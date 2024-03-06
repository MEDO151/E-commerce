import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor(private _PaymentService:PaymentService){}

  Orders:any = ''

  ngOnInit(): void {
    this._PaymentService.order().subscribe({
      next: (response) => {
        console.log(response.data);
        this.Orders = response.data
      }
    })
  }
}
