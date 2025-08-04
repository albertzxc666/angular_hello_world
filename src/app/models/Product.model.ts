export interface Product {
  id: number;
  title: string;        // название товара 
  price: number;
  description: string;
  category: string;     // категория товара
  image: string;
  rating?: {            
    rate: number;
    count: number;
  };
}