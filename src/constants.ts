import { Order, Shipment, Metric } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-8821',
    customer: 'Sarah Jenkins',
    location: 'London, UK',
    product: 'Industrial Compressor 50L',
    quantity: 2,
    total: 1240.00,
    status: 'In Transit',
    date: 'Oct 12, 2023'
  },
  {
    id: '#ORD-8819',
    customer: 'Tech Solutions Inc',
    location: 'San Francisco, CA',
    product: 'Server Rack Mounting Kit',
    quantity: 15,
    total: 845.50,
    status: 'Delivered',
    date: 'Oct 12, 2023'
  },
  {
    id: '#ORD-8815',
    customer: 'Michael Chen',
    location: 'Singapore',
    product: 'Logistics Hub Switch',
    quantity: 1,
    total: 2100.00,
    status: 'Label Created',
    date: 'Oct 11, 2023'
  },
  {
    id: '#ORD-8799',
    customer: 'Global Imports LLC',
    location: 'New York, NY',
    product: 'Steel Shipping Crates',
    quantity: 50,
    total: 4500.00,
    status: 'Cancelled',
    date: 'Oct 11, 2023'
  },
  {
    id: '#ORD-8795',
    customer: 'Anita Rodriguez',
    location: 'Madrid, ES',
    product: 'Cargo Handling Gloves',
    quantity: 100,
    total: 1500.00,
    status: 'Delivered',
    date: 'Oct 11, 2023'
  }
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'TRK-9902120',
    status: 'In Transit - Chicago, IL',
    eta: 'Today, 6:00 PM',
    progress: 75,
    color: 'bg-blue-600'
  },
  {
    id: 'TRK-8812341',
    status: 'Out for Delivery',
    courier: 'Mike S.',
    progress: 95,
    color: 'bg-emerald-500'
  },
  {
    id: 'TRK-4451290',
    status: 'Label Created',
    eta: 'Pending Pickup',
    progress: 10,
    color: 'bg-slate-300'
  }
];

export const MOCK_METRICS: Metric[] = [
  {
    label: 'Total Orders',
    value: '2,450',
    change: '+12%',
    trend: 'up',
    icon: 'list_alt'
  },
  {
    label: 'Pending Shipments',
    value: '120',
    change: '+5%',
    trend: 'up',
    icon: 'pending_actions'
  },
  {
    label: 'Delivered Today',
    value: '45',
    change: '-2%',
    trend: 'down',
    icon: 'check_circle'
  },
  {
    label: 'Revenue',
    value: '$12,400',
    change: '+8%',
    trend: 'up',
    icon: 'payments'
  }
];
