import React, { useEffect, useState } from 'react';
import { MapPin, Package, Truck, Calendar, ArrowRight, Map as MapIcon, CheckCircle, Loader2 } from 'lucide-react';
import { Shipment } from '../types';

export const CreateShipment: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shipments')
      .then(res => res.json())
      .then(setShipments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Create New Shipment</h2>
          <p className="text-slate-500 mt-1">Configure your package and choose a carrier to generate labels. (via BFF)</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors">Save Draft</button>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors">Generate Shipping Label</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Address Information */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sender</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Address</label>
                    <textarea 
                      placeholder="123 Supply Chain Ave, Logistics Park, NY"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receiver</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Address</label>
                    <textarea 
                      placeholder="456 Delivery Lane, Customer City, CA"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Package Details */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Package size={20} className="text-primary" />
              Package Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Content Type</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                  <option>Electronics</option>
                  <option>Documents</option>
                  <option>Apparel</option>
                  <option>Perishables</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="2.5"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Dimensions (cm)</label>
                <input 
                  type="text" 
                  placeholder="30x20x15"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Carrier Selection */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Truck size={20} className="text-primary" />
              Select Carrier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'DHL', price: 42.50, type: 'Express Delivery', date: 'Oct 24, 2023', active: true },
                { name: 'FedEx', price: 38.90, type: 'Standard Shipping', date: 'Oct 26, 2023' },
                { name: 'UPS', price: 35.00, type: 'Economy Saver', date: 'Oct 28, 2023' },
              ].map((carrier) => (
                <div 
                  key={carrier.name}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    carrier.active 
                      ? 'border-primary bg-primary/5' 
                      : 'border-slate-200 bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
                    {carrier.active && <CheckCircle size={18} className="text-primary fill-primary/20" />}
                  </div>
                  <p className="text-2xl font-black text-slate-900">${carrier.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{carrier.type}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                    <Calendar size={12} />
                    {carrier.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Active Shipments</h3>
              <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">Live</span>
            </div>
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : (
                shipments.map((shipment) => (
                  <div key={shipment.id} className="relative pl-4 border-l-2 border-slate-100">
                    <div className={`absolute left-[-2px] top-0 bottom-0 w-0.5 ${shipment.color}`}></div>
                    <p className="text-[10px] font-black text-primary mb-1">{shipment.id}</p>
                    <p className="text-sm font-bold text-slate-900">{shipment.status}</p>
                    <p className="text-xs text-slate-500 mt-1">{shipment.eta || `Courier: ${shipment.courier}`}</p>
                    <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${shipment.color}`}
                        style={{ width: `${shipment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-8 py-2 text-sm font-bold text-primary flex items-center justify-center gap-1 hover:underline transition-all group">
              View All Shipments
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-slate-100">
              <MapIcon size={18} className="text-primary" />
              <span className="text-sm font-bold">Global Coverage</span>
            </div>
            <div className="h-48 relative bg-slate-100">
              <img 
                src="https://picsum.photos/seed/map/400/200?grayscale" 
                alt="Map" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black shadow-lg border border-white">
                24 ACTIVE ROUTES
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
