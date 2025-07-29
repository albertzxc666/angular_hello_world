import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Мышь', price: 6990, description: 'Lunacy One - это флагманская игровая мышь, которая адаптируется специально под вас. Больше не нужно идти на компромиссы.', image: '/assets/img/mouse.webp' },
    { id: 2, name: 'Наушники беспроводные', price: 11990, description: 'Lunacy Loud - это беспроводная гарнитура премиум-класса, разработанная для геймеров, которые привыкли к высочайшему комфорту и качественному звуку.', image: '/assets/img/headphones_wireless.webp' },
    { id: 3, name: 'Клавиатура', price: 13990, description: 'Lunacy In Space - это флагманская клавиатура премиального уровня, в которой продумана каждая мелкая деталь, чтобы игровые сессии даже самых требовательных пользователей проходили с максимальным комфортом. Клавиатура выполнена в формате 98%. Цифровой блок - есть, при этом устройство гораздо аккуратнее и компактнее полноразмерных конкурентов.', image: '/assets/img/keyboard.webp' },
    { id: 4, name: 'Коврик для мыши', price: 1990, description: 'Коврик размера L (50x50 см) предоставляет достаточно места для комфортного размещения мыши. Это позволяет свободно выполнять любые игровые или рабочие действия без ограничений по пространству, повышая удобство и эффективность.', image: '/assets/img/cover.webp' },
    { id: 5, name: 'Наушники проводные', price: 6990, description: 'Дарк Проджект х Lunacy Night - это проводная гарнитура премиум-класса совмещающая в себе лаконичный дизайн и дерзкий, мощный звук.', image: '/assets/img/headphones.webp' }
  ];

  constructor() { }

  async getAllProducts(): Promise<Product[]> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.products.find(product => product.id === id);
  }
}