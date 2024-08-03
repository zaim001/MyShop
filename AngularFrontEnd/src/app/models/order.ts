import { OrderItem } from "./orderItem";

export interface Order {
    id: number;
    items: OrderItem[];
    totalAmount: number;
    orderDate : string;
    status : string;
  }