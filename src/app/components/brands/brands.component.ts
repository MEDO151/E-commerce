import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/shared/service/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _BrandService:BrandService){}

  brands:any = ''

  ngOnInit(): void {
    this._BrandService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brands = response.data
      },error: (err) => {
        console.log(err);
      }
    })
  }


}
