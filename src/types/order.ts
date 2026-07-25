export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  amount: number;
  status: OrderStatus;
  placed_at: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'cancelled';
  timestamp?: string;
}
