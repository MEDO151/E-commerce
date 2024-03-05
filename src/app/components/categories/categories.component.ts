import { Component, OnInit } from '@angular/core';
import { EcomApiService } from 'src/app/shared/service/ecom-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomApiService:EcomApiService){}

  items:any = ''

  ngOnInit(): void {
    this._EcomApiService.getCategory().subscribe({
      next: (response) => {
        console.log(response);
        this.items = response.data
      },error: (err) =>{
        console.log(err);
      }
    })
  }
}
