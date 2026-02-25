import React from 'react';
import { MOCK_METRICS, MOCK_ORDERS } from '../constants';
import { motion } from 'motion/react';
import { TrendingUp, List, Clock, CheckCircle, CreditCard } from 'lucide-react';

const IconMap: Record<string, any> = {
  list_alt: List,
  pending_actions: Clock,
  check_circle: CheckCircle,
  payments: CreditCard
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Overview</h2>
          <p className="text-slate-500 mt-1">Real-time logistics and sales performance</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
          {['7 Days', '30 Days', '12 Months'].map((range) => (
            <button
              key={range}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                range === '7 Days' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_METRICS.map((metric, idx) => {
          const Icon = IconMap[metric.icon] || List;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={metric.label}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Weekly Trends</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
              <TrendingUp size={14} />
              15% increase
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [40, 60, 100, 70, 50, 80, 90];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-3">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      day === 'Wed' ? 'bg-primary' : 'bg-primary/30'
                    }`}
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_ORDERS.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {order.customer.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{order.customer}</p>
                  <p className="text-xs text-slate-500 truncate">{order.id}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                    order.status === 'In Transit' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
