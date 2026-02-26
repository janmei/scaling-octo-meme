import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Order } from '../types';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }
        setOrders(data);
      })
      .catch(err => {
        console.error('Orders fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Orders</h2>
          <p className="text-slate-500 mt-1">Track, manage and process all customer shipments globally. (via BFF)</p>
        </div>
        <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors flex items-center gap-2">
          <Plus size={16} />
          Create New Order
        </button>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer, or Product..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {['All', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  tab === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Filter size={14} />
            More Filters
          </button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <p className="text-rose-600 font-bold mb-2">Failed to load orders</p>
              <p className="text-xs text-slate-500 max-w-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Qty</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{order.customer}</p>
                      <p className="text-xs text-slate-400">{order.location}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">${order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.status === 'In Transit' ? 'bg-blue-50 text-blue-600' :
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5">
                          <Eye size={18} />
                        </button>
                        <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {orders.length} entries</p>
          <div className="flex items-center gap-1">
            <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3, '...', 50].map((page, i) => (
              <button
                key={i}
                className={`size-8 rounded-lg text-xs font-bold transition-colors ${
                  page === 1 ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
