import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-component',
  imports: [
    RouterModule, 
    CommonModule
  ],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent implements OnInit {

  public product: Product | undefined;
  private id: number = 0;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  public ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
        this.product = this.productService.getProductById(this.id);
      });
  }
}
