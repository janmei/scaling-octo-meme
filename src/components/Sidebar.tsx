import React from 'react';
import { View } from '../types';
import { 
  LayoutDashboard, 
  ListTodo, 
  Package, 
  Map, 
  BookOpen, 
  Settings,
  Truck,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ListTodo },
    { id: 'create-shipment', label: 'Create Shipment', icon: Package },
    { id: 'tracking', label: 'Tracking', icon: Map },
    { id: 'address-book', label: 'Address Book', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
          <Truck size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">LogiTech</h1>
          <p className="text-xs text-slate-500">Logistics Solutions</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon size={18} className={currentView === item.id ? 'text-primary' : 'text-slate-400'} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Support</p>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <HelpCircle size={14} />
            Help Center
          </button>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
            <img 
              src="https://picsum.photos/seed/user1/40/40" 
              alt="User" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Rivera</p>
            <p className="text-xs text-slate-500 truncate">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
