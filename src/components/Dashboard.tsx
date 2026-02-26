import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, List, Clock, CheckCircle, CreditCard, Loader2, Sparkles } from 'lucide-react';
import { Metric, Order } from '../types';

const IconMap: Record<string, any> = {
  list_alt: List,
  pending_actions: Clock,
  check_circle: CheckCircle,
  payments: CreditCard
};

interface DashboardData {
  metrics: Metric[];
  recentOrders: Order[];
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!data || !Array.isArray(data.metrics)) {
          throw new Error('Invalid data format received from server');
        }
        setData(data);
      })
      .catch(err => {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const generateInsights = async () => {
    if (!data) return;
    setLoadingInsights(true);
    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      const result = await response.json();
      setInsights(result.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-xl border border-rose-100 max-w-md text-center">
          <h3 className="font-bold text-lg mb-2">Failed to load dashboard</h3>
          <p className="text-sm opacity-90">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Overview</h2>
          <p className="text-slate-500 mt-1">Real-time logistics and sales performance (via BFF)</p>
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
        {data.metrics.map((metric, idx) => {
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
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
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

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-800 shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Sparkles size={20} className="text-amber-400" />
                AI Logistics Insights
              </h3>
              <button
                onClick={generateInsights}
                disabled={loadingInsights}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
              >
                {loadingInsights ? 'Analyzing...' : 'Generate Insights'}
              </button>
            </div>
            {insights ? (
              <div className="prose prose-invert max-w-none">
                <div className="text-sm text-slate-300 whitespace-pre-line">
                  {insights}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">Click the button to generate AI-powered insights from your logistics data.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {data.recentOrders.map((order) => (
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
