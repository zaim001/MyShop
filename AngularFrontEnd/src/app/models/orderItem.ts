import { Product } from "./product";

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
  price: number;
}