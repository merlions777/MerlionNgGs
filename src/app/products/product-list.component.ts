import { Component } from '@angular/core';
import { IProduct } from './product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './product.service';
import { error } from 'selenium-webdriver';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _filterCriteria: string;
  errorMessage: string;
  get filterCriteria(): string{
    return this._filterCriteria;
  }
  set filterCriteria(value: string){
    this._filterCriteria = value;
    this.filteredProducts = this._filterCriteria ? this.performFilter(this.filterCriteria) : this.products;
  }
  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) {
  }

  onRatingClicked(message: string): void {
     this.pageTitle = 'Product List: ' + message;
  }

performFilter(critera: string): IProduct[] {
   critera = critera.toLocaleLowerCase();
   return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(critera) !== -1);
}

  ngOnInit(): void {
     console.log('Product Life hook example logging');
     this._productService.getProdudts()
     .subscribe(
         products => {
           this.products = products;
           this.filteredProducts = this.products;
          },
           error => this.errorMessage = <any>error,
          );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
