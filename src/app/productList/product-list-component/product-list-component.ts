import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Мышь', price: 6990 },
    { id: 2, name: 'Наушники беспроводные', price: 11990 },
    { id: 3, name: 'Клавиатура', price: 13990 },
    { id: 4, name: 'Коврик для мыши', price: 1990 },
    { id: 5, name: 'Наушники проводные', price: 6990 }
  ];
}
