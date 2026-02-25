import { useState } from 'react';
import { View } from './types';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Orders } from './components/Orders';
import { CreateShipment } from './components/CreateShipment';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Menu, Bell, MessageSquare, Construction } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'create-shipment':
        return <CreateShipment />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <Construction size={64} className="mb-4" />
            <h3 className="text-xl font-bold">Under Construction</h3>
            <p>The {currentView} module is currently being developed.</p>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7f8]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-8 lg:hidden">
             <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
                  <Truck size={16} />
                </div>
                <h1 className="font-bold text-lg">LogiTech</h1>
             </div>
             <button className="size-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                <Menu size={20} />
             </button>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Notifications / Search Overlay could go here */}
      <div className="fixed top-6 right-6 flex items-center gap-4">
        <button className="size-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="size-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
}
