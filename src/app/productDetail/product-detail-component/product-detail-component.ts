import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  
  
  products = [
    { id: 1, name: 'Мышь', price: 6990, description: 'Крутая мышь' },
    { id: 2, name: 'Наушники беспроводные', price: 11990, description: 'Крутые беспроводные наушники' },
    { id: 3, name: 'Клавиатура', price: 13990, description: 'Крутая клавиатура' },
    { id: 4, name: 'Коврик для мыши', price: 1990, description: 'Крутой коврик для мыши' },
    { id: 5, name: 'Наушники проводные', price: 6990, description: 'Крутые проводные наушники' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
  }
}
