export type View = 'dashboard' | 'orders' | 'create-shipment' | 'tracking' | 'address-book' | 'settings';

export interface Order {
  id: string;
  customer: string;
  location: string;
  product: string;
  quantity: number;
  total: number;
  status: 'In Transit' | 'Delivered' | 'Label Created' | 'Cancelled' | 'Processing' | 'Shipped' | 'Pending';
  date: string;
}

export interface Shipment {
  id: string;
  status: string;
  eta?: string;
  courier?: string;
  progress: number;
  color: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}
